const {ipcRenderer} = require('electron');
//ipcRenderer.send('setGWV',true);

document.getElementById('gs').addEventListener('click',()=>{
    ipcRenderer.send('setGWV',true);
})
document.getElementById('gh').addEventListener('click',()=>{
    ipcRenderer.send('setGWV',false);
})
