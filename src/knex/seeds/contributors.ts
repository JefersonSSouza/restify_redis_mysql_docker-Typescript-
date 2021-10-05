import { Knex } from "knex";
let getComtib = require('../contributors.json')
export async function seed(knex: Knex): Promise<void> {
     // Inserts seed entries
  console.log('Running contributors seed')
  for(var i = 0; i < getComtib.length; i++) {
   await knex('contributors').insert(getComtib[i]);
  }
  console.log('Contributors seed done!')
};
