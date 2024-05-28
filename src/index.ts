import express from "express";
// import { middleware } from "./middleware";
import client from "prom-client";
import { metricsMiddleware } from "./metrics";

const app = express();
app.use(express.json());
app.use(metricsMiddleware)

app.get("/metrics",async(req,res)=>{
    const metrics = await client.register.metrics();
    res.set("Content-type",client.register.contentType);
    res.end(metrics);
})

app.get("/user",async(req,res)=>{
    await new Promise((resolve)=> setTimeout(resolve,1000));
    res.send({
        name:"Pranav",
        age:23
    })
})

// app.post("/user",(req,res)=>{
//     const user = req.body;
//     const path = req.path
//     res.json({
//         ...user,
//         path,
//         id:1,
//     })
// })
app.listen(8080);
