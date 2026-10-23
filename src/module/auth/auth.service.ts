import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { UserSignUp } from "./auth.interface";
import bcrypt from "bcryptjs";
import { config } from "../../config/config";

const userSignUp = async (payLoad : UserSignUp) => {
    const isUserExist = await prisma.user.findUnique({
        where : {
            email : payLoad.email
        }
    });

    if(isUserExist){
        throw new AppError(status.BAD_REQUEST, "User With this email Already Exists");
    }

    const hashedPassword =await bcrypt.hash(payLoad.password, Number(config.bcrypt_salt_rounds));

    const user = await prisma.user.create({
        data : {
            name : payLoad.name,
            email : payLoad.email,
            password : hashedPassword
        }
    })

    return user;

    
};

const userLogin = async () => {
    // TODO: Authenticate credentials; block non-active accounts
};

const getMe = async () => {
    // TODO: Get authenticated user profile
};

export const AuthServices = {
    userSignUp,
    userLogin,
    getMe,
};
