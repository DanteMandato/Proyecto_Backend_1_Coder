import { Server } from "socket.io";
import Product from "../models/product.model.js";

export const config = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado", socket.id);

        socket.emit("products", await Product.find());

        socket.on("new-product", async (data) => {
            await Product.create(data);
            io.emit("products", await Product.find());
        });

        socket.on("delete-product", async (id) => {
            await Product.findByIdAndDelete(id);
            io.emit("products", await Product.find());
        });
    });
};
