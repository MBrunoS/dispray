import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DBContext } from "../../context/DBContext";
import Slider from "../Slider/";

export default function Presentation() {
  const { activeElement } = useContext(DBContext);

  return activeElement?.type === "song" ? (
    <Row>
      <Col
        xs={4}
        className="d-flex flex-column gap-2 justify-content-evenly bg-secondary"
      >
        <Slider resource={activeElement.song.lyric} />
      </Col>
    </Row>
  ) : (
    activeElement?.type === "bible" && (
      <Row>
        <Col
          xs={4}
          className="d-flex flex-column gap-2 justify-content-evenly bg-secondary"
        >
          <Slider resource={activeElement.passage.verses} />
        </Col>
      </Row>
    )
  );
}
