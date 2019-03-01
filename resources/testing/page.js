const {ipcRenderer} = require('electron');
const math = require('mathjs')
// Updates - Represented as a JSON object, for all the quantities required for math stuff

//ipcRenderer.send('setGWV',true);
// Wrap them in an onload so that they tag onto the page elements when everything is ready
window.addEventListener('load',()=>{
    document.getElementById('gs').addEventListener('click',()=>{
        ipcRenderer.send('setGWV',true);
    })

    document.getElementById('gh').addEventListener('click',()=>{
        ipcRenderer.send('setGWV',false);
    })

    document.getElementById('gsin').addEventListener('click',()=>{
        // PH - Got the data
        ipcRenderer.on('modGR',(e,x)=>{document.getElementById('something').innerHTML = x;})
        ipcRenderer.send('modG',[true,{amplitude:1,frequency:1,phase:0}])
    })

    document.getElementById('grem').addEventListener('click',()=>{
        // PH - Got the data
        ipcRenderer.on('modGR',(e,x)=>{document.getElementById('something').innerHTML = x;})
        ipcRenderer.send('modG',[false,null])
    })
})