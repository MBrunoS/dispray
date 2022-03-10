import React, { useEffect, useState } from "react";

export default function Preview() {
  const [preview, setPreview] = useState();

  useEffect(() => {
    window.electron.ipcRenderer.on("projection-screen", (e, data) => {
      setPreview(data);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners("projection-screen");
    };
  }, []);

  return <img src={preview} className="preview-img" />;
}
