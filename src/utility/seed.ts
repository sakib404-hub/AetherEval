import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { Role } from "../../prisma/generated/prisma/enums";
import { config } from "../config/config";
import { AppError } from "./AppError";
import status from "http-status";


export const seedAdmin = async()=>{
    try{
        await prisma.$transaction(async(tx)=>{

            const isAdminExist = await tx.user.findFirst({
                where : {
                    role : Role.ADMIN
                }
            });

            if(isAdminExist){
                console.log("Admin Already Exists");
                return;
            }

            const name = config.admin.name;
            const email = config.admin.email;
            const password = config.admin.password;

            if(!email || !password || !name){
                throw new AppError(status.BAD_REQUEST, "Admin Email and Password is not found in the environment.")
            }

            const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

            const admin = await tx.user.create({
                data : {
                    name,
                    email,
                    password : hashedPassword,
                    role : Role.ADMIN
                }
            })

            console.log("Admin Creation Successfull.");
        })

    }catch(err){
        console.log("Error While Seeding Admin.");
    }
}