const useProjectionWindow = () => {
  return {
    show: () => {
      window.electron.ipcRenderer.send("PROJECTION_SHOW");
    },

    hide: () => {
      window.electron.ipcRenderer.send("PROJECTION_HIDE");
    },

    updateTheme: (newTheme) => {
      window.electron.ipcRenderer.send("PROJECTION_UPDATE_THEME", newTheme);
    },

    updateText: (data) => {
      window.electron.ipcRenderer.send("PROJECTION_UPDATE_TEXT", data);
    },

    clearTheme: () => {
      window.electron.ipcRenderer.send("PROJECTION_CLEAR_THEME");
    },

    clearText: () => {
      window.electron.ipcRenderer.send("PROJECTION_CLEAR_TEXT");
    },
  };
};

export default useProjectionWindow;
