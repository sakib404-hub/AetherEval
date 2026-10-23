import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { UserLogin, UserSignUp } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../config/config";
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { jwtUtility } from "../../utility/jwt";

const userSignUp = async (payLoad : UserSignUp) => {
    const isUserExist = await prisma.user.findUnique({
        where : {
            email : payLoad.email
        }
    });

    if(isUserExist){
        throw new AppError(status.BAD_REQUEST, "User With this email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(payLoad.password, Number(config.bcrypt_salt_rounds));

    const user = await prisma.user.create({
        data : {
            name : payLoad.name,
            email : payLoad.email,
            password : hashedPassword
        }
    })

    return user;
};

const userLogin = async (payLoad : UserLogin) => {
    const { email, password } = payLoad;

    const isUserExist = await prisma.user.findUnique({
        where : {
            email 
        }
    });

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User Does not Exist.");
    }

    if (isUserExist.status === UserStatus.BLOCKED) {
        throw new AppError(status.FORBIDDEN, "User is Blocked, Contact Admin");
    }

    if (isUserExist.status === UserStatus.PENDING_APPROVAL) {
        throw new AppError(
            status.FORBIDDEN,
            "Your account is pending admin approval."
        );
    }

    if (isUserExist.status === UserStatus.REJECTED) {
        const reason = isUserExist.rejectionReason ? `: ${isUserExist.rejectionReason}` : "";
        throw new AppError(
            status.FORBIDDEN,
            `Your account has been rejected${reason}`
        );
    }

    if (isUserExist.status !== UserStatus.ACTIVE) {
        throw new AppError(status.FORBIDDEN, "Your account is not active.");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist.password
    );

    if (!isPasswordMatched) {
        throw new AppError(status.UNAUTHORIZED, "Password does not match");
    }

    const jwtPayload = {
        userId: isUserExist.id,
        name : isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = jwtUtility.createToken(jwtPayload, config.jwt.accessSecret, config.jwt.accessExpiresIn as SignOptions)

    const refreshToken = jwtUtility.createToken(jwtPayload, config.jwt.refreshSecret, config.jwt.refreshExpiresIn as SignOptions);


    return {
        accessToken,
        refreshToken,
    };
};

const getMe = async () => {
    // TODO: Get authenticated user profile
};

export const AuthServices = {
    userSignUp,
    userLogin,
    getMe,
};
