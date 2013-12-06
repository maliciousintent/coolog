[![NPM version](https://badge.fury.io/js/coolog.png)](http://badge.fury.io/js/coolog) [![Code Climate](https://codeclimate.com/github/plasticpanda/coolog.png)](https://codeclimate.com/github/plasticpanda/coolog)

coolog
======

Colorful logging for node.js.

![Screenshot](https://raw.github.com/plasticpanda/coolog/master/examples/simple.png)

## Features

*  Mechanism to create custom appenders (file, console, online services..) using NPM. There are some built-in appenders too
*  Filter message to log (based on the log level)



## Install

[![NPM](https://nodei.co/npm/coolog.png?compact=true)](https://nodei.co/npm/coolog/)



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

See ```examples/``` for more examples.


## API ##

#### Add a new channel

```
coolog.addChannel(options);
```

Adds a new channel to coolog.  
Since [```require```d modules are cached](http://nodejs.org/docs/latest/api/modules.html#modules_caching), channels are global and available in every file. It's better to define all channels in a single place, e.g. in your app's entry point.

**Options**
* ```name``` name for this channel. A ```root``` channel should be always defined. This name must be passed to the ```coolog.logger(...)``` method to create the logger instance.
* ```level``` minimum log level for this channel. Messages with lower severity will not be passed to any appender.
* ```appenders[]``` list of appenders to pass messages to. Built-in appenders must be referenced by name whereas, npm-minstalled or custom appenders a reference / function must be provided.


#### Get a logger

```
coolog.logger(filename[, channel]);
```

This method create a new logger for the specified ```channel```.

* A string to prepend to all log messages, typically you want to set this to the current file's name (it will be suffixed with the number of the line printing that message).
* The channel to log to. It must have been be added earlier with ```coolog.addChannel(...)```. Default is ```'root'```.


## Contribute

### Custom appenders

Any module which exports a ```log``` function with the following signature can be used as a **coolog appender**:

```javascript
var myLoggingFn = function (level_name, channel_name, filename, args) {
  var myArgs = args.map(function (item) {
    if ('string' !== typeof item) {
      return util.inspect(item);
    } else {
      return item;
    }
  });
  
  myArgs = myArgs.join(' ');
  
  _send_to_my_logging_service(level_name, channel_name, filename, myArgs);
  
  if (level_name === 'error') {
    _alert_someone(channel_name, filename, myArgs);
  }
};


module.exports = {
  log: myLoggingFn
};


```

* ```level_name``` is the level of the message, one of: ```debug```, ```log```, ```info```, ```warn```, ```error```, ```ok```.
* ```channel_name``` is the name of the channel which is sending this message.
* ```filename``` is the name of the file at which the logging function has been invoked.
* ```args``` is an array containing the arguments passed by the user.




## Available appenders
* [![NPM](https://nodei.co/npm/coolog-appender-logentries.png?mini=true)](https://nodei.co/npm/coolog-appender-logentries/)



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
