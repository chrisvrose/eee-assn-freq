const {ipcRenderer} = require('electron');
//ipcRenderer.send('setGWV',true);
// Wrap them in an onload so that they tag on when everything is ready
window.addEventListener('load',()=>{
    document.getElementById('gs').addEventListener('click',()=>{
        ipcRenderer.send('setGWV',true);
    })

    document.getElementById('gh').addEventListener('click',()=>{
        ipcRenderer.send('setGWV',false);
    })

    document.getElementById('gsin').addEventListener('click',()=>{
        ipcRenderer.on('modGR',(e,x)=>{document.getElementById('something').innerHTML = x;})
        ipcRenderer.send('modG',[true,'sin(x)'])
    })

    document.getElementById('grem').addEventListener('click',()=>{
        ipcRenderer.on('modGR',(e,x)=>{document.getElementById('something').innerHTML = x;})
        ipcRenderer.send('modG',[false])
    })
})