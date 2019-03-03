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
$(document).ready(()=>{ 
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var i;
for(i=0; i<360; i+= 20){
 ctx.moveTo(i+5,180);
    ctx.lineTo(i,180);

}
ctx.stroke();

var counter = 0, x=0,y=180;


//100 iterations
var increase = 90/180*Math.PI / 9;
for(i=0; i<=360; i+=10){
    
     ctx.moveTo(x,y);
    x = i;
    y =  180 - Math.sin(counter) * 120;
counter += increase;
     
    ctx.lineTo(x,y);
    ctx.stroke();
    //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;

}
})