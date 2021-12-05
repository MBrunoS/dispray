const { contextBridge, ipcRenderer } = require("electron");

// This is to enable "require" in the renderer
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
