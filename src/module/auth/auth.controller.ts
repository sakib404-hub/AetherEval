import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";

const userSignUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Controller logic to be implemented
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
