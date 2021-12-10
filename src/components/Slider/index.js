import React, { useContext } from "react";
import { DBContext } from "../../context/DBContext";
import BibleSlider from "./BibleSlider";
import SongSlider from "./SongSlider";

export default function Slider({ resource }) {
  const { activeElement } = useContext(DBContext);

  return (
    <>
      {activeElement.type === "bible" ? (
        <BibleSlider verses={resource} />
      ) : (
        <SongSlider lyric={resource} />
      )}
    </>
  );
}
