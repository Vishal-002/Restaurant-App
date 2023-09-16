const express = require("express");
const app = express();
const promiseData = require("./Registration&LoginMongoConn");
// const { createReadStream } = require("fs");
// const path = require("path");
// const dirPath = path.join(__dirname, "images");
// const multer = require("multer");

// _id solving problem
const mongoose = require("mongoose");

// middelware for In the above code, the cors middleware is used by calling app.use(cors()).
//  This enables CORS for all routes, allowing requests from any domain.
const cors = require("cors");

app.use(cors());

// Define your routes and other middleware

// Middleware to upload image file
// const upload = multer({ dest: dirPath });

app.use(express.json()); // Parse JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.get("/", async (req, res) => {
  let data = await promiseData();
  data = await data.find({}).toArray();
  res.send(data);
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  let data = await promiseData();
  let result = await data.insertOne(req.body);
  res.send(result);
});

app.post("/login", async (req, res) => {
  let data = await promiseData();
  // console.log(data);

  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await data.findOne({ email, password });
  console.log("user");
  console.log(user);

  if (user) {
    res
      .status(200)
      .json({ message: "Login successful!", userType: user.userType });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

app.put("/", async (req, res) => {
  let data = await promiseData();

  console.log(req.body);

  let result = await data.updateOne(
    {
      name: req.body.name,
    },
    { $set: { price: "50 Rs." } }
  );

  res.send(result);
});

// If user send any kind of data by using that we can delete that data from database

app.delete("/:id", async (req, res) => {
  let data = await promiseData();

  //   console.log("ID : ");
  //   console.log(req.params.id);

  let result = await data.deleteOne({
    _id: new mongoose.Types.ObjectId(req.params.id),
  });
  res.send(result);
});

app.listen(7000);
