import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function CreateMeetingModal() {
  const { upsertMeeting, setActiveMeeting, setActiveItem } =
    useContext(DBContext);
  const { isCreateModalOpen, showCreateModal, closeCreateModal } =
    useContext(ModalsContext);

  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [isCreateModalOpen]);

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
      theme: null,
    };

    upsertMeeting(meeting);
    setActiveMeeting(meeting);
    setActiveItem(null);

    closeCreateModal();
  };

  return (
    <>
      <Modal show={isCreateModalOpen} onHide={closeCreateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nova Reunião</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            <Form.Control
              placeholder="Nome da Reunião"
              value={name}
              onChange={handleNameChange}
            />
            <Button type="submit">Criar reunião</Button>
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
