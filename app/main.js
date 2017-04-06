var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var Menu = electron.Menu;
var app = electron.app;
var ipc = electron.ipcMain;
var myAppMenu, menuTamplate;

function toggleWindow(whichWindow) {
  if (whichWindow.isVisible()) {
    whichWindow.hide();
  } else {
    whichWindow.show();
  }
}

app.on('ready', function() {
  var appWindow, infoWindow;
  appWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false
  }); //appWindow
  //appWindow.loadURL('http://macleanmanuscript.com');
  appWindow.loadURL('file://' + __dirname + '/indexReact.html');

  infoWindow = new BrowserWindow({
    width: 400,
    height: 300,
    show: false,
    frame: false
  }); //infoWindow

  infoWindow.loadURL('file://' + __dirname + '/info.html');

  appWindow.once('ready-to-show', function() {
    appWindow.show();
  }); //ready-to-show

  ipc.on('openInfoWindow', function(event, arg){
    event.returnValue='';
    infoWindow.show();
  }); //openInfoWindow

  ipc.on('closeInfoWindow', function(event, arg){
    event.returnValue='';
    infoWindow.hide();
  }); //closeInfoWindow


  //Note until we package it the new menu name will not show up correctly
  menuTemplate = [
    {
      label: 'CampWisdom',
      submenu: [
        {
          label: 'Abbout this App',
          accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I', //darwin is Mac iOS
          click(item) {toggleWindow(infoWindow)}
        },
        {
          role: 'help',
          label: 'our website',
          click() {electron.shell.openExternal('http://sil.org')}
        },
        {role: 'quit'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {        role: 'reload'      },
        {        role: 'forcereload'      },
        {        role: 'toggledevtools'      },
        {        type: 'separator'      },
        {        role: 'resetzoom'      },
        {        role: 'zoomin'      },
        {        role: 'zoomout'      },
        {        type: 'separator'      },
        {        role: 'togglefullscreen'      }
      ]
    }
  ];
  //myAppMenu = Menu.buildFromTemplate(menuTemplate);
  //Menu.setApplicationMenu(myAppMenu);

}); //app is ready
