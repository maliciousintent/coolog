/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';

var util = require('util');

var COLOR_MAP = {
  'log'   : 'white'
, 'error' : 'red'
, 'warn'  : 'yellow'
, 'info'  : 'cyan'
, 'ok'    : 'green'
, 'debug' : 'grey'
};


// we can receive a param 
module.exports = function () {
  var log
    , _getLine
    , _log_helper;

  _getLine = function () {
    var e = new Error();
    var line = e.stack.split('\n')[4].split(':')[1];
    return line;
  }; 

  _log_helper = function (level_name, channel_name, filename, color, line, msg) {
    
    if (msg.indexOf('\n') > -1) {
      // If string is multiline call _log for each string
      msg.split('\n').forEach(function (row) {
        _log_helper(level_name, channel_name, filename, color, line, row);
      });
      
    } else {
      
      console.log.apply(console, [
          '['.grey.bold + channel_name.grey + ', '.grey + filename.grey + ':'.grey + line.grey + ']'.grey.bold
        , (level_name + ':')[color].bold
        , msg
        ].concat('')
      );
    }
  };

  log = function (level_name, channel_name, filename, args) {
    var msg = ''
      , color
      , line = _getLine()
      ;

    args.forEach(function (item) {
      if ('string' !== typeof item) {
        msg = msg + util.inspect(item);
      } else {
        msg = msg + item;
      }
    });

    if (COLOR_MAP[level_name] === undefined) {
      throw new TypeError('Level ' + level_name + ' is not defined (or non-existent color).');
    } else {
      color = COLOR_MAP[level_name];
    }    

    _log_helper(level_name, channel_name, filename, color, line, msg);

  };

  return {
    'log': log
  };
};