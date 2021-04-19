'use strict';

/* const escpos = require('escpos');
escpos.Serial = require('escpos-serialport'); */
const { ipcMain, Notification } = require('electron');

const path = require('path');
const url = require('url');

// const sound = require('sound-play');

import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

/* const print = value => {
  setTimeout(() => {
    console.log('print start');

    // escpos.USB = require('escpos-usb');
    // const device  = new escpos.USB();
    const device = new escpos.Serial('COM2');
    const options = { encoding: 'cp860' };
    const printer = new escpos.Printer(device, options);

    device.open(function() {
      printer
        .align('ct')
        .size(1, 1)
        .text(value)
        .table(['Um', 'Dois', 'Três'])
        .tableCustom([
          { text: 'Esquerda', align: 'LEFT', width: 0.33 },
          { text: 'Centro', align: 'CENTER', width: 0.33 },
          { text: 'Direita', align: 'RIGHT', width: 0.33 },
        ])
        .cut()
        .close();
    });

    console.log('print end');
  }, 1000);
};

ipcMain.on('print', (event, value) => {
  print(value);
}); */

ipcMain.on('notification', (event, value) => {
  if (value === true) {
    const notification = {
      title: 'Bemyhelp Essencial',
      body: 'Novo pedido',
    };
    new Notification(notification).show();
  }
});

// Under the main thread, listen to the getPrinterList event passed by the rendering thread through the ipcMain object
/* ipcMain.on('getPrinterList', event => {
  // the main thread gets the printers list
  const list = win.webContents.getPrinters();
  // sends events to the rendering thread through webContents and passes the printers list
  win.webContents.send('getPrinterList', list);
}); */

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
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

    /* win.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
        hash: slug,
      })
    ); */

    /* ipcMain.on('getPrinterDefaultName', event => {
      const list = win.webContents.getPrinters();

      let name = '';
      for (let item of list) {
        item.isDefault && (name = item.name);
      }

      event.returnValue = name;
    }); */
  }
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
