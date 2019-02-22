const {app,BrowserWindow}= require('electron');

app.on('ready',()=>{
    let win = new BrowserWindow({show:false})
    win.loadFile('resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})

});