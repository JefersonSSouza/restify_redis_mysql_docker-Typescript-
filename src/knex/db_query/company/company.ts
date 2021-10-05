const knex =require('../../knes.conf')

// select * from company;
const select_companies = knex('company');


function select_company_term(term: any){
    const select_company_term = knex('company').where(term)
    return select_company_term
}


export {
    select_companies,
    select_company_term
}