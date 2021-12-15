import bible from "../db/acf.json";
import songs from "../db/songs.json";
import themes from "../db/themes.json";

export default function useResources() {
  return { bible, songs, themes };
}
