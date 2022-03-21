const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  screen,
  dialog,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow, projectionWindow;

function createWindow() {
  const factor = screen.getPrimaryDisplay().scaleFactor;

  mainWindow = new BrowserWindow({
    width: 900 / factor,
    height: 680 / factor,
    backgroundColor: "#121924",
    minWidth: 800,
    webPreferences: {
      zoomFactor: 1.0 / factor,
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
  let config = {},
    factor = screen.getPrimaryDisplay().scaleFactor;
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if (externalDisplay) {
    factor = externalDisplay.scaleFactor;
    config = {
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      frame: false,
      fullscreen: true,
    };
  }

  projectionWindow = new BrowserWindow({
    ...config,
    closable: false,
    show: false,
    parent: mainWindow,
    backgroundColor: "#000000",
    webPreferences: {
      zoomFactor: 1.0 / factor,
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

  ipcMain.on("SHOW_DIALOG", (e, options) => {
    const response = dialog.showMessageBoxSync(
      BrowserWindow.getFocusedWindow(),
      options
    );
    e.reply("dialog-response", response);
  });

  projectionWindow.webContents.on("did-finish-load", () => {
    const winBounds = projectionWindow.getBounds();
    const projectionScreen = screen.getDisplayNearestPoint({
      x: winBounds.x,
      y: winBounds.y,
    });

    mainWindow.webContents.send(
      "projection-screen-dimensions",
      projectionScreen.size
    );

    ipcMain.on("PROJECTION_UPDATE_THEME", (e, newTheme) => {
      mainWindow.webContents.send("update-projection-theme", newTheme);
      projectionWindow.webContents.send("update-projection-theme", newTheme);
    });

    ipcMain.on("PROJECTION_UPDATE_TEXT", (e, data) => {
      mainWindow.webContents.send("update-projection-text", data);
      projectionWindow.webContents.send("update-projection-text", data);
    });

    ipcMain.on("PROJECTION_CLEAR_THEME", () => {
      mainWindow.webContents.send("clear-projection-theme");
      projectionWindow.webContents.send("clear-projection-theme");
    });

    ipcMain.on("PROJECTION_CLEAR_TEXT", () => {
      mainWindow.webContents.send("clear-projection-text");
      projectionWindow.webContents.send("clear-projection-text");
    });
  });
}

// Menu.setApplicationMenu(null);

app.on("ready", () => {
  createWindow();
  createProjectionWindow();

  if (isDev) {
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
  }
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
