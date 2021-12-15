import React, { useContext, useEffect } from "react";
import { DBContext } from "../../../context/DBContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useResources from "../../../hooks/useResources";
import useProjectionWindow from "../../../hooks/useProjectionWindow";

export default function Themes() {
  const { themes: defaultThemes } = useResources();
  const { themes, fetchThemes } = useContext(DBContext);
  const projectionWindow = useProjectionWindow();

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleDefaultTheme = (index) => {
    projectionWindow.updateTheme(defaultThemes[index]);
  };

  const handleCustomTheme = (index) => {
    projectionWindow.updateTheme(themes[index]);
  };

  return (
    <>
      <h4 className="themes-title">Temas</h4>

      <Container fluid className="py-2">
        <Row>
          {defaultThemes.map((theme, i) => (
            <Col md={4} lg={3} key={i}>
              <Card onClick={() => handleDefaultTheme(i)}>
                <Card.Body>
                  <Card.Subtitle>{theme.name}</Card.Subtitle>
                  <Card.Text>Tema Padrão</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {themes.map((theme, i) => (
            <Col md={4} lg={3} key={i}>
              <Card onClick={() => handleCustomTheme(i)}>
                <Card.Body>
                  <Card.Subtitle>{theme.name}</Card.Subtitle>
                  <Card.Text>Tema Personalizado</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
