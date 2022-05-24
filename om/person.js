import { Entity, Schema } from 'redis-om';
import client from './client.js';

/* our entity */
class Person extends Entity {}

//Valid values are: string, number, boolean, string[], date, point, and text.
//let point = { longitude: 12.34, latitude: 56.78 }

//string fields can only be matched on their whole value—no partial matches—and are best
//for keys while text fields have full-text search enabled on them and are optimized for human-readable text.

//Every entity in Redis OM has an entity ID
/* create a Schema for Person */
const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' },
});

/* use the client to create a Repository just for Persons */
export const personRepository = client.fetchRepository(personSchema);

//create an index or we won't be able to search
//If an index already exists and it's identical, this function won't do anything.

/* create the index for Person */
await personRepository.createIndex();
