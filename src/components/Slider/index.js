import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import SliderList from "./SliderList";

export default function Slider({ resource }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const blocks = resource.map((block) => block.split("\n"));

  useEffect(() => {
    setActiveIndex(0);
  }, [resource]);

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
