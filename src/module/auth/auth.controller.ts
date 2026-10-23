import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

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

    const {accessToken, refreshToken} = await AuthServices.userLogin(payLoad);

    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : false,
        sameSite : 'none',
        maxAge : 1000 * 60 * 60 * 24
    });

      res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite : 'none',
        maxAge : 1000 * 60 * 60 * 24 * 7
    });

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "User Login Successfull",
        data : {
            accessToken,
            refreshToken
        }
    });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Controller logic to be implemented
});

export const AuthController = {
    userSignUp,
    userLogin,
    getMe,
};
