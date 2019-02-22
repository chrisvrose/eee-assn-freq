const {app,BrowserWindow,ipcMain}= require('electron');



app.on('ready',()=>{
    let win = new BrowserWindow({show:false})

    let graphingwin = new BrowserWindow({show:false})

    // For graphing window
    graphingwin.loadFile('resources/grapher.html')
    graphingwin.setMenuBarVisibility(false)

    // For regular window
    win.loadFile('resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})




    // event that will be passed will have true or false based on whether to show or hide
    ipcMain.on('setGraphingWindowVisibility',(e,args)=>{
        if(args)
            graphingwin.show();
        else
            graphingwin.hide();
    })

    // Change or delete the existing graphs -
    // args[0] - true or false, true - modify, false - clear all
    // args[1] - JSON object to represent plot
    ipcMain.on('modifyGraphs',(e,args)=>{
        if(args[0]){
            // change graphs
        }
        else{
            // nerf
        }
    })



     
});