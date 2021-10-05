const knex =require('../../knes.conf')
// select * from desktop;
const select_desktop = knex('desktop');

// select * from desktop where term ?
function select_desktops_company(term: any){
    const select_desktops_company = knex('desktop').where({cp_phone_number:term})
    return select_desktops_company
}
//exports module
export{
    select_desktop,
    select_desktops_company
}