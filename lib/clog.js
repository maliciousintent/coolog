/*jshint node:true, indent:2, laxcomma:true, undef:true, unused:true */

/*
 * Clog - Colorful console output for your applications in NodeJS
 * https://github.com/plasticpanda/clog
 *
 * Edited by Simone Lusenti <simone@plasticpanda.com>
 * Based on work (c) 2012 Firejune <to@firejune.com>
 * 
 * Copyright (c) 2013 Simone Lusenti & Plastic Panda
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

var settings_file
  , settings;

var LEVELS = {
  'debug' : 1,
  'log'   : 2
, 'info'  : 3
, 'warn'  : 4
, 'error' : 5
, 'ok'    : 6
};


try {
  settings_file = require('fs').readFileSync('./coolog.json');
  settings = JSON.parse(settings_file);
} catch (e) {
  console.error('configuration file not found ', e);
}

function Coolog (filename, channel) {
  var that = this
    , channel_settings
    , appender
    , appender_name
    , appender_settings;
  
  // Check for channel settings
  channel_settings = settings.channels[channel];
  if (channel_settings === undefined) {
    console.error('Can\'t find channel named ' + channel);
    return;
  }
  
  appender_name = channel_settings.appender;
  appender_settings = (settings.appenders && settings.appenders[appender_name]) ? settings.appenders[appender_name] : {};

  //check if the appender is a built-in one
  try {
    appender = require('../built-in-appender/' + appender_name)(appender_settings);
  } catch (e) {}

  if (appender === undefined) {
    // maybe is a npm appender
    try {
      appender = require(appender_name)(appender_settings);
    } catch (e) {}
  }

  if (appender === undefined) {
    console.error('Cannot find appender named ' + appender_name);
    return;
  }


  Object.keys(LEVELS).forEach(function (level_name) {
    that[level_name] = (function _makeFn(level_name) {
      return function () {
        if (LEVELS[level_name] >= LEVELS[channel_settings.level]) {
          appender.log(level_name, channel, filename, Array.prototype.slice.call(arguments));
        }
      };
    })(level_name);
  });
}

var clogFactory = function (filename, channel) {
  channel = channel || 'root';
  return new Coolog(filename, channel);
};


module.exports.logger = clogFactory;