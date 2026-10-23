import path from "path"
import dotenv from "dotenv"


dotenv.config({
    path : path.join(process.cwd(), '.env')
})

export const config = {
    port : process.env.PORT,
    urls : {
        dbUrl : process.env.DATABASE_URL,
        frontEndUrl : process.env.FRONTEND_URL,
        backendUrl : process.env.BACKEND_URL
    }

}