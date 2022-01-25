import { searchPlants } from "../../lib/redis";

export default async function handler(req, res) {
    const query = req.query.query;
    const plants = await searchPlants(query);
    res.status(200).json({ plants });
}
