export default function useProjectionWindow() {
  function show() {
    window.ipcRenderer.send("PROJECTION_SHOW");
  }

  function hide() {
    window.ipcRenderer.send("PROJECTION_HIDE");
  }

  return { showProjWindow: show, hideProjWindow: hide };
}
