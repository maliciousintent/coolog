/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';

var inspect = require('seye.js').inspector({ stream: null })
  , chalk = require('chalk')
  , cluster = require('cluster')
  ;

var COLOR_MAP = {
  'log'   : 'white'
, 'error' : 'red'
, 'warn'  : 'yellow'
, 'info'  : 'cyan'
, 'ok'    : 'green'
, 'debug' : 'grey'
};

// always enable chalk
chalk.enabled = true;

// we can receive a param 
module.exports = function () {
  var log
    , _getLine
    , _log_helper
    , _generate_color;

  _generate_color = function (str) {
    var hash = 0
      , c
      , key;

    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      hash = ((hash<<5) - hash) + c;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    key = Object.keys(COLOR_MAP)[hash % Object.keys(COLOR_MAP).length];
    return COLOR_MAP[key];
  };

  _getLine = function () {
    var e = new Error();
    var line = e.stack.split('\n')[6].split(':')[1];
    return line;
  }; 

  _log_helper = function (level_name, channel_name, filename, color, line, msg) {
    var channel_name_color = _generate_color(channel_name);

    if (msg.indexOf('\n') > -1) {
      // If string is multiline call _log for each string
      msg.split('\n').forEach(function (row) {
        _log_helper(level_name, channel_name, filename, color, line, row);
      });
      
    } else {  
      console.log.apply(console, [
          chalk.bold.grey('[') + chalk[channel_name_color](channel_name + ', ') + chalk.blue(filename + ':' + line) + chalk.bold.grey(']')
        , chalk.cyan((cluster.isWorker) ? '#' + cluster.worker.id : 'mm')
        , chalk[color](level_name + ':')
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
        msg = msg + inspect(item) + ' ';
      } else {
        msg = msg + item + ' ';
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
