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
        vitamins: { type: 'string' },
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
}
