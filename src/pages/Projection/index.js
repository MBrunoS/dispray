import React, { useEffect, useState } from "react";
import useFormattedText from "../../hooks/useFormattedText";
import useResources from "../../hooks/useResources";
import ReactHtmlParser from "react-html-parser";
import "./styles.css";

export default function Projection() {
  const { themes } = useResources();
  const format = useFormattedText();
  const [theme, setTheme] = useState(themes[0]);
  const [primaryText, setPrimaryText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");

  const css = `.emphasis { color: ${theme.styles.emphasisColor} }`;

  useEffect(() => {
    window.electron.ipcRenderer.on("update-projection-theme", (e, newTheme) => {
      if (newTheme) {
        setTheme(newTheme);
      } else {
        setTheme(themes[0]);
      }
    });

    window.electron.ipcRenderer.on("update-projection-text", (e, data) => {
      setPrimaryText(format(data.primaryText));
      setSecondaryText(data.secondaryText);
    });

    window.electron.ipcRenderer.on("clear-projection-theme", () => {
      setTheme(themes[0]);
    });

    window.electron.ipcRenderer.on("clear-projection-text", () => {
      setPrimaryText("");
      setSecondaryText("");
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners("update-projection-theme");
      window.electron.ipcRenderer.removeAllListeners("update-projection-text");
      window.electron.ipcRenderer.removeAllListeners("clear-projection-theme");
      window.electron.ipcRenderer.removeAllListeners("clear-projection-text");
    };
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center gap-2 text-center projection-screen"
      style={{
        ...theme.styles,
        backgroundImage: theme.styles.backgroundImage
          ? `url(${process.env.PUBLIC_URL}/${theme.styles.backgroundImage})`
          : "none",
      }}
    >
      <style>{css}</style>
      <div
        className="projection-main-text"
        style={{
          color: theme.primaryText.color,
        }}
      >
        {Array.isArray(primaryText) ? (
          primaryText.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{ReactHtmlParser(primaryText)}</p>
        )}
      </div>

      {secondaryText && (
        <p style={{ color: theme.secondaryText.color }} className="footer-text">
          {secondaryText}
        </p>
      )}
    </div>
  );
}
