const express = require("express");
const router = express.Router();
const db = require("../db/database");
router.post("/courses", async (req, res) => {
  try {
    const details = await db("courses").insert(req.body);
    console.log(details);
    return res.status(201).json(details);
  } catch (error) {
    return res.status(500).send("Error creating student");
  }
});
module.exports = router;
