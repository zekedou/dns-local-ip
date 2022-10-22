#!/usr/bin/env node

import server from '../src/index.js'

const args = process.argv.slice(2)
const [port, debugFlag] = args

const isDebugEnabled = debugFlag == '--debug'

if (port) {
  server.start(port, { debug: isDebugEnabled })
} else {
  console.log('A port number should be provided.')
  console.log(usage())
}

function usage() {
  return `
Usage:

  dns_local_ip <port> [--debug]

`
}
