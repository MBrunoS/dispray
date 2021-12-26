import React, { useContext, useEffect, useState } from "react";
import { ModalsContext } from "../../../context/ModalsContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";

export default function EditThemeModal({ theme }) {
  const { isEditThemeModalOpen, closeEditThemeModal } =
    useContext(ModalsContext);
  const { upsertTheme } = useContext(DBContext);

  const [title, setTitle] = useState("");
  const [colors, setColors] = useState({});

  useEffect(() => {
    setTitle(theme.title);
    setColors({
      primaryText: theme.primaryText.color,
      secondaryText: theme.secondaryText.color,
      emphasis: theme.styles.emphasisColor,
      background: theme.styles.backgroundColor,
    });
  }, [theme]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleColorChange = (e) => {
    const newColors = { ...colors };
    newColors[e.target.id] = e.target.value;

    setColors(newColors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const t = {
      ...theme,
      title,
      primaryText: { color: colors.primaryText },
      secondaryText: { color: colors.secondaryText },
      styles: {
        backgroundColor: colors.background,
        emphasisColor: colors.emphasis,
      },
    };

    upsertTheme(t);
    closeEditThemeModal();
  };

  return (
    <Modal show={isEditThemeModalOpen} onHide={closeEditThemeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-2" md={2}>
            <Form.Control
              value={title}
              onChange={handleTitleChange}
              placeholder="Título do tema"
            />
            {[
              ["primaryText", "do texto primário"],
              ["secondaryText", "do texto secundário"],
              ["emphasis", "da ênfase"],
              ["background", "do plano de fundo"],
            ].map((type, i) => (
              <Col key={i}>
                <Form.Group as={Row}>
                  <Form.Label column htmlFor={`${type[0]}`}>
                    Cor {type[1]}
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="color"
                      id={`${type[0]}`}
                      value={colors[type[0]]}
                      title="Escolha a cor"
                      className="w-100"
                      onChange={handleColorChange}
                    />
                  </Col>
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Button type="submit">Editar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
