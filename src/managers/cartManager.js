import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./errorManager.js";

export default class CartManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carts.json";
        this.#carts = [];
    }

    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager("Error al cargar el carrito", error.code);
        }
    }

    async #findOneById(id) {
        this.#carts = await this.getAll();
        const cart = this.#carts.find(c => c.id === Number(id));

        if (!cart) {
            throw new ErrorManager("Carrito no encontrado", 404);
        }
        return cart;
    }

    async createCart() {
        try {
            const newCart = { id: generateId(this.#carts), products: [] };
            this.#carts.push(newCart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
            return newCart;
        } catch (error) {
            throw new ErrorManager("Error al crear el carrito", error.code);
        }
    }

    async getCartById(cid) {
        try {
            return await this.#findOneById(cid);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await this.#findOneById(cid);
            const productIndex = cart.products.findIndex(p => p.product === Number(pid));

            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: Number(pid), quantity: 1 });
            }

            const cartIndex = this.#carts.findIndex(c => c.id === cart.id);
            this.#carts[cartIndex] = cart;

            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
            return cart;
        } catch (error) {
            throw new ErrorManager("Error al agregar el producto al carrito", error.code);
        }
    }
}
