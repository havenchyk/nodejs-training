'use strict';

const fs = require('fs')
    , args = process.argv
	, spawn = require('child_process').spawn;

const filename = args[2]
	, method = args[3];

fs.watch(filename, function() {
	console.log('file with name : ' + filename + ' has been changed');

	makeChildProcess(method, filename);	
});

function makeChildProcess(method, filename) {
	console.log('Filename: ' + filename + ', method: ' + method);
	
	if (method === 'copy') {
		let now = new Date()
		  , newFilename = filename.slice(0, filename.lastIndexOf('.')) + '_'  + new Date().toISOString() + filename.slice(filename.lastIndexOf('.'));

		spawn('cp', [filename, newFilename]);	
	} else if (method === 'del') {
		spawn('rm', [filename]);
	}
}

console.log('start listening changes for ' + filename);