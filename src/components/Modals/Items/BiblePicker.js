import React, { useContext, useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getBooksNames,
  getChaptersNumber,
  getPassage,
  getVersesNumber,
} from "../../../utils";
import { DBContext } from "../../../context/DBContext";

export default function BiblePicker(props) {
  const books = getBooksNames();
  const [bookName, setBookName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [verseStart, setVerseStart] = useState("");
  const [verseEnd, setVerseEnd] = useState("");
  const { upsertMeeting, activeMeeting } = useContext(DBContext);

  const handleBook = (e) => {
    setBookName(e.target.value);
  };

  const handleChapter = (e) => {
    setChapter(+e.target.value);
    setVerseStart("");
    setVerseEnd("");
  };

  const handleVerseStart = (e) => {
    setVerseStart(+e.target.value);
  };

  const handleVerseEnd = (e) => {
    setVerseEnd(+e.target.value);
  };

  const handlePick = (e) => {
    const passage = getPassage(bookName, chapter, verseStart, verseEnd);

    const service = {
      ...activeMeeting,
      elements: [...activeMeeting.elements, { type: "bible", passage }],
    };
    upsertMeeting(service);
  };

  useEffect(() => {
    if (bookName) {
      const _chapters = [];
      const number = getChaptersNumber(bookName);
      for (let i = 0; i < number; i++) {
        _chapters.push(i);
      }
      setChapters(_chapters);
    }
  }, [bookName]);

  useEffect(() => {
    if (bookName && chapter) {
      const _verses = [];
      const number = getVersesNumber(bookName, chapter);
      for (let i = 0; i < number; i++) {
        _verses.push(i);
      }
      setVerses(_verses);
    }
  }, [chapter]);

  return (
    <InputGroup {...props}>
      <Form.Select value={bookName} onChange={handleBook}>
        <option value="" disabled>
          Livro
        </option>
        {books.map((b, i) => (
          <option value={b} key={i}>
            {b}
          </option>
        ))}
      </Form.Select>

      <Form.Select value={chapter} onChange={handleChapter}>
        <option value="" disabled>
          Capítulo
        </option>
        {chapters.map((n) => (
          <option value={n + 1} key={n}>
            {n + 1}
          </option>
        ))}
      </Form.Select>

      <Form.Select value={verseStart} onChange={handleVerseStart}>
        <option value="" disabled>
          Vers. inicial
        </option>
        {verses.map((n) => (
          <option value={n + 1} key={n}>
            {n + 1}
          </option>
        ))}
      </Form.Select>

      <Form.Select value={verseEnd} onChange={handleVerseEnd}>
        <option value="" disabled>
          Vers. final
        </option>
        {verseStart &&
          verses.slice(+verseStart - 1).map((n) => (
            <option value={n + 1} key={n}>
              {n + 1}
            </option>
          ))}
      </Form.Select>

      <Button onClick={handlePick}>Adicionar</Button>
    </InputGroup>
  );
}
