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
    },
    node_env : process.env.NODE_ENV,
    jwt : {
        accessSecret : process.env.JWT_ACCESS_SECRET,
        accessExpiresIn : process.env.JWT_ACCESS_EXPIRES_IN,
        refreshSecret : process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn : process.env.JWT_REFRESH_EXPIRES_IN,
    },
    admin : {
        name : process.env.ADMIN_NAME,
        email : process.env.ADMIN_EMAIL,
        password : process.env.ADMIN_PASSWORD,
    },
    bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,

}