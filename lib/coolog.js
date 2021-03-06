/*jshint node:true, indent:2, laxcomma:true, undef:true, unused:true */
'use strict';
/*
 * Coolog - Colorful console output for your applications in NodeJS
 * https://github.com/plasticpanda/coolog
 *
 * Edited by Simone Lusenti <simone@plasticpanda.com>, Mauro Bolis <mauro@plasticpanda.com>
 * Based on work (c) 2012 Firejune <to@firejune.com>
 * 
 * Copyright (c) 2013 Simone Lusenti, Mauro Bolis & Plastic Panda
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


require('colors');

var channels = {}
  ;

var LEVELS = {
  debug: 1,
  log: 2
, info: 3
, warn: 4
, error: 5
, ok: 6
};

function Coolog (filename, channel) {
  var that = this
    , channel_settings
    , appenders = []
    ;
  
  // Check for channel settings
  channel_settings = channels[channel];
  if (channel_settings === undefined) {
    throw new Error('Can\'t find channel named ' + channel);
  }
  
  channel_settings.appenders.forEach(function (appender_name) {
    var appender
      ;
    
    //check if the appender is a built-in one
    if (appender_name === 'console') {
      appender = require('../builtinappender/console');
    } else {
      // loaded using require/npm
      appender = appender_name;
    }

    if (appender === undefined) {
      throw new Error('Cannot find appender named ' + appender_name);
    } else {
      appenders.push(appender);
    }
  });


  Object.keys(LEVELS).forEach(function (level_name) {
    that[level_name] = (function _makeFn(level_name) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        if (LEVELS[level_name] >= LEVELS[channel_settings.level]) {
          appenders.forEach(function (appender) {
            appender.log(level_name, channel, filename, args);
          });
        }
      };
    })(level_name);
  });
}

var clogFactory = function (filename, channel) {
  channel = channel || 'root';
  return new Coolog(filename, channel);
};

var addChannel = function(settings) {
  channels[settings.name] = settings;
};


module.exports =  {
  'logger': clogFactory,
  'addChannel': addChannel
};
