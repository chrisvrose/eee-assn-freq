window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');
// Math usage

const math = require('mathjs')
// Allows sending and recieving information between pages and main thread

const {ipcRenderer}= require('electron')

$(document).ready(function(){
    ipcRenderer.on('modGR',(e,args)=>{
        // PH - got the required data
        document.getElementById('gC').innerHTML = args;
        console.log("GOTEM")
    })
})
//Todo - Recieve graphing data array and plot