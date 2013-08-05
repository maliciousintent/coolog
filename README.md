Coolog
======

Colourful logging in node.js

This version is a rework of the original library with two new main features:

*  Mechanism to create custom appenders (file, console, online services..) using NPM. There are some built-in appenders too
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
coolog.logger(filename, params);
```
This method create a new logger.

* filename is the name of the file (used in the log message)
* params is optional. You can provide the name of the channel (channelname) and additional settings for the appender (eg: a secret key which you don't want to put in the settings file). If you
  don't specify this parameter coolog assign this logger to the default channel (root).
  

## CUSTOM APPENDERS ##
Developers can create custom appenders.

In coolog an appender is just a module that exports a function

```js
module.exports = function (settings) {
  
}
```

```settings``` is a variable which contains the options specified by the user in the coolog.json file.

The function should export an object with a ```log``` method. 

The method should has this sign
```js
function (level_name, channel_name, filename, args)
```

* level_name is the level of the message (debug, log, info, warn, error, ok)
* channel_name is the name of the channel
* filename is the name of the file in which the function has been invoked
* args is the array of the arguments passed by the user

## APPENDER LIST ##
[Logentries appender](https://github.com/bolismauro/coolog-logentries-appender)

