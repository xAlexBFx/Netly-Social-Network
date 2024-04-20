import app from './app.js'
import { connectDB } from './db.js'

connectDB();

const serverPort = process.env.SERVER_PORT;

app.listen(serverPort)
console.log(`>>> App on port ${serverPort}`);