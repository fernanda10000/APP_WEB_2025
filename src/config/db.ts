import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
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

>>>>>>> a79b98c54feac8e0a6f86c2cfd7ad0ca17a16821
