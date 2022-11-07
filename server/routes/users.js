const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
//db
const db = require("../db/conn");
const {
  generateAccessToken,
  authenticateToken,
} = require("../middlewares/authenticate");
const database = db.get("myProject");
const users = database.collection("users");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(11);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.fullName,
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
      const validUser = { userId: user._id, userName: user.name };
      //generate token
      const accessToken = generateAccessToken(validUser);
      const refreshToken = jwt.sign(
        validUser,
        process.env.REFRESH_TOKEN_SECRET
      );
      await users.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            refreshToken: refreshToken,
          },
        }
      );
      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
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
  try {
    const result = await users.find({}).toArray();
    //req succeeded
    res.status(200).send(result);
  } catch (error) {
    //not found
    res.status(404).send("Not Found!");
  }
});
router.get("/user", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await users.findOne({ _id: userId });
    //req succeeded
    res.status(200).send(result);
  } catch (error) {
    //not found
    res.status(404).send("Not Found!");
  }
});
router.post("/token", async (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401);
  const found = await users.findOne({ refreshToken: token });
  if (!found) res.sendStatus(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    console.log(user); //user = decoded
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
  });
});
router.delete("/logout", async (req, res) => {
  try {
    await users.findOneAndUpdate(
      { refreshToken: req.body.token },
      {
        $set: {
          refreshToken: "",
        },
      }
    );
    //successfully deleted
    res.status(204).send("Deleted!");
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
