Coolog
======

Colourful logging in node.js


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


