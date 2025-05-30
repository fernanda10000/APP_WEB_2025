import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void>=>{
    const mongoUri="mongodb://<servidor>:<puertos>";
    //const mongoUri="mongodb://admin:admin@0.0.0.0:27017/proyecto?authSource=admin";
   // const mongoUri="mongodb://<user>:<pass>@<servidor>:<puertos>:/<bd>";
//    const mongoUri="mongodb://<user>:<pass>@<servidor>:<puertos>:/<bd>?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";


    try{
        await mongoose.connect("mongodb://localhost:27017/app_web");
        console.log('Conexion a mongo');
    } catch (error){
        console.log("Error conexion a mongo:", error);

    }



   // mongodb://localhost:27017/

}
export default connectDBMongo;

