type Meeting = {
  _id: string;
  name: string;
  elements: BiblePassage[] | Songs[];
  theme: Theme;
};

type Theme = {
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

type BiblePassage = {
  index: number;
  type: "passage";
  book: string;
  chapter: number;
  start: number;
  texts: string[];
  reference: string;
};

type Songs = {
  index: number;
  type: "song";
  title: string;
  texts: string[];
};
