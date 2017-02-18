/**
 *
 */

var onHeaders = require('on-headers')

var SERVER_TIMING_HEADER = 'Server-Timing'

module.exports = servertiming

/**
 * Format
 */
function format(key, value, description) {
  if (description) {
    return key + ':' + value + ';' + '"' + description + '"'
  }
  return key + ':' + value
}

/**
 * Add server timing header
 *
 */
function addHeader() {
  if (!this.getHeader(SERVER_TIMING_HEADER)) {
    this.setHeader(SERVER_TIMING_HEADER, 'abc')
  }
}

/**
 *
 */
function servertiming(options) {
  var items = []

  function timeingStart(key, description) {
    items.push({
      key: key,
      description: description,
      time: 0
    })
  }

  function timeingEnd(key) {
  }

  return function (req, res, next) {
    req.timingStart = timingStart
    req.timingEnd = timingEnd

    onHeaders(res, addHeader)
    next()
  }
}
