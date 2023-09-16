const express = require("express");
const app = express();
const promiseData = require("./mongoDbConnection_2");
const { createReadStream } = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "images");
const multer = require("multer");

// _id solving problem
const mongoose = require("mongoose");

// middelware for In the above code, the cors middleware is used by calling app.use(cors()).
//  This enables CORS for all routes, allowing requests from any domain.
const cors = require("cors");

app.use(cors());

// Define your routes and other middleware

// Middleware to upload image file
const upload = multer({ dest: dirPath });

app.use(express.json()); // Parse JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.get("/", async (req, res) => {
  let data = await promiseData();
  data = await data.find({}).toArray();
  res.send(data);
});

app.post("/post", upload.single("image"), async (req, res) => {
  let data = await promiseData();

  let { name, category, price, description } = req.body;
  let image = req.file;

  if (!image) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  // Image file upload stored in destination
  const imagePath = image.path;

  // Create a read stream for the image file
  const imageStream = createReadStream(imagePath);

  let imageBuffer = Buffer.alloc(0);

  // Read the image file in chunks and append to the buffer
  imageStream.on("data", (chunk) => {
    imageBuffer = Buffer.concat([imageBuffer, chunk]);
  });

  // Handle the end event when reading is complete
  imageStream.on("end", async () => {
    // Convert the image buffer to Base64
    const imageBase64 = imageBuffer.toString("base64");

    // Access the uploaded image and other fields
    console.log("Uploaded image:", image);
    console.log("Name:", name);
    console.log("Category:", category);
    console.log("Price:", price);
    console.log("Description:", description);

    // Create the document to insert into the database
    const dataToInsert = {
      image: imageBase64,
      name: name,
      category: category,
      price: price,
      description: description,
    };

    try {
      // Insert the document into the database
      const result = await data.insertOne(dataToInsert);
      res.send(dataToInsert);
    } catch (error) {
      console.error("Failed to insert document:", error);
      res.status(500).json({ error: "Failed to insert document" });
    }
  });

  // Handle any error during reading
  imageStream.on("error", (error) => {
    console.error("Error reading image file:", error);
    res.status(500).json({ error: "Failed to read image file" });
  });
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

app.listen(5000);
