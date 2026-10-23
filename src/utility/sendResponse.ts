import { Response } from "express";

type TMeta = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

type TResponseData<T> = {
    success : boolean;
    statusCode : number;
    message : string;
    data ?: T;
    meta ?: TMeta
    
}

export const sendResponse = <T>(res : Response, data : TResponseData<T>)=>{
    const response : TResponseData<T> = {
        success : data.success,
        statusCode : data.statusCode,
        message : data.message
    }

    if(data.data !== undefined){
        response.data = data.data
    }

    return res.status(response.statusCode).json(response);
}