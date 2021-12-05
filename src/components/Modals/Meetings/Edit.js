import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function EditMeetingForm({ isOpen, close }) {
  const {
    meetingsDB,
    fetchMeetings,
    upsertMeeting,
    activeMeeting,
    setActiveMeeting,
    INIT_ACTIVE_MEETING,
  } = useContext(DBContext);

  const { showEditModal } = useContext(ModalsContext);

  const [name, setName] = useState();

  useEffect(() => {
    setName(activeMeeting.name);
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    const meeting = {
      ...activeMeeting,
      name,
    };

    upsertMeeting(meeting);
    setActiveMeeting(meeting);
    close();
  };

  const handleDelete = () => {
    meetingsDB.remove(activeMeeting);
    setActiveMeeting(INIT_ACTIVE_MEETING);
    fetchMeetings();
    close();
  };

  return (
    <>
      <Modal show={isOpen} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Reunião</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Nome da Reunião"
                value={name}
                onChange={handleNameChange}
              />
              <Button type="submit">Salvar</Button>
            </InputGroup>

            <Row className="mt-2">
              <Col className="d-flex justify-content-center">
                <Button variant="danger" onClick={handleDelete}>
                  <i className="bi bi-trash-fill"></i>
                  Excluir
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {!!activeMeeting.name && (
        <KeyboardEventHandler
          handleKeys={["ctrl+i"]}
          onKeyEvent={showEditModal}
        />
      )}
    </>
  );
}
