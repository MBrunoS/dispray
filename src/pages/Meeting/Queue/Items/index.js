import React, { useContext } from "react";
import { ButtonGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../../context/DBContext";

export default function MeetingQueueItem({ item, deleteItem, index }) {
  const { setActiveElement } = useContext(DBContext);

  return (
    <ButtonGroup className="queue-item">
      <ListGroupItem
        action
        className="d-flex align-items-center gap-2 p-2"
        onClick={() => setActiveElement(item)}
      >
        {item.type === "bible" ? (
          <>
            <i className="bi bi-book"></i>
            <p className="m-0 flex-grow-1">{item.passage.reference}</p>
          </>
        ) : (
          <>
            <i className="bi bi-music-note-list"></i>
            <p className="m-0 flex-grow-1">{item.song.title}</p>
          </>
        )}
      </ListGroupItem>

      <Button
        onClick={deleteItem}
        variant="danger"
        size="sm"
        data-index={index}
      >
        <i className="bi bi-trash-fill"></i>
      </Button>
    </ButtonGroup>
  );
}
