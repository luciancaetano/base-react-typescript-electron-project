// eslint-disable-next-line
import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

let win: BrowserWindow | null;

const installExtensions = async () => {
  // eslint-disable-next-line
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload))).catch((e: any) => {
    //eslint-disable-next-line
    console.log(e);
  });
};

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
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

  if (win) {
    win.setMenu(null);
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
