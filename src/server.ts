import app from "./app";
import { config } from "./config/config";
import { prisma } from "./lib/prisma";
import { seedAdmin } from "./utility/seed";

const PORT = config.port || 5000;

const main = async()=>{
    try{

        await prisma.$connect();
        console.log("Database Connected Successfully.");

        await seedAdmin();

        const server = app.listen(PORT, ()=>{
            console.log(`Server is Running on port : ${PORT}`);
        })

        server.on("error", (err)=>{
            console.log("Server Failed with : ", err);
            process.exit(1);
        })

    }catch(error){
        console.log("Error Strating the server : ", error);
        process.exit(1);
    }
}

main();