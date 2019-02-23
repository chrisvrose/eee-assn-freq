// Math usage
const math = require('mathjs')
// Allows sending and recieving information between pages and main thread
const {ipcRenderer}= require('electron')

window.addEventListener('load',()=>{
    ipcRenderer.on('modGR',(e,args)=>{
        // PH - got the required data
        document.getElementById('gC').innerHTML = args;
    })
})
//Todo - Recieve graphing data array and plot