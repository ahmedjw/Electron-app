const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

ipcMain.handle("ping", () => "pong");
ipcMain.handle("message", (event, msg) => {
  console.log("Received message:", msg);
  return `Message received: ${msg}`;
});
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Ensure the preload script is correctly referenced
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools(); // Open DevTools for debugging
};

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
