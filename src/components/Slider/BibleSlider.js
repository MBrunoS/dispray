import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import SliderList from "./SliderList";
import { DBContext } from "../../context/DBContext";
import useProjectionScreen from "../../hooks/useProjectionScreen";

export default function BibleSlider({ verses }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { activeElement } = useContext(DBContext);
  const projectionScreen = useProjectionScreen();
  const { passage } = activeElement;

  useEffect(() => {
    setActiveIndex(0);

    projectionScreen.update({
      mainText: { lines: verses[0] },
      footerText: {
        content: `${passage.book} ${passage.chapter}:${passage.start}`,
      },
    });
  }, [verses]);

  useEffect(() => {
    projectionScreen.update({
      mainText: { lines: verses[0] },
      footerText: {
        content: `${passage.book} ${passage.chapter}:${
          passage.start + activeIndex
        }`,
      },
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
