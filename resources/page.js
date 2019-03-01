const { ipcRenderer,remote } = require('electron');
const math = require('mathjs');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');

let currentState = { V: 230, F: 100, R: 100, L: .15, C: 0.0001 }
let resultStates = {X: NaN, Z: NaN,i:NaN,P:NaN,Q:NaN,S:NaN,phi:NaN,cphi:NaN}


$('document').ready(() => {
    $(".titleBarClose").on('click',e=>{
        remote.getCurrentWindow().close()
    })
    $('.titleBarMinimize').on('click',e=>{
        remote.getCurrentWindow().minimize()
    })
    $(".dial").knob({
        'min': 0,
        'step': 1, 
        'max': 1000,
        'width': 100,
        'height': 100,
        'fgColor': '#5264AE',

        'change': (v) => {
            $("#iF").val(math.round(v)).trigger('input',false);
        }
    });
    $('#iF').on('input', (e,b=true) => {
        $(".dial").val(e.target.value);
        if(b){
            $(".dial").trigger('change')
        }
        $('#cF').html(e.target.value)
        updateCurrentSet(parseFloat(e.target.value),5)
    })

    $('#iV').on('input',(e)=>{
        $('#cV').html(`${e.target.value}`);
        updateCurrentSet(parseFloat(e.target.value),4)
    })
    $('#iR').on('input',(e)=>{
        $('#cR').html(`${e.target.value}`)
        updateCurrentSet(parseFloat(e.target.value),1)
    })
    $('#iL').on('input',(e)=>{
        $('#cL').html(`${e.target.value}`)
        updateCurrentSet(parseFloat(e.target.value),2)
    })
    $('#iC').on('input',(e)=>{
        $('#cC').html(`${e.target.value}`)
        updateCurrentSet(parseFloat(e.target.value),3)
    })
    $('#addGS').on('click',e=>{
        ipcRenderer.send('modG',[true,[currentState,resultStates] ])
    })
    $('#clearGS').on('click',e=>{
        ipcRenderer.send('modG',[false,null])
    })

    $('#iV').val(currentState.V);
    $('#iR').val(currentState.R);
    $('#iL').val(currentState.L);
    $('#iC').val(currentState.C);
    $('#iF').val(currentState.F);

    //$().on
    ['#iV','#iR','#iL','#iC','iF'].forEach(element => {
        $(element).trigger('input')
    });
})


//1R 2L 3C 4V 5F
function updateCurrentSet(valueObject, val = 1) {
    switch (val) {
        case 1:
            currentState.R = valueObject
            break
        case 2:
            currentState.L = valueObject
            break
        case 3:
            currentState.C = valueObject
            break;
        case 4:
            currentState.V = valueObject
            break;
        case 5:
            currentState.F = valueObject
            break;
        default:
            return null
    }
    calculateResults(currentState)
    return valueObject;
}

function setResults(rState){
    [ ["#oX",rState.X],['#oZ',rState.Z],['#oPhi',180*rState.phi/Math.PI],['#ocPhi',rState.cphi],["#cI",rState.i],["#oP",rState.P],["#oQ",rState.Q],["#oS",rState.S] ].forEach(element=>{
        $(element[0]).html(math.round(element[1],2))
    })
    return null;
}

function calculateResults(cState){
    resultStates.X = 2*Math.PI*cState.F*cState.L - (1/(2*Math.PI*cState.F*cState.C))
    console.log(resultStates.X)
    resultStates.Z = Math.sqrt(resultStates.X * resultStates.X + cState.R*cState.R)
    resultStates.phi = Math.atan2(resultStates.X, currentState.R)
    resultStates.i = currentState.V/resultStates.Z;
    resultStates.P = currentState.V*resultStates.i*(resultStates.cphi = Math.cos(resultStates.phi))
    resultStates.Q = currentState.V*resultStates.i*Math.sin(resultStates.phi)
    resultStates.S = currentState.V*resultStates.i
    //resultStates.P = currentState.V * currentState.V / (resultStates.Z * resultStates.Z) * currentState.R;
    console.log("UPDATE",cState)
    setResults(resultStates)
    return null;
}




//ipcRenderer.send('setGWV',true);