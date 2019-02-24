const {ipcRenderer} = require('electron');
const math = require('mathjs');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');

$('document').ready(()=>{
    $(".dial").knob({
        'min':0,
        'step':1,
        'max':1000,
        'width':100,
        'height':100,

        'change': (v)=>{
            document.getElementById('knobText').innerHTML = math.round(v);
        }
    });
})
//ipcRenderer.send('setGWV',true);