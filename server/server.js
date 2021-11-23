import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
import colors from "colors";
import morgan from "morgan";
import connectDB from "./utils/db.js";
import { notFound, globalErrorHandler } from "./controller/errorController.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

connectDB();

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//body parser
app.use(express.json({ limit: "20kb" }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

//PAYPAL (we will hit this route and fetch this client id)
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use(notFound);

app.use(globalErrorHandler);

const PORT = 7000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `App running in ${process.env.NODE_ENV} on port ${PORT}`.green.bold
  )
);
