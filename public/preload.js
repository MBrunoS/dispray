const { contextBridge, ipcRenderer } = require("electron");

// We must do this to expose "ipcRenderer.on" and make it be functional
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    ...ipcRenderer,
    on: (channel, listener) => {
      ipcRenderer.on(channel, listener);
    },
    once: (channel, listener) => {
      ipcRenderer.once(channel, listener);
    },
    removeAllListeners: (channel) => {
      ipcRenderer.removeAllListeners(channel);
    },
  },
});
