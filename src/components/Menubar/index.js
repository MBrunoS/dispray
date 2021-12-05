import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import useProjectionWindow from "../../hooks/useProjectionWindow";
import Button from "react-bootstrap/Button";
import MeetingsList from "../Modals/Meetings/List";
import { ModalsContext } from "../../context/ModalsContext";

export default function Menubar() {
  const { isMeetingsModalOpen, showMeetingsModal, closeMeetingsModal } =
    useContext(ModalsContext);
  const [isProjVisible, setIsProjVisible] = useState(false);
  const { showProjWindow, hideProjWindow } = useProjectionWindow();

  return (
    <>
      <Navbar variant="dark">
        <Container fluid>
          <Navbar.Brand href="#/">
            <img
              src={process.env.PUBLIC_URL + "/logo-white.png"}
              className="navbar-logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#/meeting"
              className="text-center"
              onClick={showMeetingsModal}
            >
              <i className="bi bi-list"></i>
              <br />
              Reuniões
            </Nav.Link>
            <Nav.Link href="#/" className="text-center" disabled>
              <i className="bi bi-collection"></i>
              <br />
              Biblioteca
            </Nav.Link>
            <Nav.Link href="#/" className="text-center" disabled>
              <i className="bi bi-gear"></i>
              <br />
              Configurações
            </Nav.Link>
          </Nav>
        </Container>
        <Nav>
          <Nav.Item className=" text-nowrap">
            <Button
              className="projection-btn"
              onClick={() => {
                if (isProjVisible) {
                  hideProjWindow();
                } else {
                  showProjWindow();
                }
                setIsProjVisible(!isProjVisible);
              }}
            >
              {isProjVisible ? (
                <>
                  <i className="bi bi-display-fill"></i>
                  <br />
                  Esconder
                </>
              ) : (
                <>
                  <i className="bi bi-display"></i>
                  <br />
                  Iniciar Projeção
                </>
              )}
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>

      <MeetingsList show={isMeetingsModalOpen} close={closeMeetingsModal} />
    </>
  );
}
