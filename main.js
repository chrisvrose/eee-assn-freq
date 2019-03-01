/*

*/
const {app,BrowserWindow,ipcMain}= require('electron');


function initGrapher(){
    let g = new BrowserWindow({show:false,minWidth:854,minHeight:720,frame:false,webPreferences:{devTools:true}});
    g.loadFile('./resources/grapher.html')
    g.setMenuBarVisibility(false)
    g.on('ready-to-show',()=>{g.show()})
    return g;
}


app.on('ready',()=>{
    let win = new BrowserWindow({show:false,minWidth:1280,minHeight:720,frame:false,webPreferences:{devTools:true}})

    let graphingwin = initGrapher();

    // For graphing window
    // For regular window
    win.loadFile('./resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})

    // Change or delete the existing graphs -
    // args[0] - true or false, true - modify, false - clear all
    // args[1] - array of json object to represent currentstate and results calculated
    ipcMain.on('modG',(event,args)=>{
        // Send the updated module to the master window
        if(args[0]&&!graphingwin){
            graphingwin = initGrapher()
            
        }
        if(!args[0]&&graphingwin) {graphingwin.close();graphingwin=null;}
        
        // Send the updates graphset to the plotting window, passing through main as main recieves it anyways
        
    })
});

app.on('window-all-closed',()=>{app.exit()})