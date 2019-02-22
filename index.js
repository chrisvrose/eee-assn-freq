const {app,BrowserWindow,ipcMain}= require('electron');

let graphSet = []


app.on('ready',()=>{
    let win = new BrowserWindow({show:false,minWidth:854,minHeight:480})

    let graphingwin = new BrowserWindow({show:false,parent:win})

    // For graphing window
    graphingwin.loadFile('resources/grapher.html')
    graphingwin.setMenuBarVisibility(false)

    // For regular window
    win.loadFile('resources/testing/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})



    // event that will be passed will have true or false based on whether to show or hide
    ipcMain.on('setGWV',(e,args)=>{
        console.log(args);
        if(args)
            graphingwin.show();
        else
            graphingwin.hide();
    })

    // Change or delete the existing graphs -
    // args[0] - true or false, true - modify, false - clear all
    // args[1] - JSON object to represent plot
    ipcMain.on('modG',(event,args)=>{
        if(args[0]){
            // change graphs
            graphSet.push(args[1])
            event.sender.send('modGR',graphSet);
        }
        else{
            // nerf
            graphSet.length = 0;
            event.sender.send('modGR',graphSet);
        }
        
    })



     
});

app.on('window-all-closed',()=>{app.exit()})