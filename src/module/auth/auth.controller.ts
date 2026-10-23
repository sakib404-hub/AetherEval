import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { config } from "../../config/config";

const userSignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;

    const result = await AuthServices.userSignUp(payLoad);

    return sendResponse(res, {
        success : true,
        statusCode : status.CREATED,
        message : "User SignUp Successfull",
        data : result
    });
});

const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;

    const { accessToken, refreshToken, user } = await AuthServices.userLogin(payLoad);

    const isProduction = config.node_env?.toLowerCase() === "production";
    
    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : isProduction,
        sameSite : isProduction ? "none" : "lax",
        maxAge : 1000 * 60 * 60 * 24 
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : isProduction,
        sameSite : isProduction ? "none" : "lax",
        maxAge : 1000 * 60 * 60 * 24 * 7
    });

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "User Login Successfull",
        data : {
            accessToken,
            refreshToken,
            user,
        }
    });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const result = await AuthServices.getMe(user?.userId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "User Profile Retrieved Successfully",
        data : result
    });
});

export const AuthController = {
    userSignUp,
    userLogin,
    getMe,
};
