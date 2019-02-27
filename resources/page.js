const { ipcRenderer } = require('electron');
const math = require('mathjs');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery');

$('document').ready(() => {
    $(".dial").knob({
        'min': 0,
        'step': 1,
        'max': 1000,
        'width': 100,
        'height': 100,
        'fgColor': '#5264AE',

        'change': (v) => {
            $("#iF").val(math.round(v));
        }
    });
    $('#iF').on('input', (e) => {
        $(".dial").val(e.target.value).trigger('change');
    })
})


//ipcRenderer.send('setGWV',true);