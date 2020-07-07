// main.js

var path = require('path');
var fs = require('fs');
var JavaScriptObfuscator = require('javascript-obfuscator');

function onBeforeBuildFinish (options, callback) {

    var mainBundle = options.bundles.find(function(bundle) {return bundle.name === 'main';}); // Thanks to balazsnemeth for 2.4.0 compatibility
    var mainJsPath = path.join(mainBundle.dest, '/index.js'); 
    var script = fs.readFileSync(mainJsPath, 'utf8');     // read 
    
	// Obfuscate
	var ob_res = JavaScriptObfuscator.obfuscate(script,
		{
			compact: true,
			controlFlowFlattening: true
		}
	);

    fs.writeFileSync(mainJsPath, ob_res);        // save
	Editor.log("Game Dev Garage Obfuscator: /src/project.js obfuscated!");
    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('before-change-files', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
    }
};