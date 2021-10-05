const Router = require('restify-router').Router;

import {companyRouterCompany} from'./src/routes/company.router'
import {createRouterDesktop } from'./src/routes/desktop.router'
import {createRouterContributor} from'./src/routes/contributors.router'
const routerInstance = new  Router()


// shell js to run script knex and anothers scripts
const shell = require('shelljs')


// router router by server
function createRouter(server: any){
    //apply main router to server
    routerInstance.applyRoutes(server);
    //add another routes to main router
    companyRouterCompany(server)
    createRouterDesktop(server)
    createRouterContributor(server)
}














// home
routerInstance.get('/', async function (req: any, res:any,next: any){
    console.log('hello world')
    res.json({message:'hello world'});
    next();
});


//migration success
routerInstance.get('/migrate-success', function (req: any, res:any,next: any){
    res.json({
        message:'All migrations is successfully done !!'
    })
   return next()
});


// knex migrate: latest to create database
routerInstance.get('/migrate/:user', async function (req: any, res:any,next: any){
    if(req.params.user == 'ADMIN-migrate'){ 
        // download json dataset from github
            shell.exec('python ./src/knex/getData.py' ) 
         // run knex migrate
            shell.exec('knex --knexfile=./src/knex/knexfile.js migrate:latest ' );
        //redirect after migrate and download data to seed file
        await res.redirect('/seedRun',next)     
        }
});

//seed success
routerInstance.get('/seed-success', function  (req: any, res:any,next: any){
    res.json({
        message:'All seeds is successfully done !!'
    })
   return next()
});

//seedRun
routerInstance.get('/seedRun', async function  (req: any, res:any,next: any){
    // run knex seeds
        shell.exec('knex --knexfile=./src/knex/knexfile.js seed:run ' );
    //redirect after migrate and download data to seed file
        await res.redirect('/migrate-success',next)      
});


export =createRouter

 
