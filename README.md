[![Build Status](https://travis-ci.org/unscrambl/json-long.svg?branch=master)](https://travis-ci.org/unscrambl/json-long)

# json-long

JSON.parse/stringify with long support. Based on Douglas Crockford [JSON.js](https://github.com/douglascrockford/JSON-js) package and [long.js](https://github.com/dcodeIO/long.js) library.

Example:

```js
var JSONLong = require('json-long');

var json = '{ "value" : 9223372036854775807, "v2": 123 }';
console.log('Input:%s\n', json);
var parsedValue = JSONLong.parse(json);
console.log('Parsed long value: ', parsedValue.value.toString());
console.log('Value after performing stringify operation on JS object:', JSONLong.stringify(parsedValue));
```

Output:

```
Input: { "value" : 9223372036854775807, "v2": 123 }
Parsed long value:   9223372036854775807
Value after performing stringify operation on JS object: {"value":9223372036854775807,"v2":123}
```

## LICENSE
[Apache 2.0](https://github.com/unscrambl/browser-driver-installer/blob/master/LICENSE)
