const {app,BrowserWindow}= require('electron');


app.on('ready',()=>{
    let win = new BrowserWindow({show:false});
    win.loadFile('resources/')
    win.on('ready-to-show',()=>{win.show()})
});