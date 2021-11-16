import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("DB connected successfully".cyan.underline))
    .catch((error) => {
      console.log(`error ${error}`.red.underline.bold);
      process.exit(1);
    });
};

export default connectDB;
