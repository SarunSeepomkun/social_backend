//Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./route/userRoute");
const postRoutes = require("./route/postRoute");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Config
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB = process.env.MONGODB_CONNECTION;

//API document generator
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "iPeach - Social backend API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./route/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/user", userRoute);
app.use("/post", postRoutes);

//MongoDB Connection
mongoose.connect(
  MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`MongoDB connected`);
  }
);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port : http://localhost:${PORT}`);
});
