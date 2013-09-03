/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';

var util = require('util')
  , fs = require('fs');

module.exports = function (settings) {
  var log
    , _getLine
    , file_stream
    ;

  if (settings.output_file === undefined) {
    console.error("you must specify an output file in coolog.json");
    return;
  }

  file_stream = fs.createWriteStream(settings.output_file);

  _getLine = function () {
    var e = new Error();
    var line = e.stack.split('\n')[6].split(':')[1];
    return line;
  }; 

  log = function (level_name, channel_name, filename, args) {
    var msg = ''
      , line = _getLine()
      ;

    args.forEach(function (item) {
      if ('string' !== typeof item) {
        msg = msg + util.inspect(item);
      } else {
        msg = msg + item;
      }
    });

    file_stream.write([channel_name, filename + ':' + line, level_name, msg].join('\t') + '\n');

  };

  return {
    'log': log
  };
};