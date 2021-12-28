import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";
import useProjectionWindow from "../../../hooks/useProjectionWindow";
import useDialog from "../../../hooks/useDialog";

export default function EditMeetingModal() {
  const {
    meetingsDB,
    fetchMeetings,
    upsertMeeting,
    activeMeeting,
    setActiveMeeting,
    setActiveItem,
    INIT_ACTIVE_MEETING,
  } = useContext(DBContext);

  const { isEditModalOpen, closeEditModal, showEditModal } =
    useContext(ModalsContext);

  const projectionWindow = useProjectionWindow();
  const dialog = useDialog();
  const [name, setName] = useState();

  useEffect(() => {
    setName(activeMeeting.name);
  }, [isEditModalOpen]);

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
    closeEditModal();
  };

  const handleDelete = () => {
    dialog(
      {
        type: "none",
        buttons: ["Não", "Sim"],
        title: "Confimar exclusão",
        message: "Tem certeza que deseja excluir esta reunião?",
      },
      (response) => {
        if (response === 1) {
          meetingsDB.remove(activeMeeting);
          setActiveMeeting(INIT_ACTIVE_MEETING);
          setActiveItem(null);

          fetchMeetings();
          projectionWindow.clearText();
          closeEditModal();
        }
      }
    );
  };

  return (
    <>
      <Modal show={isEditModalOpen} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Reunião</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            <Form.Control
              placeholder="Nome da Reunião"
              value={name}
              onChange={handleNameChange}
            />

            <div className="d-flex flex-row gap-2">
              <Button variant="danger" onClick={handleDelete} className="w-50">
                <i className="bi bi-trash-fill"></i>
                Excluir
              </Button>
              <Button type="submit" className="w-50">
                Salvar alteração
              </Button>
            </div>
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
