import React, { useContext, useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import SliderList from "./SliderList";
import { DBContext } from "../../context/DBContext";
import useProjectionScreen from "../../hooks/useProjectionScreen";

export default function SongSlider({ lyric }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const blocks = lyric.map((block) => block.split("\n"));
  const { activeElement } = useContext(DBContext);
  const projectionScreen = useProjectionScreen();

  useEffect(() => {
    setActiveIndex(0);

    const elem = activeElement.type === "bible" ? activeElement.passage : null;

    projectionScreen.update({
      mainText: { lines: blocks[0] },
    });
  }, [lyric]);

  useEffect(() => {
    projectionScreen.update({
      mainText: { lines: blocks[activeIndex] },
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
    if (activeIndex === blocks.length - 1) return;
    setActiveIndex(activeIndex + 1);
  }

  return (
    <>
      <SliderList blocks={blocks} active={activeIndex} clickHandler={handler} />

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
