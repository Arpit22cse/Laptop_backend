const Laptop = require('../models/Laptop');

class UserController{
    async getLaptops(req, res) {
        try {
            const { page = 1, limit = 20, ...filters } = req.query;
            const query = {};

            // Build filter query
            for (const key in filters) {
                if (filters[key]) {
                    query[key] = filters[key];
                }
            }

            const laptops = await Laptop.find(query)
                .skip((page - 1) * limit)
                .limit(Number(limit));

            const total = await Laptop.countDocuments(query);

            res.json({
                data: laptops,
                total,
                page: Number(page),
                limit: Number(limit)
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();