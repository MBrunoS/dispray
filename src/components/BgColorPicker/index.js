import React, { useState } from "react";
import { ColorPicker } from "react-color-gradient-picker";
import "react-color-gradient-picker/dist/index.css";

export default function BgColorPicker() {
  const [color, setColor] = useState({ red: 0, green: 0, blue: 0, alpha: 1 });

  const handleChange = (colorAttrs) => {
    setColor(colorAttrs);
  };

  return (
    <ColorPicker
      onStartChange={handleChange}
      onChange={handleChange}
      onEndChange={handleChange}
      color={color}
      isGradient
    />
  );
}
