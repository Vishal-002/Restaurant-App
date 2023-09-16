const mongoose = require("mongoose");
const fs = require("fs");

async function connectAndInsertDocument() {
  try {
    const url = "mongodb://127.0.0.1:27017/MenuDB";
    // const dbName = "MenuDB";
    const imagePath = "img.jpg";
    const imageBuffer = fs.readFileSync(imagePath);
    console.log(imageBuffer);

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to the MongoDB database
    const Client = await mongoose.connect(url, options);
    console.log("Connected to MongoDB");

    // Get the database and collection
    // const db = await Client.db(dbName);
    // const Collection = await db.collection("MenuCollection");
    const db = Client.connection.db;

    const Collection = db.collection("MenuCollection");

    const name = "Maggi";
    const category = "breakfast";
    const price = "12 Rs.";
    const description =
      "I love Maggi really oo yes Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere omnis sequi maxime atque dolor nam iure ex maiores deserunt perferendis, perspiciatis unde enim dignissimos quibusdam dolorem cupiditate aspernatur animi fugiat!";

    const document = {
      image: imageBuffer,
      name: name,
      category: category,
      price: price,
      description: description,
    };

    // Insert the document
    // const result = await Collection.insertOne(document);
    // console.log("Document inserted successfully:", result);

    // console.log(Collection);

    // find operation on collection
    let response = await Collection.find({}).toArray();
    // console.log(response[0].name);
    // console.log(response);

    return Collection;

    // Close the connection when finished
    Client.disconnect();
  } catch (error) {
    console.error("Failed to connect to MongoDB or insert document:", error);
  }
}

module.exports = connectAndInsertDocument;
