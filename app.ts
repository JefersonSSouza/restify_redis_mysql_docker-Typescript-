import * as restify from "restify";
const server = restify.createServer();
import  createRouter from './router'

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

createRouter(server)

server.listen(5000, function () {
  console.log('ready on %s', server.url);
 
});

