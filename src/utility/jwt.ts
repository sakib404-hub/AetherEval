import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken = (
    jwtPayload: JwtPayload,
    secret: string,
    expiresIn: SignOptions
) => {
    const token = jwt.sign(jwtPayload, secret, {
        expiresIn,
    } as SignOptions);

    return token;
};

const verifyToken = (token: string, secret: string) => {
    try {
        const verification = jwt.verify(token, secret);

        return {
            success: true,
            data: verification,
        };
    } catch (err: unknown) {
        const errorMessage =
            err instanceof Error ? err.message : "Token verification failed";
        console.log("Token verification failed : ", err);
        return {
            success: false,
            error: errorMessage,
        };
    }
};

export const jwtUtility = {
    createToken,
    verifyToken,
};
