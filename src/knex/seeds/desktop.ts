import { Knex } from "knex";
let getDesk = require('../desktop.json')
export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
  console.log('Running desktop seed')
  for(var i = 0; i < getDesk.length; i++) {
   await knex('desktop').insert(getDesk[i]);
  }
   console.log('Running desktop seed')
};
