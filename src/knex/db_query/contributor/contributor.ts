const knex =require('../../knes.conf')

// select * from contributors;
const select_contributor = knex('contributors');

// select * from contributors where term ?
function select_contributors_company(term: any){
    const select_contributors_company = knex('contributors').where({cp_phone_number:term})
    return select_contributors_company
}
//exports module
export {
    select_contributor,
    select_contributors_company
}