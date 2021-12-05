import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import "./style.css";

export default function Home() {
  return (
    <Stack gap={2} className="Home">
      <img
        src={process.env.PUBLIC_URL + "/logo-white.png"}
        className="logo mb-4"
      />
      <Link to="/meeting" className="home-link">
        <Button variant="primary">Exibir Reuniões</Button>
      </Link>

      <Link to="/" className="home-link">
        <Button variant="primary" disabled>
          Biblioteca (Bíblias, letras de músicas...)
        </Button>
      </Link>

      <Link to="/" className="home-link">
        <Button variant="primary" disabled>
          Configurações
        </Button>
      </Link>
    </Stack>
  );
}
