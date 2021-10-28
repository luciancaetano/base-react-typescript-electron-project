/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    // await installExtensions();
  }

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: process.env.NODE_ENV === 'production',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    // process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    win.loadURL('http://localhost:3000');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    win.webContents.once('dom-ready', () => {
      if (win) {
        win.webContents.openDevTools();
      }
    });
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
