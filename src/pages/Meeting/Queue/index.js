import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { DBContext } from "../../../context/DBContext";
import MeetingQueueItem from "./Items";

export default function MeetingQueue() {
  const { activeMeeting, upsertMeeting, fetchMeetings } = useContext(DBContext);

  const deleteItem = (e) => {
    const index = e.currentTarget.dataset.index;
    activeMeeting.elements.splice(index, 1);
    upsertMeeting(activeMeeting);
    fetchMeetings();
  };

  return (
    <ListGroup className="d-flex flex-column flex-grow-1 mt-2 meeting-queue scrollable">
      {activeMeeting.elements.length ? (
        activeMeeting.elements.map((elem, i) => (
          <MeetingQueueItem
            item={elem}
            deleteItem={deleteItem}
            index={i}
            key={i}
          />
        ))
      ) : (
        <p className="text-center text-white">Não há itens nesta reunião</p>
      )}
    </ListGroup>
  );
}
