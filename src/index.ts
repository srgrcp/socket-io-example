import 'reflect-metadata'
import * as http from 'http'
import { Server } from 'socket.io'
import { Socket } from 'socket.io/dist/socket'
import Container from 'typedi'
import { NextFn } from './utils/types'
import { SocketIOServer } from './socket.io'
import { setIo } from './utils/io-instance'

const setupSocketIOServer = () => {
  const server = http.createServer()

  const io = new Server((server as any) as http.Server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  })

  io.use((_: Socket, next: NextFn) => {
    next(new Error('invalid namespace'))
  })
  
  setIo(io)
  const ioServer = Container.get(SocketIOServer)
  ioServer.registerModules()

  const port = 7070
  server.listen(port, () => {
    console.log('[SERVER] listening on port', port)
  })
}

setupSocketIOServer()
