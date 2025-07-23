const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});
// This code bridges the gap between the main process and the renderer process
contextBridge.exposeInMainWorld("actions", {
  sendMessage: (msg) => ipcRenderer.invoke("message", msg),
});
