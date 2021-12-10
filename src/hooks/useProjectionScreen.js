export default function useProjectionScreen() {
  return {
    update: (config) => {
      window.electron.ipcRenderer.send("PROJECTION_UPDATE", config);
    },
    clear: () => {
      window.electron.ipcRenderer.send("PROJECTION_CLEAR");
    },
  };
}
