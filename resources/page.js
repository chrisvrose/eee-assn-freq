const {ipcRenderer} = require('electron');
const math = require('mathjs');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');

$('document').ready(()=>{
    $(".dial").knob({
        'step':1,

        'change': (v)=>{
            document.getElementById('knobText').innerHTML = math.round(v);
        }
    });
})
//ipcRenderer.send('setGWV',true);