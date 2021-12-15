import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import SliderList from "./SliderList";
import { DBContext } from "../../context/DBContext";
import useProjectionWindow from "../../hooks/useProjectionWindow";

export default function BibleSlider({ verses }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { activeItem } = useContext(DBContext);
  const projectionWindow = useProjectionWindow();
  const { passage } = activeItem;

  useEffect(() => {
    setActiveIndex(0);

    projectionWindow.updateText({
      mainText: verses[0],
      footerText: `${passage.book} ${passage.chapter}:${passage.start}`,
    });
  }, [verses]);

  useEffect(() => {
    projectionWindow.updateText({
      mainText: verses[activeIndex],
      footerText: `${passage.book} ${passage.chapter}:${
        passage.start + activeIndex
      }`,
    });
  }, [activeIndex]);

  function handler(e) {
    setActiveIndex(+e.currentTarget.dataset.index);
  }

  function prev() {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  }
  function next() {
    if (activeIndex === verses.length - 1) return;
    setActiveIndex(activeIndex + 1);
  }

  return (
    <>
      <SliderList blocks={verses} active={activeIndex} clickHandler={handler} />

      <ButtonGroup aria-label="Controles dos Slides">
        <Button variant="dark" onClick={prev}>
          Anterior
        </Button>
        <Button variant="dark" onClick={next}>
          Próximo
        </Button>
      </ButtonGroup>
    </>
  );
}
