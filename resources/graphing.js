const {ipcRenderer,remote}= require('electron')
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery')
const plot = require('./plotly-latest');
// Math usage
//console.log(plot)

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
        let exps = []
        let intervals = []
        let traces = []
        let maxF = 0
        let maxV = 0
        //console.log("YEET")
        args.forEach(element => {
            if(element[0].F > maxF) maxF = element[0].F
            if(element[0].V > maxV) maxV = element[0].V
            exps.push([
                math.compile(`${element[0].V} * sin( 2*${Math.PI}*${element[0].F}*x + ${element[1].phi})`),
                math.compile(`${element[1].i} * sin( 2*${Math.PI}*${element[0].F}*x)`)
            ])
            intervals.push( 0.1/(2*Math.PI*element[0].F) )
            //$('#gC').html($('#gC').html()+` ${element[0].V} *sin( 2&pi;x+ ${element[1].phi} ) , ${1/(2*Math.PI*element[0].F)}`)
        });
        //console.log(exps);
        exps.forEach((element,index)=>{
    
            let xV = math.range(-50, 50, intervals[index]).toArray()
            let yV = xV.map(x=>{ return element[0].eval({x: x}) })

            let xI = math.range(-50, 50, intervals[index]).toArray()
            let yI = xI.map(x=>{ return element[1].eval({x: x}) })

            traces.push({ x:xV,y: yV ,name:`V${index+1}`})
            traces.push({ x:xI,y: yI ,name:`I${index+1}`})
        })
        const options ={
            margin: { t: 0 },
            dragmode: "pan",
            xaxis:{
                range:[0,1/(maxF)]
            },
            yaxis:{
                range:[-maxV*1.1,maxV*1.1]
            }
        }
        plot.newPlot( document.getElementById('plot-container'), traces, options , {responsive:true});
        
    })
})
//Todo - Recieve graphing data array and plot