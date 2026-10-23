import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const userSignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Controller logic to be implemented
    const payLoad = req.body;

    const result = await AuthServices.userSignUp(payLoad);

    return sendResponse(res, {
        success : true,
        statusCode : status.CREATED,
        message : "User SignUp Successfull",
        data : result
    })
});

const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Controller logic to be implemented
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Controller logic to be implemented
});

export const AuthController = {
    userSignUp,
    userLogin,
    getMe,
};
