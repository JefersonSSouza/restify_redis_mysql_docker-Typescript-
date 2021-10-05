const Router = require('restify-router').Router;
const routerInstance = new Router();

const redis = require('promise-redis')()
const redis_client = redis.createClient(6379);
import {
    select_desktop,
    select_desktops_company
} from '../knex/db_query/desktop/desktop'

// instance router of server
function createRouterDesktop(server: any) {
    server = server;
    // add all routes registered in the router to this server instance
    routerInstance.applyRoutes(server);
}

// Get all desktops in all companies
async function getAllDesktops(req: any, res: any,next: () => void) {
    const redis_result = await redis_client.get('allDesktop')
    if (!redis_result) {
        let select_desktops = select_desktop;
        let desktops_list
        await select_desktops.then((data: any) => {
            desktops_list = data;
            let cp = JSON.stringify(desktops_list)
            redis_client.set('allDesktop', cp)
        }).catch((e: { message: any; }) => {
            console.log(e.message)
        }).finally(() => {
            //knex.destroy()
        })
        console.log('response from mysql')
        res.json({ desktops_list });
    } else {
        console.log('response from redis')
        let result = JSON.parse(redis_result)
        res.json({ result });
    }

    return next();
}

//Get all desktops in a company
async function desktopsCompany(req: any, res: any,next: () => void) {
    const redis_result = await redis_client.get('allDestops.company.' + req.body.phone_number)

    if (!redis_result) {
        let desk_comp = select_desktops_company(req.body.phone_number);
        let desk
        await desk_comp.then((data: any) => {
            desk = data;
            let cp = JSON.stringify(desk)
            redis_client.set('allDestops.company.' + req.body.phone_number, cp)
        }).catch((e: { message: any; }) => {
            console.log(e.message)
        }).finally(() => {
            //knex.destroy()
        })
        console.log('response from mysql')
        res.json({ desk });
    } else {
        console.log('response from redis')
        let result = JSON.parse(redis_result)
        res.json({ result });
    }

    return next();
}

routerInstance.get('/getAllDesktops', getAllDesktops);
routerInstance.post('/getDesktopCompany', desktopsCompany);

export{ createRouterDesktop };

