const {app,BrowserWindow,ipcMain}= require('electron');



app.on('ready',()=>{
    let win = new BrowserWindow({show:false})
    ipcMain.on('ping',(e,args)=>console.log(`pinged ${args}`));
    win.loadFile('resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})

});