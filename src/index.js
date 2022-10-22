import dns2 from 'dns2'
import { internalIpV4Sync } from 'internal-ip'

function getLocalIp() {
  const ip = internalIpV4Sync()

  // When the IP is undefined, it means the network is unavailable.
  // In that case, return loopback address is the best choice.
  return ip != undefined ? ip : '127.0.0.1'
}

function start(port, { debug = false } = {}) {
  const { Packet } = dns2

  const server = dns2.createServer({
    udp: true,
    handle: (request, send, _rinfo) => {
      const response = Packet.createResponseFromRequest(request)

      const [question] = request.questions
      const { name } = question

      response.answers.push({
        name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 0,
        address: getLocalIp(),
      })
      send(response)
    },
  })

  server.on('request', (request, _response, _rinfo) => {
    if (debug) {
      console.debug(request.header.id, request.questions[0])
    }
  })

  server.on('requestError', (error) => {
    console.log('Client sent an invalid request', error)
  })

  server.on('listening', () => {
    const {
      udp: { address: address, port: port },
    } = server.addresses()

    console.log(`Server is listening on ${address}:${port}`)
  })

  server.on('close', () => {
    console.log('Server closed')
  })

  server.listen({
    udp: {
      address: '127.0.0.1',
      type: 'udp4',
      port: port,
    },
  })
}

export default { start: start }
