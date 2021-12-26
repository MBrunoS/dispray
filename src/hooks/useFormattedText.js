const HIDE_REGEX = /\[\S[^[\]]+\]/gm;
const EMPHASIS_REGEX = /\*(\S[^*]+)\*/gm;

const useFormattedText = () => {
  return (rawText) => {
    return rawText
      .replace(HIDE_REGEX, "[...]")
      .replace(EMPHASIS_REGEX, "<span class='emphasis'>$1</span>");
  };
};

export default useFormattedText;
