import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { DBContext } from "../../../context/DBContext";
import { ModalsContext } from "../../../context/ModalsContext";
import KeyboardEventHandler from "react-keyboard-event-handler";
import useProjectionWindow from "../../../hooks/useProjectionWindow";

export default function MeetingsList({ show, close }) {
  const { meetings, setActiveMeeting, setActiveItem } = useContext(DBContext);
  const { showMeetingsModal } = useContext(ModalsContext);
  const projectionWindow = useProjectionWindow();

  function handleClick(meeting) {
    setActiveMeeting(meeting);
    setActiveItem(null);
    projectionWindow.clearText();
    close();
  }

  return (
    <>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reuniões</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {meetings.map((m, i) => (
              <ListGroup.Item
                action
                key={i}
                onClick={() => handleClick(m)}
                data-index={i}
              >
                {m.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      <KeyboardEventHandler
        handleKeys={["ctrl+o"]}
        onKeyEvent={showMeetingsModal}
      />
    </>
  );
}
