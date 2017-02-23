/**
 *
 */

const onHeaders = require('on-headers')
const SERVER_TIMING_HEADER = 'Server-Timing'

module.exports = serverTiming

/**
 * Format
 */
function format(key, time, description) {
  if (description) {
    return key + ':' + time + ';' + '"' + description + '"'
  }
  return key + ':' + time
}

/**
 * Add server timing to response headers
 */
function addHeader(headers) {
  if (this.getHeader(SERVER_TIMING_HEADER)) {
    console.warn('Server timing header already exists, aborted')
    return
  }

  const headerString = headers.map(header => {
    return format(header.key, header.time, header.description)
  })

  this.setHeader(SERVER_TIMING_HEADER, headerString)
}

function serverTiming(options) {
  const headers = {}

  return function (req, res, next) {
    /**
     * Use process.hrtime() to get high-resolution real time
     * See https://nodejs.org/api/process.html#process_process_hrtime_time
     */
    function serverTimingStart(key, description) {
      headers[key] = ({
        key,
        description,
        startAt: process.hrtime()
      })
    }

    function serverTimingEnd(key) {
      const diff = process.hrtime(headers[key].startAt)
      const time = diff[0] + diff[1] * 1e-9
      headers[key].time = time
    }

    // Assign to res
    res.serverTimingStart = serverTimingStart
    res.serverTimingEnd = serverTimingEnd

    onHeaders(res, addHeader)
    next()
  }
}
