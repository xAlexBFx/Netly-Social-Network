import app from './app.js'
import { connectDB } from './db.js'
import Config from './config.js';
connectDB();

const serverPort = Config.appConfig.port;

app.listen(serverPort)
console.log(`>>> API on port ${serverPort}`);