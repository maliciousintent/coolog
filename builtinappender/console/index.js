/*jshint node:true, indent:2, laxcomma:true, undef:true, unused:true, eqnull:true */
'use strict';

var inspect = require('seye.js').inspector({ stream: null })
  , chalk = require('chalk')
  , cluster = require('cluster')
  ;

var COLOR_MAP = {
  log: 'white'
, error: 'red'
, warn: 'yellow'
, info: 'cyan'
, ok: 'green'
, debug: 'grey'
};

// always enable chalk's colors
chalk.enabled = true;

module.exports = {
  log: makeLogger()
};


function makeLogger() {
  var _getLine
    , _log_helper
    , _generate_color
    ;

  _generate_color = function (str) {
    var hash = 0
      , c
      , key;

    if (str.length === 0) {
      return hash;
    }
    
    for (var i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      hash = hash + c;
    }
    
    key = Object.keys(COLOR_MAP)[hash % (Object.keys(COLOR_MAP).length - 1)];
    return COLOR_MAP[key];
  };

  _getLine = function () {
    var e = new Error();
    var line = e.stack.split('\n')[6].split(':')[1];
    return line;
  }; 

  _log_helper = function (options, msg) {
    var level_name = options.level_name
      , channel_name = options.channel_name
      , filename = options.filename
      , color = options.color
      , line = options.line
      ;
    
    var channel_name_color = _generate_color(channel_name)
      , level_name_str;

    if (msg.indexOf('\n') > -1) {
      // If string is multiline call _log for each string
      msg.split('\n').forEach(function (row) {
        _log_helper(options, row);
      });
      
    } else {
      level_name_str = level_name;
      
      if (level_name_str.length < 5) {
        for (var i = 5 - level_name_str.length; i > 0; i--) {
          level_name_str = ' ' + level_name_str;
        }
      }
      
      console.log.apply(console, [
          chalk.bold.grey('[') + chalk[channel_name_color](channel_name + ', ') + chalk.blue(filename + ':' + line) + chalk.bold.grey(']')
        , chalk.cyan((cluster.isWorker) ? '#' + cluster.worker.id : 'mm')
        , chalk[color](level_name_str + ':')
        , msg 
        ].concat('')
      );
    }
  };


  function _logFn(level_name, channel_name, filename, args) {
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

    _log_helper({
      level_name: level_name
    , channel_name: channel_name
    , filename: filename
    , color: color
    , line: line
    }, msg);

  }

  return _logFn;
}
