const express = require("express");
const db = require("../db/conn");
const router = express.Router();

// find all
router.get("/foods", async (req, res) => {
  const database = db.get("myProject");
  const foods = database.collection("foods");
  try {
    // const result = await foods.insertMany(
    //   [
    //     { name: "cake", healthy: false },
    //     { name: "lettuce", healthy: true },
    //     { name: "donut", healthy: false },
    //   ],
    //   { ordered: true }
    // );
    // console.log(`${result.insertedCount} documents were inserted`);

    const result = await foods.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
// find
router.get("/products", async (req, res) => {
  const database = db.get("myProject");
  const products = database.collection("products");
  try {
    // const result = await products.insertMany(
    //   [
    //     {
    //       item: "journal",
    //       tags: ["blank", "red"],
    //       instock: [
    //         { warehouse: "A", qty: 5 },
    //         { warehouse: "C", qty: 15 },
    //       ],
    //     },
    //     {
    //       item: "notebook",
    //       tags: ["red", "blank"],
    //       instock: [{ warehouse: "C", qty: 5 }],
    //     },
    //     {
    //       item: "paper",
    //       tags: ["red", "blank", "plain"],
    //       instock: [
    //         { warehouse: "A", qty: 60 },
    //         { warehouse: "B", qty: 15 },
    //       ],
    //     },
    //     {
    //       item: "planner",
    //       tags: ["blank", "red"],
    //       instock: [
    //         { warehouse: "A", qty: 40 },
    //         { warehouse: "B", qty: 5 },
    //       ],
    //     },
    //     {
    //       item: "postcard",
    //       tags: ["blue"],
    //       instock: [
    //         { warehouse: "B", qty: 15 },
    //         { warehouse: "C", qty: 35 },
    //       ],
    //     },
    //   ],
    //   { ordered: true }
    // );
    // console.log(`${result.insertedCount} documents were inserted`);

    //total 5 products
    const querytag = { tags: "red" }; // find all red tag , return -> 4
    const queryOrderedArray = { tags: ["red", "blank"] }; // find only red and blank tag in this order, -> 1
    const queryAllArray = { tags: { $all: ["red", "blank"] } }; // find all red and blank tag holder, -> 4
    const queryArrayLength = { tags: { $size: 3 } }; //$size operator matches array length,-> 1
    const queryArrOfObj = { instock: { warehouse: "A", qty: 5 } }; //instock is an array of obj,
    //so the obj need to match same order, otherwise won't get any. -> 1
    const queryArrObjProp = { "instock.qty": { $gte: 20 } }; //matches instock qty >= 20, -> 3
    const queryArrObj = { "instock.warehouse": "A" }; //matches instock warahouse A, -> 3
    const queryArrMulti = {
      instock: { $elemMatch: { warehouse: "A", qty: { $gte: 20 } } },
    }; //$elemMatch operator matches multiple criteria on an array. Instock warahouse A, qty >=20, -> 2
    const queryRange = { "instock.qty": { $gt: 10, $lte: 20 } }; //matches any qty field instock array within a range, -> 4
    //query = {"instock.warehouse": "A"}, options = { projection: { item: 1, "instock.qty": 1, _id: 0 } }; // query, options => return only projection field, no id
    // $slice: 1-> only match obj from instock arr, $slice: -1 -> returns all other than match obj
    const result = await products
      .find(
        { "instock.warehouse": "A" },
        { projection: { item: 1, instock: { $slice: 1 }, _id: 0 } }
      )
      .toArray();
    if ((await result.count()) === 0) {
      console.log("No documents found!");
    }
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
//update -> patch
router.patch("/students", async (req, res) => {
  const database = db.get("myProject");
  const students = database.collection("students");
  try {
    // const result = await students.insertMany([
    //   { _id: 6308, name: "B. Batlock", assignment: 3, points: 22 },
    //   { _id: 6312, name: "M. Tagnum", assignment: 5, points: 30 },
    //   { _id: 6319, name: "R. Stiles", assignment: 2, points: 12 },
    //   { _id: 6322, name: "A. MacDyver", assignment: 2, points: 14 },
    //   { _id: 6234, name: "R. Stiles", assignment: 1, points: 10 },
    // ]);
    // console.log(`${result.insertedCount} documents were inserted`);
    const result = await students.findOneAndUpdate(
      { _id: 6234 }, //query
      {
        $set: { name: "D. Beckham" },
        $currentDate: { lastModified: true },
      }
    );
    res.json({ mgs: result.ok });
  } catch (error) {
    console.log(error);
  }
});
//delete
router.delete("/students", async (req, res) => {
  const database = db.get("myProject");
  const students = database.collection("students");
  try {
    const result = await students.findOneAndDelete(
      { _id: 6234 } //query
    );
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
