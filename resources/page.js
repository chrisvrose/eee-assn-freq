const { ipcRenderer } = require('electron');
const math = require('mathjs');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');

let currentState = { V: 230, F: 100, R: 100, L: .001, C: 0.000001 }

$('document').ready(() => {
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




    $('#iV').val(230);
    $('#iR').val(48400);
    $('#iL').val(0.001);
    $('#iC').val(.000005);
    $('#iF').val(50);

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


function calculateResults(cState){
    
    return null;
}




//ipcRenderer.send('setGWV',true);