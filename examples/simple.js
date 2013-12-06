/*jshint node:true, indent:2, laxcomma:true, undef:true, unused:true */
'use strict';

var coolog = require('../index.js');

// (default) root appender
coolog.addChannel({ name: 'root', level: 'debug', appenders: [ 'console' ] });

// database appender which logs only seveirty >warn
coolog.addChannel({ name: 'database', level: 'warn', appenders: [ 'console' ] });


var root_logger = coolog.logger('main.js')
  , db_logger = coolog.logger('main.js', 'database')
  ;


var string_variable = 'debug'
  , obj_variable = { one: 1, two: 'two', three: new Date(), four: true }
  , arr_variable = [1, 2, 3, 4, 'end', null]
  , nested_obj_variable  = { foo: obj_variable, bar: arr_variable, exp: /(\w+)/ }
  ;


// Logging with the root logger

root_logger.debug('This is a', string_variable, 'message, current timestamp is', new Date().valueOf());
root_logger.log('Log message blah blah blah');
root_logger.info('May want to see tis in production', obj_variable, 'oh, and this', Math.random());
root_logger.warn('User input is not valid, we have responded with an error message.');
root_logger.error('Redis connection failed. The application will crash!');
root_logger.ok('Server listening on port', 3000);


// Logging with the database logger

db_logger.debug('This is not logged...');
db_logger.log('neither this,');
db_logger.info('nor this.');
db_logger.warn('You should see me!');
db_logger.error('OMG the database does not exist!');


// More Complex messages 

root_logger.log('Hi, I\'m an array ', arr_variable);
root_logger.log('Hi, I\'m an object ', nested_obj_variable);


// Multi-line messages

root_logger.log('Multi-line messages\nare correctly\naligned and', '\n', 'formatted.');
