const {ipcRenderer,remote}= require('electron')
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery')
const plot = require('./plotly-latest');
// Math usage
//console.log(plot)

const math = require('mathjs')
// Allows sending and recieving information between pages and main thread


$(document).ready(function(){
    plot.plot( document.getElementById('tester'), [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );
    $(".titleBarClose").on('click',e=>{
        remote.getCurrentWindow().close()
    })
    $('.titleBarMinimize').on('click',e=>{
        remote.getCurrentWindow().minimize()
    })
    ipcRenderer.on('modGR',(e,args)=>{
        // PH - got the required data
        str=""
        console.log("YEET")
        args.forEach(element => {
            str= str + `${element[0].V}`
        });
        $('#gC').html(`${str}`)
        
    })
})
//Todo - Recieve graphing data array and plot