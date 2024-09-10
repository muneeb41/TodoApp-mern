const mongoose = require("mongoose");
require("dotenv").config();

// Connection URL
 const dbName = 'todoApp'
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.apgyudc.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

async function main() {
  try {
    await mongoose.connect(url);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
}

main();

