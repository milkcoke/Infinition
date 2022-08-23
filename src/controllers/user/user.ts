import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import getPoolClient from "@db/poolClient";
import {getAllUsers} from "@models/user/user";

async function route(fastifyInstance: FastifyInstance) {
    fastifyInstance.route({
        method: 'GET',
        url: '/users',
        // schema: ,
        handler: getAllUser
    })
}

async function getAllUser(request: FastifyRequest, reply: FastifyReply) {

    const poolClient = await getPoolClient();

    try {
        const result = await poolClient?.query(getAllUsers);
        console.dir(result);

        return reply
            .send(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
        }
        return reply.send(err);
    } finally {
        poolClient?.release();
    }


}

export {
    route as userRoute
}