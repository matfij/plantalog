import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Plant extends Entity {}

let plantSchema = new Schema(
    Plant,
    {
        name: { type: 'string' },
        calories: { type: 'number' },
        vitamins: { type: 'string', textSearch: true },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createPlant(data) {
    await connect();

    const repo = new Repository(plantSchema, client);
    const plant = repo.createEntity(data);
    const id = await repo.save(plant);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = new Repository(plantSchema, client);
    await repository.createIndex()
}

export async function searchPlants(query) {
    await connect();

    const repository = new Repository(plantSchema, client);
    const matchingPlants = await repository.search()
        .where('name').eq(query)
        .or('vitamins').matches(query)
        .return.all();
    return matchingPlants;
}
