# express-server-timing [![Build Status](https://travis-ci.org/pd4d10/express-server-timing.svg?branch=master)](https://travis-ci.org/pd4d10/express-server-timing)[![npm](https://img.shields.io/npm/v/express-server-timing.svg)](https://www.npmjs.com/package/express-server-timing)[![License](https://img.shields.io/npm/l/express-server-timing.svg)](https://www.npmjs.com/package/express-server-timing)

Server Timing middleware for Express

## Installation

```sh
npm install --save express-server-timing
```

## Usage

```js
const serverTiming = require('express-server-timing')
const app = express()
app.use(serverTiming())

// Then you have `res.serverTimingStart` and `res.serverTimingEnd` method
res.serverTimingStart('key', 'description')
// Do something, like database query
res.serverTimingEnd('key')
```

For more information, see https://www.w3.org/TR/server-timing/

## License

MIT
