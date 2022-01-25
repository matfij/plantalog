import { createPlant } from "../../lib/redis"

export default async function handler(req, res) {
    const id = await createPlant(req.body);
    res.status(200).json({ id });
}
