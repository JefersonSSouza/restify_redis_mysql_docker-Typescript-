import { Knex } from "knex";

let getCompanyes = require('../companies.json')
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    console.log('Running company seed')
    for(var i = 0; i < getCompanyes.length; i++) {
          await knex('company').insert(getCompanyes[i]);
    }
    console.log('Company seed done!' )
};
