import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile, deleteFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "products.json";
        this.#products = [];
    }

    async getAll(limit) {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return limit ? this.#products.slice(0, limit) : this.#products;
        } catch (error) {
            throw new ErrorManager("Error al cargar los productos", error.code || 500);
        }
    }

    async #findOneById(id) {
        const products = await this.getAll();
        const product = products.find(p => p.id === Number(id));

        if (!product) {
            throw new ErrorManager("Producto no encontrado", 404);
        }
        return product;
    }

    async #isCodeDuplicate(code) {
        const products = await this.getAll();
        return products.some(product => product.code === code);
    }

    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async insertOne(data, file) {
        try {
            const { title, description, code, price, status, stock, category } = data;

            if (!title) throw new ErrorManager("El campo 'title' es obligatorio", 400);
            if (!description) throw new ErrorManager("El campo 'description' es obligatorio", 400);
            if (!code) throw new ErrorManager("El campo 'code' es obligatorio", 400);
            if (price == null || isNaN(price)) throw new ErrorManager("El campo 'price' es obligatorio y debe ser un número", 400);
            if (stock == null || isNaN(stock)) throw new ErrorManager("El campo 'stock' es obligatorio y debe ser un número", 400);
            if (!category) throw new ErrorManager("El campo 'category' es obligatorio", 400);

            if (await this.#isCodeDuplicate(code)) {
                throw new ErrorManager("El código ya existe, debe ser único", 400);
            }

            const newProduct = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status: status !== undefined ? Boolean(status) : true,
                stock: Number(stock),
                category,
                thumbnails: file ? [file.filename] : []
            };

            this.#products.push(newProduct);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return newProduct;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename);
            throw new ErrorManager(error.message, error.code || 500);
        }
    }

    async updateOneById(id, data, file) {
        try {
            const productFound = await this.#findOneById(id);

            const updatedProduct = {
                ...productFound,
                ...data,
                price: data.price ? Number(data.price) : productFound.price,
                stock: data.stock ? Number(data.stock) : productFound.stock,
                status: data.status !== undefined ? Boolean(data.status) : productFound.status,
                thumbnails: file ? [...productFound.thumbnails, file.filename] : productFound.thumbnails,
            };

            const index = this.#products.findIndex(p => p.id === productFound.id);
            this.#products[index] = updatedProduct;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return updatedProduct;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename);
            throw new ErrorManager(error.message, error.code || 500);
        }
    }

    async deleteOneById(id) {
        try {
            const productFound = await this.#findOneById(id);

            if (productFound.thumbnails.length > 0) {
                for (const thumbnail of productFound.thumbnails) {
                    await deleteFile(paths.images, thumbnail);
                }
            }

            this.#products = this.#products.filter(p => p.id !== Number(id));
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
        } catch (error) {
            throw new ErrorManager(error.message, error.code || 500);
        }
    }
}
