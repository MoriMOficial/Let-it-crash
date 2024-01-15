import { server as serverApp } from './client.js'
import { getDB, offDataBase } from '../database/database.js'
import { AsyncLocalStorage } from "node:async_hooks"
import { randomUUID } from "node:crypto"
import { promisify } from 'node:util'

let server

    // start server
getDB((DB) => {
    if(DB == true) server = serverApp.listen(3333, console.log("=> Server at 3333".green));
    if(DB == false) return
})


const storage = new AsyncLocalStorage()

    // gets the response from the body and saves the user ID and RESPONSE
export const setValue = (response) => {
    storage.enterWith({ response, id: randomUUID() })
    console.log("=> storage saved".yellow)
}

    // error verification "Let it crash"
for (const error of ['uncaughtException', 'unhandledRejection']) {
    process.once(error, async (message) => {
        const { response, id } = storage.getStore()
        console.log(`${id}`.cyan)
        const shortenId = id.slice(0, 3)
        console.log(`${shortenId}`.cyan)
        console.log(`=> req: [${shortenId}] crashed but will be nicely handled!`.red)

        console.log(`=> ${error} received!\nmessage: ${message}\n`.red)
        response.end(`wow! - req id: ${shortenId}`)

        offDataBase(() => {
            server.close()
            console.log('=> http server closed'.green)
        })
    })
}
