import { configDotenv } from 'dotenv';
configDotenv();

const Config = {
    appConfig: {
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST
    },
    dbConfig: {
        port: process.env.DB_PORT,
        uri: process.env.DB_URI,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME
    },
    secretWebToken: process.env.SECRET_WEB_TOKEN,
}

export default Config;