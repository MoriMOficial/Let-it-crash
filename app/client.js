import colors from 'colors'
import express from 'express'
import { router } from '../router/router.js'

export const server = express()

server.use(express.json())
server.use(router)
