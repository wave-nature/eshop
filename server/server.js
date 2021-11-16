import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import colors from "colors";
import morgan from "morgan";
import connectDB from "./utils/db.js";
import { notFound, globalErrorHandler } from "./controller/errorController.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

connectDB();

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//body parser
app.use(express.json({ limit: "20kb" }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use("*", notFound);

app.use(globalErrorHandler);

const PORT = 7000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `App running in ${process.env.NODE_ENV} on port ${PORT}`.green.bold
  )
);
