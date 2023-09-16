const mongoose = require("mongoose");
// const fs = require("fs");

async function connectAndInsertDocument() {
  try {
    const url = "mongodb://127.0.0.1:27017/MenuDB";

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

    const Collection = db.collection("UserCollection");

    return Collection;

    // Close the connection when finished
    Client.disconnect();
  } catch (error) {
    console.error("Failed to connect to MongoDB or insert document:", error);
  }
}

module.exports = connectAndInsertDocument;
