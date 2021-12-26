import React, { useContext, useEffect, useState } from "react";
import { DBContext } from "../../../context/DBContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useResources from "../../../hooks/useResources";
import useProjectionWindow from "../../../hooks/useProjectionWindow";
import { ModalsContext } from "../../../context/ModalsContext";
import EditThemeModal from "../../Modals/Themes/Edit";
import CreateThemeModal from "../../Modals/Themes/Create";

export default function ThemesList() {
  const { themes: defaulThemes } = useResources();
  const {
    activeMeeting,
    upsertMeeting,
    themes: customThemes,
  } = useContext(DBContext);
  const { showEditThemeModal, showCreateThemeModal } =
    useContext(ModalsContext);
  const projectionWindow = useProjectionWindow();
  const [themeToEdit, setThemeToEdit] = useState({
    title: "",
    primaryText: {},
    secondaryText: {},
    styles: {},
  });

  const themes = [...defaulThemes, ...customThemes];

  const showEditModal = (e) => {
    const { index } = e.currentTarget.dataset;
    setThemeToEdit(themes[index]);
    showEditThemeModal();
  };

  const handleTheme = (theme) => {
    const meeting = {
      ...activeMeeting,
      theme: theme,
    };
    upsertMeeting(meeting);
    projectionWindow.updateTheme(theme);
  };

  return (
    <>
      <div className="d-flex">
        <h4 className="flex-grow-1 themes-title">Temas</h4>
        <Button
          variant="primary-dark"
          className="rounded-0"
          onClick={showCreateThemeModal}
        >
          +
        </Button>
      </div>

      <Container fluid>
        <Row md={3} lg={4} className="py-2 g-2">
          {themes.map((theme, i) => (
            <Col key={i}>
              <Card className="text-center theme-card">
                <Card.Body>
                  <Card.Subtitle>{theme.title}</Card.Subtitle>
                </Card.Body>
                <Card.Footer className="btn-group">
                  <Button
                    variant="primary-dark"
                    onClick={() => handleTheme(theme)}
                  >
                    Aplicar
                  </Button>
                  {theme.isCustom && (
                    <Button
                      variant="primary-dark"
                      onClick={showEditModal}
                      data-index={i}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <EditThemeModal theme={themeToEdit} />
      <CreateThemeModal />
    </>
  );
}
