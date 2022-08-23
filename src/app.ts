import fastify, {FastifyReply, FastifyRequest} from "fastify";
import path from "path";
import dotenv from "dotenv";
import fastifyStatic from '@fastify/static';
import {userRoute} from "@controllers/user/user";
import {createReadStream, readFileSync} from "fs";

const {WEB_SERVER_PORT} = dotenv.config({path: path.join(__dirname, '..', '.env'), encoding: 'utf-8'}).parsed!;
const fastifyServer = fastify({
    logger: false,
    http2: true,
    https: {
        key: readFileSync(path.join(__dirname, '..', 'localhost-key.pem')),
        cert: readFileSync(path.join(__dirname, '..', 'localhost.pem'))
    }
});

fastifyServer.register(fastifyStatic, {
    root: path.join(__dirname, '../public', 'static')
})

fastifyServer.register(userRoute);

fastifyServer.route({
    method: 'GET',
    url : '/',
    handler: async (request: FastifyRequest, reply: FastifyReply)=>{
        return reply.type('text/html').sendFile('index.html')
    }

})

fastifyServer.listen(Number(WEB_SERVER_PORT), '0.0.0.0', (err, address)=>{
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log(`Server is listening at : ${address}`);
    }
});