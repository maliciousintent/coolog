/*jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false */
'use strict';


var coolog = require('../index.js');

var root_logger = coolog.logger('main.js') // root by default
  , db_logger = coolog.logger('main.js', 'database')
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