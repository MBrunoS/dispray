const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

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
    webPreferences: {
      nodeIntegration: false,
      preload: `${path.join(__dirname, "/preload.js")}`,
    },
  });
  projectionWindow.loadURL(
    isDev
      ? "http://localhost:3000/#/projection"
      : `file://${path.join(__dirname, "../build/index.html/#/projection")}`
  );

  ipcMain.on("PROJECTION_SHOW", () => {
    projectionWindow.show();
  });

  ipcMain.on("PROJECTION_HIDE", () => {
    projectionWindow.hide();
  });

  projectionWindow.webContents.on("did-finish-load", () => {
    ipcMain.on("PROJECTION_UPDATE_THEME", (e, newTheme) => {
      projectionWindow.webContents.send("update-projection-theme", newTheme);
    });

    ipcMain.on("PROJECTION_UPDATE_TEXT", (e, data) => {
      projectionWindow.webContents.send("update-projection-text", data);
    });

    ipcMain.on("PROJECTION_CLEAR_THEME", () => {
      projectionWindow.webContents.send("clear-projection-theme");
    });

    ipcMain.on("PROJECTION_CLEAR_TEXT", () => {
      projectionWindow.webContents.send("clear-projection-text");
    });
  });
}

// Menu.setApplicationMenu(null);

app.on("ready", () => {
  createWindow();
  createProjectionWindow();

  // react dev tools
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require("electron-devtools-installer");

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => {
      console.log(`Added Extension:  ${name}`);
    })
    .catch((err) => {
      console.log("An error occurred: ", err);
    });
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
