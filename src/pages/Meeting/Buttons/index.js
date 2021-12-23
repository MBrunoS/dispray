import React, { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ModalsContext } from "../../../context/ModalsContext";
import BibleItemModal from "../../../components/Modals/Items/Bible";
import SongsItemModal from "../../../components/Modals/Items/Songs";

export default function MeetingButtons() {
  const { showBibleModal, showSongsModal } = useContext(ModalsContext);

  return (
    <>
      <ButtonGroup className="mx-2">
        <OverlayTrigger
          placement={"bottom"}
          delay={300}
          overlay={
            <Tooltip id="bible-tooltip">Buscar versículos da Bíblia</Tooltip>
          }
        >
          <Button onClick={showBibleModal} variant="secondary">
            <i className="bi bi-book"></i>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"bottom"}
          delay={300}
          overlay={
            <Tooltip id="songs-tooltip">Buscar letras de músicas</Tooltip>
          }
        >
          <Button onClick={showSongsModal} variant="secondary">
            <i className="bi bi-music-note-list"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>

      <BibleItemModal />

      <SongsItemModal />
    </>
  );
}
