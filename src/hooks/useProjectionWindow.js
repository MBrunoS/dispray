export default function useProjectionWindow() {
  function show() {
    window.electron.ipcRenderer.send("PROJECTION_SHOW");
  }

  function hide() {
    window.electron.ipcRenderer.send("PROJECTION_HIDE");
  }

  return { showProjWindow: show, hideProjWindow: hide };
}
