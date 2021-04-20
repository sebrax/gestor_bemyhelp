'use strict';

const { ipcMain, Notification } = require('electron');
import { autoUpdater } from 'electron-updater';
const log = require('electron-log');

const path = require('path');
const url = require('url');

import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

ipcMain.on('notification', (event, value) => {
  if (value === true) {
    const notification = {
      title: 'Bemyhelp Essencial',
      body: 'Novo pedido',
    };
    new Notification(notification).show();
  }
});


autoUpdater.logger = log;
autoUpdater.logger.trasports.file.level = 'info';
log.info('App starting...');


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {

  const win = new BrowserWindow({
    width: 1200,
    height: 768,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
  });
  
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    win.removeMenu();
  }
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development

    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
        // hash: slug
      })
    );
  }
  
  const sendStatusToWindow = text => {
    log.info(text);
    win.webContents.send('message', text);
  }

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });

  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.');
  });
  
  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.');
  });
  
  autoUpdater.on('error', () => {
    sendStatusToWindow('Error in auto-updater.');
  });
  
  autoUpdater.on('download-progress', () => {
    sendStatusToWindow('Download progress...');
  });

  autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');

    setTimeout(() => {
      autoUpdater.quitAndInstall()
    }, 5000);
  });

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

process.on('exit', () => {
  app.quit();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}