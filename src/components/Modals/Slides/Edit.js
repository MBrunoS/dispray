import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ModalsContext } from "../../../context/ModalsContext";
import { DBContext } from "../../../context/DBContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function EditSlideModal({ content, index }) {
  const { upsertMeeting, activeMeeting, activeItem, setActiveItem } =
    useContext(DBContext);

  const { isEditSlideModalOpen, showEditSlideModal, closeEditSlideModal } =
    useContext(ModalsContext);

  const [text, setText] = useState("");

  useEffect(() => {
    setText(content);
  }, [index]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const { texts } = activeMeeting.elements[activeItem.index];

    const updated = texts.map((block, i) => {
      if (i === index) {
        return text;
      }
      return block;
    });

    activeMeeting.elements[activeItem.index].texts = updated;

    upsertMeeting(activeMeeting);
    setActiveItem({
      ...activeMeeting.elements[activeItem.index],
      index: activeItem.index,
    });
    closeEditSlideModal();
  };

  return (
    <>
      <Modal show={isEditSlideModalOpen} onHide={closeEditSlideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              as="textarea"
              rows={5}
              value={text}
              onChange={handleTextChange}
              className="mb-2"
            />
            <Button type="submit">Editar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {index !== -1 && (
        <KeyboardEventHandler
          handleKeys={["ctrl+t"]}
          onKeyEvent={showEditSlideModal}
        />
      )}
    </>
  );
}
