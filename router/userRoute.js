import { Router } from "express"
import { controller } from "../controller/controller.js"
import { server } from '../app/client.js'

import { setValue } from "../app/server.js"

export const userRoute = Router()



userRoute.post('/', (request, response) => {
    setValue(response)
    return controller.register(request, response)
})


