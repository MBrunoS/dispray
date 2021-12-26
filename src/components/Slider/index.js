import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { DBContext } from "../../context/DBContext";
import { ModalsContext } from "../../context/ModalsContext";
import SliderList from "./SliderList";
import useProjectionWindow from "../../hooks/useProjectionWindow";
import EditSlideModal from "../Modals/Slides/Edit";

export default function Slider({ resource }) {
  const { activeItem, activeMeeting } = useContext(DBContext);
  const { showEditSlideModal } = useContext(ModalsContext);
  const projectionWindow = useProjectionWindow();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [resource]);

  useEffect(() => {
    if (activeIndex >= 0) {
      projectionWindow.updateText({
        primaryText: resource.texts[activeIndex],
        secondaryText: resource.reference,
      });
    }
  }, [activeIndex]);

  function handler(e) {
    if (activeIndex === -1) {
      projectionWindow.updateTheme(activeMeeting.theme);
    }
    setActiveIndex(+e.currentTarget.dataset.index);
  }

  function prev() {
    if (activeIndex <= 0) return;
    setActiveIndex(activeIndex - 1);
  }
  function next() {
    if (activeIndex === resource.texts.length - 1) return;
    setActiveIndex(activeIndex + 1);
  }

  return (
    <>
      {activeItem.type === "passage" ? (
        <SliderList
          blocks={resource.texts}
          active={activeIndex}
          clickHandler={handler}
          altInfo={resource}
        />
      ) : (
        <SliderList
          blocks={resource.texts.map((block) => block.split("\n"))}
          active={activeIndex}
          clickHandler={handler}
        />
      )}

      <ButtonGroup aria-label="Controles dos Slides">
        <Button variant="secondary" onClick={prev}>
          {"<"}
        </Button>
        <Button
          variant="secondary"
          onClick={showEditSlideModal}
          disabled={activeIndex === -1}
        >
          Editar slide atual
        </Button>
        <Button variant="secondary" onClick={next}>
          {">"}
        </Button>
      </ButtonGroup>

      <EditSlideModal
        content={resource.texts[activeIndex]}
        index={activeIndex}
      />
    </>
  );
}
