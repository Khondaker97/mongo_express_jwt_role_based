const express = require("express");
const cors = require("cors");
const { MongoServerError } = require("mongodb");
require("dotenv").config();
const db = require("./db/conn");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
//testing
app.get("/", (req, res) => {
  res.send("HEY, WHO ARE YOU?");
});
//routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);

//connect to the server
async function main() {
  try {
    await db.connect();
    console.log("Connected successfully to server");
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    console.log(error);
  }
}
main();

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
