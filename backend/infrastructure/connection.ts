import mongoose = require('mongoose')

type DbConnection = {
    db: string,
}
  
export default ({ db }: DbConnection) => {
    const connect = () => {
    mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        return console.info(`Successfully connected to ${db}`)
    })
    .catch(err => {
        console.error(`Error connecting to database :`, err)
        return process.exit(1)
    })
}
connect()
    mongoose.connection.on("disconnected", connect)
}