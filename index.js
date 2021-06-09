const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./route/userRoute");
const postRoutes = require("./route/postRoute");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

//middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/user", userRoute);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB = process.env.MONGODB_CONNECTION;

mongoose.connect(
  MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`MongoDB connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on Port : http://localhost:${PORT}`);
});
