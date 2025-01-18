require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3002;
const url = process.env.MongoDBURI;

// Verify the MongoDB URI
console.log("MongoDB URI:", process.env.MongoDBURI); // This should print the URI correctly

const holdingsRoute = require("./routes/holdingsRoute");
const positionsRoute = require("./routes/positionsRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

app.use(cors());
app.use(bodyParser.json());

app.use("/holdings", holdingsRoute);
app.use("/positions", positionsRoute);
app.use("/user", userRoute);
app.use("/orders", orderRoute);

app.listen(port, async () => {
  console.log(`App Is listening On ${port}`);
  
  // If URI is undefined, log an error message.
  if (!url) {
    console.error("Error: MongoDB URI is undefined.");
    process.exit(1); // Exit if the connection URI is not loaded correctly
  }

  await mongoose.connect(url)
    .then(() => console.log("Connected To DB"))
    .catch(err => console.log("Database connection failed", err));
});
