/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';

var util = require('util')
  , fs = require('fs');

module.exports = function (settings) {
  var log
    , _getLine
    , _log_helper
    , file_stream
    ;

  if (settings.output_file === undefined) {
    console.error("you must specify an output file in coolog.json");
    return;
  }

  file_stream = fs.createWriteStream(settings.output_file);

  _getLine = function () {
    var e = new Error();
    var line = e.stack.split('\n')[4].split(':')[1];
    return line;
  }; 

  _log_helper = function (level_name, channel_name, filename, line, msg) {
    
    if (msg.indexOf('\n') > -1) {
      // If string is multiline call _log for each string
      msg.split('\n').forEach(function (row) {
        _log_helper(level_name, channel_name, line, row);
      });
      
    } else {
      file_stream.write('[' + channel_name + ', ' + filename + ':' + line + '] ' + level_name + ' : ' + msg + '\n');
    }
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

    _log_helper(level_name, channel_name, filename, line, msg);

  };

  return {
    'log': log
  };
};