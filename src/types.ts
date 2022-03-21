export type Meeting = {
  _id: string;
  name: string;
  elements: BiblePassage[] | Song[];
  theme: Theme | null;
};

export type Theme = {
  title: string;
  primaryText: { color: string };
  secondaryText: { color: string };
  emphasisColor: string;
  styles: {
    backgroundColor: string;
    backgroundImage?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
  };
};

export type BiblePassage = {
  index: number;
  type: "passage";
  book: string;
  chapter: number;
  start: number;
  texts: string[];
  reference: string;
};

export type Song = {
  index: number;
  type: "song";
  title: string;
  texts: string[];
};
