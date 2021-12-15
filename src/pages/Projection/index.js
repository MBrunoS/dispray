import React, { useEffect, useState } from "react";
import useResources from "../../hooks/useResources";
import "./styles.css";

export default function Projection() {
  const { themes } = useResources();
  const [theme, setTheme] = useState(themes[0]);
  const [mainText, setMainText] = useState("");
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    window.electron.ipcRenderer.on("update-projection-theme", (e, newTheme) => {
      setTheme(newTheme);
    });

    window.electron.ipcRenderer.on("update-projection-text", (e, data) => {
      setMainText(data.mainText);
      setFooterText(data.footerText);
    });

    window.electron.ipcRenderer.on("clear-projection-theme", () => {
      setTheme(themes[0]);
    });

    window.electron.ipcRenderer.on("clear-projection-text", () => {
      setMainText("");
      setFooterText("");
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
      <div
        className="projection-main-text"
        style={{
          color: theme.mainText.color,
        }}
      >
        {Array.isArray(mainText) ? (
          mainText.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{mainText}</p>
        )}
      </div>

      {footerText && (
        <p style={{ color: theme.footerText.color }}>{footerText}</p>
      )}
    </div>
  );
}
