const {ipcRenderer,remote}= require('electron')
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery')
// Math usage

const math = require('mathjs')
// Allows sending and recieving information between pages and main thread


$(document).ready(function(){
    $(".titleBarClose").on('click',e=>{
        remote.getCurrentWindow().close()
    })
    $('.titleBarMinimize').on('click',e=>{
        remote.getCurrentWindow().minimize()
    })
    ipcRenderer.on('modGR',(e,args)=>{
        // PH - got the required data
        $('#gC').html(args)
        
    })
})
//Todo - Recieve graphing data array and plot