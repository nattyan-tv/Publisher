const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
  "requires",
  { // window.requiresで呼び出せる
    ipcRenderer : ipcRenderer
  }
);
