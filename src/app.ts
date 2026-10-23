import express, { Application, Request, Response } from "express"
import cors from "cors"
import { config } from "./config/config";
import cookieParser from "cookie-parser";
import status from "http-status";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { AuthRouter } from "./module/auth/auth.route";


const app : Application = express();


app.use(cors({
    origin : config.urls.backendUrl,
    credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(cookieParser())


// Capture the server start time when the application initializes
const serverStartTime = new Date();

app.get("/", (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    statusCode: status.OK,
    message: "Welcome to the API! The server is up and running successfully.",
    data: {
      name: "Your API Name",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      status: "operational",
    },
    server: {
      startTime: serverStartTime.toISOString(),
      currentTime: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(process.uptime()),
      },
    },
    author: {
      name: "Md. Sakib Hossen",
      role: "Full Stack Web Developer",
      github: "https://github.com/sakib404-hub",
      email: "akibhossainsakib1040@gmail.com",
    },
  });
});


app.use('/api/v1/auth', AuthRouter);


app.use(globalErrorHandler);
app.use(notFound);


export default app;