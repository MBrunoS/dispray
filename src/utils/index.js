import bible from "../db/acf.json";
import songs from "../db/songs.json";

export const getBooksNames = () => {
  return bible.map((book) => book.name);
};

export const getChaptersNumber = (book) => {
  return bible.find((b) => b.name === book).chapters.length;
};

export const getVersesNumber = (book, chapter) => {
  return bible.find((b) => b.name === book).chapters[chapter - 1].length;
};

export const getPassage = (book, chapter, vStart, vEnd) => {
  const verses = bible
    .find((b) => b.name === book)
    .chapters[chapter - 1].slice(vStart - 1, vEnd);

  return {
    type: "passage",
    book,
    chapter,
    start: vStart,
    end: vEnd,
    texts: verses,
    reference: `${book} ${chapter}:${vStart}${
      vEnd === vStart ? "" : `-${vEnd}`
    }`,
  };
};

export const searchBible = (text, limit) => {
  const results = [];

  for (const book of bible) {
    for (const [chapIndex, chapter] of book.chapters.entries()) {
      for (const [verseIndex, verse] of chapter.entries()) {
        if (results.length === limit) return results;

        const index = verse.toLowerCase().indexOf(text.toLowerCase());
        if (index !== -1) {
          results.push({
            index,
            type: "passage",
            book: book.name,
            chapter: chapIndex + 1,
            start: verseIndex + 1,
            texts: [verse],
            reference: `${book.name} ${chapIndex + 1}:${verseIndex + 1}`,
          });
        }
      }
    }
  }

  return results;
};

export const searchSongs = (text, limit) => {
  const results = [];

  for (const song of songs) {
    for (const stanza of song.lyric) {
      if (results.length === limit) return results;

      const index = stanza.toLowerCase().indexOf(text.toLowerCase());
      if (index !== -1) {
        results.push({
          index,
          type: "song",
          title: song.title,
          texts: song.lyric,
        });
        break;
      }
    }
  }

  return results;
};
