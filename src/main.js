const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const DEFAULT_CONFIG = {
    "application":"publisher",
    "repository":[]
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.handle('load_config', async (e) => {
    if (fs.existsSync("config.json")) {
        return JSON.parse(fs.readFileSync("config.json", "utf-8"));
    }
    else {
        await fs.writeFileSync("config.json", JSON.stringify(DEFAULT_CONFIG))
        return DEFAULT_CONFIG;
    }
})
