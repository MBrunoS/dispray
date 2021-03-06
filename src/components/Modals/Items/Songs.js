import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { searchSongs } from "../../../utils";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function SongsItemModal() {
  const { upsertMeeting, activeMeeting } = useContext(DBContext);
  const { isSongsModalOpen, showSongsModal, closeSongsModal } =
    useContext(ModalsContext);
  const [didSearch, setDidSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isSongsModalOpen) {
      setDidSearch(false);
      setSearchValue("");
      setData([]);
    }
  }, [isSongsModalOpen]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDidSearch(true);
    if (searchValue.trim() === "") return;
    setData(searchSongs(searchValue, 10));
  };

  const handleSong = (e) => {
    const song = data[e.target.dataset.index];
    const service = {
      ...activeMeeting,
      elements: [...activeMeeting.elements, { ...song }],
    };
    upsertMeeting(service);
  };

  return (
    <>
      <Modal
        show={isSongsModalOpen}
        onHide={closeSongsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar letras de músicas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Pesquise um trecho da música"
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
                <p>Não há resultados de pesquisa</p>
              ) : (
                data.map((song, i) => {
                  return (
                    <ListGroup.Item
                      action
                      onClick={handleSong}
                      data-index={i}
                      key={i}
                    >
                      {song.title}
                    </ListGroup.Item>
                  );
                })
              ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <KeyboardEventHandler
        handleKeys={["ctrl+m"]}
        onKeyEvent={showSongsModal}
      />
    </>
  );
}
