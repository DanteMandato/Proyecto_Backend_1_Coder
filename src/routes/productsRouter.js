import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
        limit: Number(limit),
        page: Number(page),
        sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
    };

    const filter = query ? { $or: [{ category: query }, { status: query }] } : {};

    const products = await Product.paginate(filter, options);
    res.json(products);
});

export default router;
