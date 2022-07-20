import connection from "./connection";
require('dotenv').config()

export class BaseRepository {
    constructor() {
        connection({db: process.env.MONGO_URL});
    }
}