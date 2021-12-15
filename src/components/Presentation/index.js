import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DBContext } from "../../context/DBContext";
import Slider from "../Slider/";
import Preview from "./Preview";
import Themes from "./Themes";

export default function Presentation() {
  const { activeItem } = useContext(DBContext);

  return (
    activeItem && (
      <Row>
        <Col
          xs={3}
          className="d-flex flex-column gap-2 justify-content-evenly slider"
        >
          {activeItem.type === "song" ? (
            <Slider resource={activeItem.song.lyric} />
          ) : (
            <Slider resource={activeItem.passage.verses} />
          )}
        </Col>
        <Col className="preview-themes">
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <Preview />
            </Col>
          </Row>
          <Row>
            <Col className="theme-editor">
              <Themes />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  );
}
