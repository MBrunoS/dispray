const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const { Console } = require("console");

let mainWindow, projectionWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false,
      preload: `${path.join(__dirname, "/preload.js")}`,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

function createProjectionWindow() {
  let config = {};
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  if (externalDisplay) {
    config = {
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      frame: false,
      fullscreen: true,
    };
  }
  projectionWindow = new BrowserWindow({
    ...config,
    parent: mainWindow,
    closable: false,
    show: false,
  });
  projectionWindow.loadURL(
    isDev
      ? "http://localhost:3000/#/projection"
      : `file://${path.join(__dirname, "../build/index.html/#/projection")}`
  );
  // projectionWindow.loadURL("https://google.com");

  ipcMain.on("PROJECTION_SHOW", () => {
    projectionWindow.show();
  });
  ipcMain.on("PROJECTION_HIDE", () => {
    projectionWindow.hide();
  });
}

// Menu.setApplicationMenu(null);

app.on("ready", () => {
  createWindow();
  createProjectionWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
