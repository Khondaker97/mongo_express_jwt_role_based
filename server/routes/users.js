const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
//db
const db = require("../db/conn");
const database = db.get("myProject");
const users = database.collection("users");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(11);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      password: hashedPass,
      email: req.body.email,
    };
    const result = await users.insertOne(user);

    //created successfully -> 201
    res.status(201).send(result);
  } catch (error) {
    //server doesn't know how to handle, so handle it accordingly
    res.status(500).send("Not successfull!");
  }
});

//login
router.post("/login", async (req, res) => {
  const user = await users.findOne({ email: req.body.email });

  if (user == null) {
    //bad req, invalid req but let not help hac.ker
    return res.status(401).send("Authentication Failed!");
  }
  try {
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      //generate token
      const accesstoken = jwt.sign(
        { userId: user._id, userName: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).send({
        access_token: accesstoken,
        msg: "Success!",
      });
    } else {
      //Not Acceptable
      res.status(406).send("Not allowed!");
    }
  } catch (error) {
    return res.status(401).send("Authentication Failed!");
  }
});

router.get("/users", async (req, res) => {
  // const database = db.get("myProject");
  // const users = database.collection("users");
  try {
    const result = await users.find({}).toArray();
    //req succeeded
    res.status(200).send(result);
  } catch (error) {
    //not found
    res.status(404).send("Not Found!");
  }
});
module.exports = router;
