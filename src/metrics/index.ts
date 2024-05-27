import { NextFunction, Request, Response } from "express";
import { requestCounter } from "./requestCount";
import { activeRequest } from "./activeRequest";
import { httpRequestDurationMicroseconds } from "./requestCount";

export const metricsMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const startTime = Date.now();
    activeRequest.inc();

    res.on("finish",function(){
        const endTime = Date.now();
        const duration = endTime-startTime;
        console.log(`Request took ${duration} ms.`)

        requestCounter.inc({
            method:req.method,
            route:req.route ? req.route.path : req.path,
            status_code:res.statusCode
        })
        httpRequestDurationMicroseconds.observe({
            method:req.method,
            route:req.route ? req.route.path : req.path,
            code:res.statusCode,
        },duration);

        activeRequest.dec()
    })
    next();
}