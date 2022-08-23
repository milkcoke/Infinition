import {Pool, PoolConfig} from 'pg';
import dotenv, {DotenvParseOutput} from "dotenv";
import path from "path";

const dbConfig : DotenvParseOutput = dotenv.config({path: path.join(__dirname, '../..', '.env'), encoding: 'utf-8'}).parsed!;

const poolConfig : PoolConfig = {
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    host: dbConfig.DB_HOST,
    port: Number(dbConfig.DB_PORT),
    database: dbConfig.DB_NAME,
}

const pool = new Pool(poolConfig);

async function getPoolClient(){
    try {
        return await pool.connect();
        // when you are finished with a client.
        // You must call client.release()
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw err.stack;
        }
    }
}

export default getPoolClient;