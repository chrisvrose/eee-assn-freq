
const {app,BrowserWindow,ipcMain}= require('electron');

let win = null;
let graphingwin = null;

graphSet = []

function initGrapher(functionCall= ()=>{}){
    graphingwin = new BrowserWindow({show:false,minWidth:854,minHeight:480,frame:false,webPreferences:{devTools:true}/*,parent:win*/});
    graphingwin.loadFile('./resources/grapher.html')
    graphingwin.setMenuBarVisibility(false)
    graphingwin.on('closed',()=>{
        graphingwin = null
        graphSet.length = 0
    })
    graphingwin.on('ready-to-show',()=>{
        graphingwin.show();
        // Call passed lambda
        functionCall();
    })
    return graphingwin;
}

// Compare the objects of input to make sure they are identical
function DeepCompareGS(ob1,ob2){
    let a = true;
    a = a && (ob1.V==ob2.V)
    a = a&& (ob1.L==ob2.L)
    a = a&& (ob1.C==ob2.C)
    a = a&& (ob1.R==ob2.R)
    a = a&& (ob1.F==ob2.F)
    //console.log("A ",a)
    return a
}


app.on('ready',()=>{
    win = new BrowserWindow({
        show:false,
        minWidth:1280,
        minHeight:720,
        frame:false,
        webPreferences:{
            devTools:true
        }
    })
    win.loadFile('./resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})

    // Change or delete the existing graphs -
    // args[0]      - true or false, true - modify, false - clear all
    // args[1]      - 
    // args[1][0]   - Input results
    // args[1][1]   - Calculated results
    ipcMain.on('modG',(event,args)=>{
        // Send the updated module to the master window
        if(args[0]&&!graphingwin){
            // Opening a new window, send it only after it is ready
            // No need to check whether pushable, first element either way
            graphSet.push(args[1])
            initGrapher(()=>{
                graphingwin.webContents.send('modGR',graphSet)
            })
        }
        else if(!args[0]&&graphingwin) {
            // Close window, dump window and empty stack
            graphingwin.close()
            graphingwin=null
            graphSet.length = 0
        }
        else if(graphingwin){
            // Compare element-wise to determine need to re-send element
            if(!DeepCompareGS(args[1][0],graphSet[graphSet.length-1][0])){
                graphSet.push(args[1])
                graphingwin.webContents.send('modGR',graphSet)
            }
                
        }
        
    })
});

app.on('window-all-closed',()=>{app.exit()})