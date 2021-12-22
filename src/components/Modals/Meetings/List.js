import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

export default function ListMeetingsModal() {
  const { meetings, setActiveMeeting, setActiveItem } = useContext(DBContext);
  const {
    isMeetingsModalOpen,
    closeMeetingsModal,
    showMeetingsModal,
    showCreateModal,
  } = useContext(ModalsContext);

  const handleClick = (meeting) => {
    setActiveMeeting(meeting);
    setActiveItem(null);
    closeMeetingsModal();
  };

  const newMeeting = () => {
    closeMeetingsModal();
    showCreateModal();
  };

  return (
    <>
      <Modal show={isMeetingsModalOpen} onHide={closeMeetingsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reuniões</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2 text-center">
          <p className="m-0">Selecione uma reunião:</p>
          <ListGroup>
            {meetings.length ? (
              meetings.map((m, i) => (
                <ListGroup.Item
                  action
                  key={i}
                  onClick={() => handleClick(m)}
                  data-index={i}
                >
                  {m.name}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup>
                <ListGroup.Item>
                  Não há nenhuma reunião ainda. Clique no botão abaixo para
                  criar uma.
                </ListGroup.Item>
              </ListGroup>
            )}
          </ListGroup>
          <Button onClick={newMeeting}>
            <i class="bi bi-plus"></i> Nova Reunião
          </Button>
        </Modal.Body>
      </Modal>

      <KeyboardEventHandler
        handleKeys={["ctrl+o"]}
        onKeyEvent={showMeetingsModal}
      />
    </>
  );
}
