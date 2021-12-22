import bible from "../db/acf.json";
import songs from "../db/songs.json";
import themes from "../db/themes.json";

const useResources = () => {
  return { bible, songs, themes };
};

export default useResources;
