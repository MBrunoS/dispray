import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function CreateMeetingForm({ isOpen, close }) {
  const { upsertMeeting, setActiveMeeting } = useContext(DBContext);

  const { showCreateModal } = useContext(ModalsContext);

  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    const meeting = {
      _id: new Date().toISOString(),
      name,
      elements: [],
    };

    upsertMeeting(meeting);
    setActiveMeeting(meeting);
    close();
  };

  return (
    <>
      <Modal show={isOpen} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nova Reunião</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="Nome da Reunião"
                value={name}
                onChange={handleNameChange}
              />
              <Button type="submit">Criar</Button>
            </InputGroup>
          </Form>
        </Modal.Body>
      </Modal>

      <KeyboardEventHandler
        handleKeys={["ctrl+n"]}
        onKeyEvent={showCreateModal}
      />
    </>
  );
}
