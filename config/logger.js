/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var winston = require('winston');
winston.emitErrs = true;

// paths of logging files
var infofile = path.join(__dirname,'..','logs','infologs.log');
var debugfile = path.join(__dirname,'..','logs','debuglogs.log');
var errorfile = path.join(__dirname,'..','logs','errorltogs.log');

//
// Remove the file, ignoring any errors
//
try { fs.unlinkSync(infofile); fs.unlinkSync(debugfile); fs.unlinkSync(errorfile);}
catch (ex) { }

var logger  = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            level: 'info',
            name: 'info-file',
            filename: infofile,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.File)({
            level: 'debug',
            name: 'debug-file',
            filename: debugfile,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.File)({
            level: 'error',
            name: 'error-file',
            filename: debugfile,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.Console)({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;