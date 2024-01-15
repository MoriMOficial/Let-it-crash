import { connect, disconnect } from 'mongoose'
import { config } from 'dotenv'
config()

    // get connection string
const getConnectionString = () => {
    const DBUSER = encodeURIComponent(process.env.DBUSER)
    const DBPASSW = encodeURIComponent(process.env.DBPASSW)
    const DBCLUSTER = encodeURIComponent(process.env.DBCLUSTER)
    return `mongodb+srv://${DBUSER}:${DBPASSW}@${DBCLUSTER}.iaj7qak.mongodb.net/?retryWrites=true&w=majority`
}

    // connect database
export async function getDB(cb) {
    connect(getConnectionString())
        .then(() => {
            cb(true)
            console.log("=> Database connected".green)
        })
        .catch(() => cb(false))
}

    // disconnect database
export const offDataBase = (cb) => {
    disconnect()
        .then(() => {
            cb()
            console.log('=> Successfully disconnected from the database'.green);
        })
        .catch((err) => {
            console.log('=> There was an error disconnecting from the database'.red, err);
        });
}