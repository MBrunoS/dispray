import React, { useContext } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { DBContext } from "../../../context/DBContext";

export default function MeetingInfo({ name, edit, create }) {
  const { activeMeeting } = useContext(DBContext);

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Stack direction="horizontal" className="text-white">
      <p className="flex-grow-1 text-center mb-0">{children}</p>
      <Button
        className="meeting-info-btn"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <i className="bi bi-three-dots"></i>
      </Button>
    </Stack>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>{name}</Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item
          eventKey="1"
          onClick={edit}
          disabled={!activeMeeting.name}
        >
          Editar Informações da Reunião
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" onClick={create}>
          Criar Nova Reunião
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
