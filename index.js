const express = require("express");
const mongoose = require("mongoose");
const dotenv=require("dotenv")
const path = require("path");

const router = require("./routes/routes");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/blogs", router)

const mongoURI=process.env.MONGODB_URI

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Host:", mongoose.connection.host);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  }).catch((err) => console.error(err));

