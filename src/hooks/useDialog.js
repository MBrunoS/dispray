const useDialog = () => {
  return (options, callback) => {
    window.electron.ipcRenderer.send("SHOW_DIALOG", options);

    window.electron.ipcRenderer.once("dialog-response", (e, response) => {
      callback(response);
    });
  };
};

export default useDialog;
