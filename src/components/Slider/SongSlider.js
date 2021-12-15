import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import SliderList from "./SliderList";
import useProjectionWindow from "../../hooks/useProjectionWindow";

export default function SongSlider({ lyric }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const blocks = lyric.map((block) => block.split("\n"));
  const projectionWindow = useProjectionWindow();

  useEffect(() => {
    setActiveIndex(0);

    projectionWindow.updateText({
      mainText: blocks[0],
    });
  }, [lyric]);

  useEffect(() => {
    projectionWindow.updateText({
      mainText: blocks[activeIndex],
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
