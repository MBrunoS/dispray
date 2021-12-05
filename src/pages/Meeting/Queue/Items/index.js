import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function MeetingQueueItem({ item, deleteItem, index }) {
  return (
    <ListGroupItem
      action
      className="d-flex align-items-center gap-2 queue-item p-2"
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
      <Button
        onClick={deleteItem}
        variant="danger"
        size="sm"
        data-index={index}
      >
        <i className="bi bi-trash-fill"></i>
      </Button>
    </ListGroupItem>
  );
}
