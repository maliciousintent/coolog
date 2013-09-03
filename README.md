Coolog
======

Colourful logging in node.js

This version is a rework of the original library with two new main features:

*  Mechanism to create custom appenders (file, console, online services..) using NPM. There are some built-in appenders too
*  Filter message to log (based on the log level)



## Install ##

```bash
npm install coolog
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
coolog.logger(filename, channel);
```
This method create a new logger.

* filename is the name of the file (used in the log message)
* Channel is optional. If you don't specify this parameter coolog assign this logger to the default channel (root).
  

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

## KEYCHAIN ##
Coolog offer a keychan object to add some parameters for the appender that you don't want to put in the config file (eg: a log web service api key)
```js
var coolog = require('coolog');

coolog.keychan['appender-name'] = {
  'key': process.env.KEY
};  

```


## APPENDER LIST ##
[Logentries appender](https://github.com/bolismauro/coolog-logentries-appender)



## License ##

Copyright (c) 2013 PlasticPanda.com, Mauro Bolis <mauro@plasticpanda.com>, Simone Lusenti <simone@plasticpanda.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WIT
