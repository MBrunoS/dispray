import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { searchBible } from "../../../utils";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import BiblePicker from "./BiblePicker";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function BibleItemModal({}) {
  const { upsertMeeting, activeMeeting } = useContext(DBContext);
  const { isBibleModalOpen, showBibleModal, closeBibleModal } =
    useContext(ModalsContext);
  const [didSearch, setDidSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isBibleModalOpen) {
      setDidSearch(false);
      setSearchValue("");
      setData([]);
    }
  }, [isBibleModalOpen]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDidSearch(true);
    if (searchValue.trim() === "") return;
    setData(searchBible(searchValue, 15));
  };

  const handleVerse = (e) => {
    const passage = data[e.target.dataset.index];
    const meeting = {
      ...activeMeeting,
      elements: [...activeMeeting.elements, { ...passage }],
    };
    upsertMeeting(meeting);
  };

  return (
    <>
      <Modal
        show={isBibleModalOpen}
        onHide={closeBibleModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar versículos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BiblePicker className="mb-2" />
          <hr />
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Pesquise um trecho da bíblia"
                value={searchValue}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit">
                Pesquisar
              </Button>
            </InputGroup>
          </Form>

          <ListGroup className="pt-2">
            {didSearch &&
              (data.length === 0 ? (
                <p className="text-center">Não há resultados de pesquisa</p>
              ) : (
                data.map((passage, i) => {
                  return (
                    <ListGroup.Item
                      action
                      key={i}
                      data-index={i}
                      onClick={handleVerse}
                    >
                      {passage.texts[0]} ({passage.reference})
                      {/* DÁ PRA ENXUGAR BIBLE E SONGS NUM ARQUIVO SÓ */}
                    </ListGroup.Item>
                  );
                })
              ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <KeyboardEventHandler
        handleKeys={["ctrl+b"]}
        onKeyEvent={showBibleModal}
      />
    </>
  );
}
