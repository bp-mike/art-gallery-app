const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");

const app = express();

//import routes
const imagesRoute = require("./routes/imagesRoute");
const authRoute = require("./routes/auth");

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/images", imagesRoute);
app.use("/user", authRoute);

app.use(express.json());

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected");
});

app.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
