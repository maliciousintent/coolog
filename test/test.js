/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';

/*
 * Coolog - Colorful console output for your applications in NodeJS
 * https://github.com/plasticpanda/coolog
 *
 * Simone Lusenti <simone@plasticpanda.com>, Mauro Bolis <mauro@plasticpanda.com>
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



var coolog = require('../index.js');

coolog.keychain['coolog-appender-logentries'] = {
  'key': process.env.LOGENTRIES_KEY
};

var root_logger = coolog.logger('main.js') // root by default
  , db_logger = coolog.logger('main.js', 'database')
  , logentries_logger = coolog.logger('test.js', 'logentries')
  ;

var string_variable = 'world'
  , obj_variable
  , nested_obj_variable
  , arr_variable
  ;

obj_variable = {
  'one': 1,
  'two': 2
};

arr_variable = [1, 2, 3, 4];

nested_obj_variable = {
  'one': obj_variable,
  'array': arr_variable
};
  
root_logger.debug('Hello ', string_variable);
root_logger.log('Hello ', string_variable);
root_logger.info('Hello ', string_variable);
root_logger.warn('Hello ', string_variable);
root_logger.error('Hello ', string_variable);
root_logger.ok('Hello ', string_variable);



db_logger.debug('Don\'t print this..min level is warn!');
db_logger.log('Don\'t print this..min level is warn!');
db_logger.info('Don\'t print this..min level is warn!');
db_logger.warn('Hello ', string_variable);
db_logger.error('Hello ', string_variable);
db_logger.ok('Hello ', string_variable);

// complex messages 
root_logger.debug('Hi, i\'m an object ', obj_variable);
root_logger.debug('Hi, i\'m an array ', arr_variable);
root_logger.debug('Hi, i\'m a nested object ', nested_obj_variable);

db_logger.ok('Hi, i\'m an object ', obj_variable);
db_logger.ok('Hi, i\'m an array ', arr_variable);
db_logger.ok('Hi, i\'m a nested object ', nested_obj_variable);


// multi-line messages
root_logger.debug('I\'m a \nmultiline \nmessage\nwith an object', nested_obj_variable, '\n(a nested one!)');

// try an external appender
logentries_logger.ok('Hi, i\'m a nested object ', nested_obj_variable);