
const {app,BrowserWindow,ipcMain}= require('electron');

let win = null;
let graphingwin = null;

graphSet = []

function initGrapher(functionCall= ()=>{}){
    graphingwin = new BrowserWindow({show:false,minWidth:854,minHeight:720,frame:false,webPreferences:{devTools:true}/*,parent:win*/});
    graphingwin.loadFile('./resources/grapher.html')
    graphingwin.setMenuBarVisibility(false)
    graphingwin.on('closed',()=>{
        graphingwin = null
        graphSet.length = 0
    })
    graphingwin.on('ready-to-show',()=>{
        graphingwin.show();
        functionCall();
    })
    return graphingwin;
}

function DeepCompareGS(ob1,ob2){
    let a = true;
    a = a && (ob1.V==ob2.V)
    a = a&& (ob1.L==ob2.L)
    a = a&& (ob1.C==ob2.C)
    a = a&& (ob1.R==ob2.R)
    a = a&& (ob1.F==ob2.F)
    console.log("A ",a)
    return a
}


app.on('ready',()=>{
    win = new BrowserWindow({show:false,minWidth:1280,minHeight:720,frame:false,webPreferences:{devTools:true}})
    win.loadFile('./resources/index.html')
    win.setMenuBarVisibility(false)
    win.on('ready-to-show',()=>{win.show()})

    // Change or delete the existing graphs -
    // args[0] - true or false, true - modify, false - clear all
    // args[1] - array of json object to represent currentstate and results calculated
    ipcMain.on('modG',(event,args)=>{
        // Send the updated module to the master window
        console.log(args[0]+" "+graphingwin)
        if(args[0]&&!graphingwin){
            
            graphSet.push(args[1])
            initGrapher(()=>{
                graphingwin.webContents.send('modGR',graphSet)
            })
            console.log("OPEN")

            //Copied from last else
        }
        else if(!args[0]&&graphingwin) {
            graphingwin.close()
            graphingwin=null
            graphSet.length = 0
        }
        else if(graphingwin){
            //if(args[1]!=graphSet[graphSet.length-1])\
            console.log(graphSet[graphSet.length-1][0]);
            if(!DeepCompareGS(args[1][0],graphSet[graphSet.length-1][0]))
                graphSet.push(args[1])
            graphingwin.webContents.send('modGR',graphSet)
        }
        
        // Send the updates graphset to the plotting window, passing through main as main recieves it anyways
        
    })
});

app.on('window-all-closed',()=>{app.exit()})