import { Knex } from "knex";


exports.up = function (knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; fn: { now: () => any; }; }, Promise: any) {

    return  knex.schema.createTable('company',function(table){
        table.string('id').notNullable();
        table.string('business_name').notNullable();
        table.string('suffix').notNullable();
        table.string('industry').notNullable();
        table.string('catch_phrase').notNullable();
        table.string('bs_company_statement').notNullable();
        table.string('logo').notNullable();
        table.string('type').notNullable();
        table.string('phone_number').primary()
        table.string('full_address').notNullable();
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex: { schema: { dropTableIfExists: (arg0: string) => any; }; }) {
  
    return knex.schema.dropTableIfExists('company');
};


