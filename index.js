const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.cnks4.mongodb.net/registrationFormDB`;

mongoose.connect(uri, {
  // No deprecated options included
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String // changed to lowercase
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// registration schema
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/pages/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Registration.findOne({ email: email });
    if (!existingUser) {
      const registrationData = new Registration({
        name,
        email,
        password
      });
      await registrationData.save();
      res.redirect("/success");
    } else {
      res.status(409).send("User already exists");
    }
  } catch (error) { // added error parameter
    console.log(error);
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/pages/success.html");
});

app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/pages/pages/error.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

