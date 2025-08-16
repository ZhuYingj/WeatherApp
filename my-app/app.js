const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path');
let appWindow

function createWindow() {
    appWindow = new BrowserWindow({
        width: 700,
        height: 975,
        icon: "src/app/assets/hellokitty.ico"
    })
    appWindow.loadFile('dist/my-app/browser/index.html');

    appWindow.on('closed', function () {
        appWindow = null;
    })
}

app.whenReady().then(() => {
    createWindow()
})