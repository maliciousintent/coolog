[![Code Climate](https://codeclimate.com/github/plasticpanda/coolog.png)](https://codeclimate.com/github/plasticpanda/coolog)

coolog
======

Colorful logging for node.js.


## Install

[![NPM](https://nodei.co/npm/coolog.png?compact=true)](https://nodei.co/npm/coolog/)


## Features



*  Mechanism to create custom appenders (file, console, online services..) using NPM. There are some built-in appenders too
*  Filter message to log (based on the log level)



## Use ##

```js
var coolog = require('coolog');

coolog.addChannel({ 
  name: 'root',
  level: 'debug', 
  appenders: [ 'console' ] 
});

var logger = coolog.logger('main.js', 'root');

logger.log('Message or obj', ...);
logger.error('Message or obj', ...);
logger.warn('Message or obj', ...);
logger.info('Message or obj', ...);
logger.debug('Message or obj', ...);
logger.ok('Message or obj', ...);
```



## API ##

#### Add a new channel

```
coolog.addChannel(options);
```

Adds a new channel to coolog.  
Since in nodejs the modules ```require```d are cached, channels are global and available in every file so it's better do define all channels in a single place, e.g. in your app's entry point.

**Options**
* ```name``` name for this channel. A ```root``` channel should be always defined. This name must be passed to the .logger(...) method to create the logger instance.
* ```level``` minimum log level for this channel. Messages with lower severity will not be passed to any appender.
* ```appenders[]``` list of appenders to pass messages to. Built-in appenders (currently only ```console``` must be referenced by name. For NPM-installed or custom appenders a reference / function must be provided.


#### Get a logger

```
coolog.logger(filename, channel);
```

This method create a new logger for the specified ```channel```.

* A string to prepend to all log messages, typically you want to set this to the current file's name, it will be suffixed with the number of the line printing that message.
* The channel to log to. Must be added before with ```coolog.addChannel(...)```. Default is ```'root'```.



## Examples ##

See ```examples/``` for more examples or **contribute**.



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
[Logentries appender](https://github.com/plasticpanda/coolog-logentries-appender)



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
