import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

// block: [
//   ['line 1', 'line 2', ...],
//   ['second block line 1', ...]
// ]

export default function SliderList({ blocks, active, clickHandler }) {
  return (
    <ListGroup variant="flush" className="flex-grow-1">
      {blocks.map((block, i) => {
        return (
          <ListGroup.Item
            action
            active={active === i}
            onClick={clickHandler}
            key={i}
            data-index={i}
            variant="secondary"
          >
            {block.map((line, index) => {
              return (
                <p className="m-0" key={index}>
                  {line}
                </p>
              );
            })}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
