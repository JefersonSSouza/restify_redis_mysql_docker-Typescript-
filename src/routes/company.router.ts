const Router = require('restify-router').Router;

const routerInstance = new Router();

const redis = require('promise-redis')();
let redis_client =  redis.createClient(6379);

import {select_companies,
    select_company_term} from '../knex/db_query/company/company'
    const getAllCompaies = select_companies
    const selectCompanie_term = select_company_term

// shell js to run script knex and anothers scripts
const shell = require('shelljs')
let server;
// instance router of server
function companyRouterCompany(server: any) {
  redis_client = redis_client;
  server = server;
  // add all routes registered in the router to this server instance
  routerInstance.applyRoutes(server);
}

// Get all companies list
async function getAllCompanies(req: any, res: any,next: () => void) {
  const redis_result = await redis_client.get('allCompanies')
  if (!redis_result) {
    let select_companies = getAllCompaies;
    let companies_list;
    await select_companies.then((data: any) => {
      companies_list = data;
      let cp;
      cp = JSON.stringify(companies_list)
      redis_client.set('allCompanies', cp)
    }).catch(() => {
      //console.log(e.message)
    }).finally(() => {
      //knex.destroy()
    })
    console.log('response from mysql')
    res.json({ companies_list });
  } else {
    console.log('response from redis')
    let result = JSON.parse(redis_result)
    res.json({ result });
  }

  return next();
}


//POST which receives a term to search a company
async function searchCompany(req: any, res: any,next: () => void) {


  var strRes: string | string[] ;
  strRes = JSON.stringify(req.body);
  strRes = strRes.replace('{', '');
  strRes = strRes.replace('}', '');
  strRes = strRes.split(':')

  const redis_result = await redis_client.get('company.term.' + strRes)

  if (!redis_result) {
    let select_company_term = selectCompanie_term(req.body);
    let company;
    await select_company_term.then((data: any) => {
      company = data;
      let cp = JSON.stringify(company)
      redis_client.set('company.term.' + strRes, cp)
    }).catch((e: { message: any; }) => {
      console.log(e.message)
    }).finally(() => {
      //knex.destroy()
    })
    console.log('response from mysql')
    res.json({ company });
  } else {
    console.log('response from redis')
    let result = JSON.parse(redis_result)
    res.json({ result });
  }
  return next();
}

routerInstance.get('/getAllCompanies', getAllCompanies);
routerInstance.post('/searchCompanies', searchCompany);

export{ companyRouterCompany };

