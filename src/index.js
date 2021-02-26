'use strict'

const path = require('path')
const debug = require('debug')(path.basename(__filename))
const {fulfillment} = require('./handler');

/* eslint-disable async/missing-await-in-async-fn */
exports.handler = async (event, context, callback) => {
  if (debug.enabled) {
    debug('got event ' + JSON.stringify(event, null, 2))
  }

  const results = await fulfillment(event, context, callback);
  if (debug.enabled) {
    debug('returning ' + results)
  }
  return results
}
/* eslint-enable */

if (require.main === module) {
  if (process.argv.length !== 3) {
    console.error('USAGE: node src/index.js <test-file>')
    process.exit(-1)
  }
  const testData = require(process.argv[2])
  exports
    .handler(testData)
    .then((res) => {
      console.log('returned ', res)
    })
    .catch((err) => {
      console.error(err)
      process.exit(-1)
    })
}
