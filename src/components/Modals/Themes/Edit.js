import React, { useContext, useEffect, useState } from "react";
import { ModalsContext } from "../../../context/ModalsContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../../context/DBContext";
import useDialog from "../../../hooks/useDialog";

export default function EditThemeModal({ theme }) {
  const { isEditThemeModalOpen, closeEditThemeModal } =
    useContext(ModalsContext);
  const { themesDB, upsertTheme, fetchThemes } = useContext(DBContext);

  const [title, setTitle] = useState("");
  const [colors, setColors] = useState({});
  const dialog = useDialog();

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

  const handleDelete = () => {
    dialog(
      {
        type: "none",
        buttons: ["Não", "Sim"],
        title: "Confimar exclusão",
        message: "Tem certeza que deseja excluir este tema?",
      },
      (response) => {
        if (response === 1) {
          themesDB.remove(theme);
          fetchThemes();
          closeEditThemeModal();
        }
      }
    );
  };

  return (
    <Modal show={isEditThemeModalOpen} onHide={closeEditThemeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
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

          <div className="d-flex flex-row gap-2">
            <Button variant="danger" onClick={handleDelete} className="w-50">
              <i className="bi bi-trash-fill"></i>
              Excluir
            </Button>
            <Button type="submit" className="w-50">
              Salvar alterações
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
