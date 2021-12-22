import React, { useContext, useEffect } from "react";
import { DBContext } from "../../../context/DBContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useResources from "../../../hooks/useResources";
import useProjectionWindow from "../../../hooks/useProjectionWindow";

export default function Themes() {
  const { themes } = useResources();
  const { activeMeeting, upsertMeeting } = useContext(DBContext);
  const projectionWindow = useProjectionWindow();

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
      <h4 className="themes-title">Temas</h4>

      <Container fluid>
        <Row md={3} lg={4} className="py-2 g-2">
          {themes.map((theme, i) => (
            <Col key={i}>
              <Card className="text-center theme-card">
                <Card.Body>
                  <Card.Subtitle>{theme.name}</Card.Subtitle>
                </Card.Body>
                <Card.Footer
                  as="button"
                  className="btn btn-primary-dark stretched-link"
                  onClick={() => handleTheme(themes[i])}
                >
                  Aplicar
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
