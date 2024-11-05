const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../db/database");

router.post("/stud", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let hashedPassword = bcryptjs.hashSync(password, 10);
    const details = await db("students").insert({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log(details);
    return res.status(201).json(details);
  } catch (error) {
    return res.status(500).send("Error creating student");
  }
});

router.post("/loginForCourseList", async (req, res) => {
  try {
    const details = await db("courses").select("code", "name");
    console.log(details);
    return res.status(201).json(details);
  } catch (error) {
    return res.status(500).send("Error creating student");
  }
});

router.post("/loginForCourseRegistration", async (req, res) => {
  try {
    const { name, course_id } = req.body;
    const details = await db("students")
      .select("*")
      .where({ name: name })
      .first();
    console.log(details.email);
    if (details) {
      console.log(details);
      const [details2] = await db("studcourse").insert({
        email: details.email,
        course_id: course_id,
        student_id: details.id,
      });
      console.log(details2);
      return res.status(201).json(details2);
    } else {
      return res.status(404).send("Student not found");
    }
  } catch (error) {
    return res.status(500).send("Error creating student");
  }
});

module.exports = router;
