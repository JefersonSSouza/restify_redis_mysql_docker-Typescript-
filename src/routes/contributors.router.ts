import { select_contributor,select_contributors_company} from "../knex/db_query/contributor/contributor";

const Router = require('restify-router').Router;
const routerInstance = new Router();

const redis  = require('promise-redis')()
let redis_client = redis.createClient(6379);

// instance router of server
function createRouterContributor(server: any) {
  redis_client = redis_client;
  server = server;
  // add all routes registered in the router to this server instance
  routerInstance.applyRoutes(server);
}

// Get all desktops in all companies
async function getAllContributors(req: any, res: any,next: () => void) {
  const redis_result = await redis_client.get('allContributors')
  if (!redis_result) {
    let select_contributors = select_contributor;
    let contributors_list;
    await select_contributors.then((data: any) => {
      contributors_list = data;
      let cp = JSON.stringify(contributors_list)
      redis_client.set('allContributors', cp)
    }).catch((e: { message: any; }) => {
      console.log(e.message)
    }).finally(() => {
      //knex.destroy()
    })
    console.log('response from mysql')
    res.json({ contributors_list });
  } else {
    console.log('response from redis')
   let result = JSON.parse(redis_result)
    res.json({ result });
  }

  return next();
}

//Get all contributors in a company
async function contributorsCompany(req: any, res: any,next: () => void) {
  const redis_result = await redis_client.get('allContributors.company.'+req.body.phone_number)

  if (!redis_result) {
  let contrib_comp = select_contributors_company(req.body.phone_number);
  let contrib
  await contrib_comp.then((data: any) => {
    contrib = data;
   let cp = JSON.stringify(contrib)
    redis_client.set('allContributors.company.'+req.body.phone_number,cp)
  }).catch((e: { message: any; }) => {
    console.log(e.message)
  }).finally(() => {
    //knex.destroy()
  })
  console.log('response from mysql')
  res.json({ contrib });
} else {
  console.log('response from redis')
 let result = JSON.parse(redis_result)
  res.json({ result });
}

return next();
}



routerInstance.get('/getAllContributors', getAllContributors);
routerInstance.post('/getContributorsCompany', contributorsCompany);

export{ createRouterContributor };