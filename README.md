Coolog
======

Colourful logging in node.js

This version is a rework of the original library with two new main features:

*  Mechanism to create custom appenders (file, console, online services..)
*  Filter message to log (based on the log level)



## Install ##

```bash
Not yet :)
```


## Use ##

```js
var coolog = require('coolog')
  , logger = coolog.logger('main.js', 'root');
  
  
logger.log('Message or obj', ...);
logger.error('Message or obj', ...);
logger.warn('Message or obj', ...);
logger.info('Message or obj', ...);
logger.debug('Message or obj', ...);
logger.ok('Message or obj', ...);
```


## Settings ##
Coolog need a settings file named coolog.json in the root directory.
This file defines the channels and the appenders settings.
This file must contains at least the root channel options.
See test/coolog.json file for more info.


## API ##
```
coolog.logger(filename, channelname);
```
This method create a new logger.
You can omit the channelname parameter, coolog assign this logger to the root channel by default.
Note that the channel must be defined in the settings file.

