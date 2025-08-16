const {
    app,
    BrowserWindow
} = require('electron')

let appWindow

function createWindow() {
    appWindow = new BrowserWindow({
        width: 700,
        height: 975
    })
    appWindow.loadFile('dist/my-app/browser/index.html');

    appWindow.on('closed', function () {
        appWindow = null;
    })
}

app.whenReady().then(() => {
    createWindow()
})