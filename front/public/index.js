
var isDev = require('electron-is-dev')
if (isDev && __dirname.endsWith("build")) {
  console.log('hack to read real index.js')

  var fs = require("fs");
  var index_js = __dirname.replace('build', 'public') + '/index.js'
  require(index_js)
  // var data = fs.readFileSync(index_js);
  // const script = new vm.Script(data);
  // script.runInThisContext();
} else {

  const { app, BrowserWindow, protocol ,ipcMain} = require('electron')
  const path = require('path')
  const url = require('url')
  const openBackend=function(){
    const { execFile } =require('child_process');
    execFile(`${__dirname}/backend.exe`, [], {}, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }


  // Attach listener in the main process with the given ID
  ipcMain.on('openBackend', (event, arg) => {
    openBackend()
  });
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit()
  }

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow

  const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 266,
      height: 500,
      // frame: false,
      titleBarStyle: 'hidden' ,
      maximizable: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true
      }
    })
    
    // and load the index.html of the app.
    if (isDev) {
      mainWindow.loadURL('http://localhost:3000')
      mainWindow.webContents.openDevTools()
    } else {
      mainWindow.loadURL(`file://${__dirname}/index.html`)
      mainWindow.removeMenu()
      // console.log('load: ' + `file://${__dirname}/index.html`)
    }


    // Open the DevTools.


    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    // protocol.interceptFileProtocol(
    //   'file',
    //   (request, callback) => {
    //     console.log(request.url)
    //     const url = request.url.substr(7) /* all urls start with 'file://' */
    //     console.log(url)
    //     callback({ path: path.normalize(`${__dirname}/${url}`) })
    //   },
    //   err => {
    //     if (err) console.error('Failed to register protocol')
    //   }
    // )
    createWindow()
  })
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
