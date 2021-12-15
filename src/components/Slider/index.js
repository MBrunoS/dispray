import React, { useContext } from "react";
import { DBContext } from "../../context/DBContext";
import BibleSlider from "./BibleSlider";
import SongSlider from "./SongSlider";

export default function Slider({ resource }) {
  const { activeItem } = useContext(DBContext);

  return (
    <>
      {activeItem.type === "bible" ? (
        <BibleSlider verses={resource} />
      ) : (
        <SongSlider lyric={resource} />
      )}
    </>
  );
}
