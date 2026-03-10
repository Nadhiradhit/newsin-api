import { config } from 'dotenv'

config();

const env = {
    Server: {
        MODE: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),
    },
    DB: {
        URL: process.env.DATABASE_URL
    },
    JWT: {
        TOKEN: process.env.JWT_TOKEN
    },
    CORS: {
        ORIGIN : process.env.CORS_ORIGIN
    }
}

export default env