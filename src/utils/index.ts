import bible from "../db/acf.json";
import songs from "../db/songs.json";

export const getBooksNames = () => {
  return bible.map((book) => book.name);
};

export const getChaptersNumber = (book: string) => {
  return bible.find((b) => b.name === book).chapters.length;
};

export const getVersesNumber = (book: string, chapter: number) => {
  return bible.find((b) => b.name === book).chapters[chapter - 1].length;
};

export const getPassage = (
  book: string,
  chapter: number,
  vStart: number,
  vEnd: number
) => {
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

export const searchBible = (text: string, limit: number) => {
  const results: BiblePassage[] = [];

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

export const searchSongs = (text: string, limit: number) => {
  const results: Songs[] = [];

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
