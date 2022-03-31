// Importing modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const app = express();
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: ["insert-url-here"], // Optional, this middleware has some other cool options you can try.
    credentials: true, // Important if you want a REST API
  })
);
app.use(
  helmet({
    // xssFilter: true, // Optional, try using the other cool options this middlware has. // this middleware is used for security and stuff... it's pretty cool.
  })
);
// app.use(morgan("dev")); // Completely optional, only for logging how requests went, status codes etc... keep this commented or even delete this if you don't want a spammed terminal.

// Running the app
const port = process.env.PORT || 8080; // Insert any port you want, or change it in .env file.
app.listen(port, () => {
  console.log(
    `Server started on port: ${port}, URL: ${
      process.env.URL ? process.env.URL : `http://localhost:${port}`
    }`
  ); // An optional console log to show when the server starts, change the URL variable in .env to make it log a different URL.
});

// API Middleware
app.use("/api", require("./api/apiRouter"));
app.use("/cdn", require("./cdn/cdnRouter"));
app.use(notFound);
app.use(errorHandler);
