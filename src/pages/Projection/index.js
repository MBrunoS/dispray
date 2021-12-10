import React, { useEffect, useState } from "react";
import deepmerge from "deepmerge";
import "./styles.css";

const INITIAL_SCREEN_CONFIG = {
  mainText: { color: "#ffffff", lines: [] },
  footerText: { color: "#ffffff", content: "" },
  background: "#000000",
};

export default function Projection() {
  const [screen, setScreen] = useState(INITIAL_SCREEN_CONFIG);

  useEffect(() => {
    window.electron.ipcRenderer.on("update-proj", (e, config) => {
      setScreen(deepmerge(screen, config));
    });

    window.electron.ipcRenderer.on("clear-proj", () => {
      setScreen(INITIAL_SCREEN_CONFIG);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners("update-proj");
      window.electron.ipcRenderer.removeAllListeners("clear-proj");
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center gap-2 text-center projection-screen">
      <div className="projection-main-text">
        {Array.isArray(screen.mainText.lines) ? (
          screen.mainText.lines.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{screen.mainText.lines}</p>
        )}
      </div>

      {screen.footerText.content && (
        <p className="projection-footer-text">{screen.footerText.content}</p>
      )}
    </div>
  );
}
