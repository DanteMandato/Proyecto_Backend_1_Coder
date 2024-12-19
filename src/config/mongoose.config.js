import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://analista666:analista666@cluster0.mb0uu.mongodb.net/Proyecto_CH";
    try {
        await connect(URL);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB", error.message);
    }
};

export const isValidID = (id) => Types.ObjectId.isValid(id);
