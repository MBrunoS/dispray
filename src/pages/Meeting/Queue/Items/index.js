import React, { useContext } from "react";
import { ButtonGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../../context/DBContext";
import useDialog from "../../../../hooks/useDialog";

export default function MeetingQueueItem({ item, deleteItem, index }) {
  const { setActiveItem } = useContext(DBContext);
  const dialog = useDialog();

  const handleDelete = (e) => {
    dialog(
      {
        type: "none",
        buttons: ["Não", "Sim"],
        title: "Excluir item",
        message: `Tem certeza que deseja excluir este item? (${
          item.type === "passage"
            ? `Passagem Bíblica ${item.reference}`
            : `Música ${item.title}`
        })`,
      },
      (response) => {
        if (response === 1) {
          deleteItem(e);
        }
      }
    );
  };

  return (
    <ButtonGroup className="queue-item">
      <ListGroupItem
        action
        className="d-flex align-items-center gap-2 p-2"
        onClick={() => setActiveItem({ ...item, index })}
      >
        {item.type === "passage" ? (
          <>
            <i className="bi bi-book"></i>
            <p className="m-0 flex-grow-1">{item.reference}</p>
          </>
        ) : (
          <>
            <i className="bi bi-music-note-list"></i>
            <p className="m-0 flex-grow-1">{item.title}</p>
          </>
        )}
      </ListGroupItem>

      <Button
        onClick={handleDelete}
        variant="danger"
        size="sm"
        data-index={index}
      >
        <i className="bi bi-trash-fill"></i>
      </Button>
    </ButtonGroup>
  );
}
