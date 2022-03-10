import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DBContext } from "../../context/DBContext";
import Slider from "../Slider/";
import Preview from "./Preview";
import ThemesList from "./ThemesList";
import Projection from "../../pages/Projection";
import { ProjectionPreview } from "./styles";

export default function Presentation({ projectionScreenSize }) {
  const { activeItem } = useContext(DBContext);
  const { width, height } = projectionScreenSize;
  const projectionScreenAspectRatio = width / height;

  return (
    activeItem && (
      <Row>
        <Col
          xs={3}
          className="d-flex flex-column gap-2 justify-content-evenly py-2 slider"
        >
          <Slider resource={activeItem} />
        </Col>
        <Col className="preview-themes">
          <Row>
            <Col className="d-flex flex-column justify-content-center">
              <ProjectionPreview aspectRatio={projectionScreenAspectRatio}>
                <Projection />
              </ProjectionPreview>
            </Col>
          </Row>
          <Row>
            <Col className="theme-editor mh-100 d-flex flex-column overflow-hidden">
              <ThemesList />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  );
}
