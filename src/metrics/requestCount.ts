import client from "prom-client";
import { NextFunction,Request,Response } from "express";

//create counter metric
export const requestCounter = new client.Counter({
    name:"http_total_request",
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
})

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
})