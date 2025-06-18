import mongoose from "mongoose";

const conectDBMongo = async (): Promise<void> => {
    const mongoUri = "mongodb://localhost:27017/Aplicaciones_web";
///<user>:<pass>@<servidor>:<puerto>/<db>?authSource=admin";
//mongo://</sevidor>:</puerto>/<db>
//mongo://</sevidor>:</puerto>/<db>
    try {
        await mongoose.connect(mongoUri);
        console.log("Conexion a mongo");
    } catch (error) {
        console.log("Error conexion a mongo: ", error);
    }
};

export default conectDBMongo;