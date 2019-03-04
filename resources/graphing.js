const {ipcRenderer,remote}= require('electron')
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery')
const plot = require('./plotly-latest');

let num_cycles_to_plot = 25
const plot_config={responsive:true,displaylogo: false}
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
    $('#iNC').on('input',e=>{
        num_cycles_to_plot = $('#iNC').val();
    })
    plot.plot( document.getElementById('plot-container'),{margin: { t: 0 },dragmode: "pan"},plot_config)
    ipcRenderer.on('modGR',(e,args)=>{
        // PH - got the required data
        let exps = []
        let intervals = []
        let traces = []
        let maxF = 0
        let maxV = 0
        const prettyVals=[
            math.round(args[args.length-1][0].V,4),
            math.round(args[args.length-1][1].i,4),
            math.round(args[args.length-1][1].phi,4),
            math.round(2*Math.PI*args[args.length-1][0].F,4),
            math.round(args[args.length-1][0].V*Math.SQRT2,4),
            math.round(args[args.length-1][1].i*Math.SQRT2,4),
        ]
        const prettyToolTips=[
            `v = ${prettyVals[4]} * sin(${prettyVals[3]} * t + ${prettyVals[2]})`,
            `i = ${prettyVals[5]} * sin(${prettyVals[3]} * t)`
        ]
        $('#ordered-plots').append(`<li id='plot-list-item'><span title="${prettyToolTips[0]}">V<sub>rms</sub> = ${prettyVals[0]} V</span>,<br /><span title="${prettyToolTips[1]}">I<sub>rms</sub> = ${prettyVals[1]} A</span>,<br /> &#981; = ${prettyVals[2]} rad</li>`);
        args.forEach(element => {
            if(element[0].F > maxF) maxF = element[0].F
            if(element[0].V > maxV) maxV = element[0].V
            exps.push([
                math.compile(`${element[0].V*Math.SQRT2} * sin( 2*${Math.PI}*${element[0].F}*x + ${element[1].phi})`),
                math.compile(`${element[1].i*Math.SQRT2} * sin( 2*${Math.PI}*${element[0].F}*x)`)
            ])
            intervals.push( 0.1/(2*Math.PI*element[0].F) )
            
        });
        //console.log(exps);
        exps.forEach((element,index)=>{
            let maxRange = num_cycles_to_plot/maxF;
            let xV = math.range(-maxRange, maxRange, intervals[index]).toArray()
            let yV = xV.map(x=>{ return element[0].eval({x: x}) })

            let xI = math.range(-maxRange, maxRange, intervals[index]).toArray()
            let yI = xI.map(x=>{ return element[1].eval({x: x}) })

            traces.push({ x:xV,y: yV ,name:`v${index+1}`})
            traces.push({ x:xI,y: yI ,name:`i${index+1}`})
        })
        const options ={
            margin: { t: 0 },
            dragmode: "pan",
            xaxis:{
                title:{
                    text:"Time (t)"
                },
                range:[0,1/(maxF)]
            },
            yaxis:{
                title:{
                    text:"Voltage(V) Current(A)"
                },
                range:[-maxV*Math.SQRT2,maxV*Math.SQRT2*1.1]
            }
        }
        plot.newPlot( document.getElementById('plot-container'), traces, options , plot_config);
        
    })
})
//Todo - Recieve graphing data array and plot