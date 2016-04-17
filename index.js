
// Bug: console.log is not possible from modules unless
// it's available globally.
global.console = console;

console.log(Backbone.$);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
})

var _fs = require('fs');
var _child = require('child_process');

var placeholderImage = "img/img_placeholder.png";

// Extend application menu for Mac OS
if (process.platform == "darwin") {
    var mb = new nw.Menu({type:"menubar"});
    mb.createMacBuiltin("Zoeker");

    nw.Window.get().menu = mb;
}

