import { Knex } from "knex";


exports.up = function(knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; fn: { now: () => any; }; }) {
    return  knex.schema.createTable('contributors',function(table){
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('title').notNullable();
        table.string('jobTitle').notNullable();
        table.string('age').notNullable();
        table.string('cp_phone_number').notNullable();
        table.foreign('cp_phone_number').references('company.phone_number').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex: { schema: { dropTableIfExists: (arg0: string) => any; }; }) {
  
    return knex.schema.dropTableIfExists('contributors');
};