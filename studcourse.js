const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const db = require("../db/database");
router.get("/studDetails", async (req, res) => {
  try {
    const course_id = req.body.course_id;
    const details = await db("studcourse")
      .join("students as s", "studcourse.student_id", "s.id")
      .join("courses as c", "studcourse.course_id", "c.id")
      .select("s.name as studentName", "c.name as course", " c.id as course_id")
      .where({ course_id: course_id });
    return res.status(201).json(details);
  } catch (error) {
    return res.status(500).send("Error creating student");
  }
});
router.post("/studcourse", async (req, res) => {
  try {
    // const { name, course_id } = req.body;
    const { course_id } = req.body;

    const details1 = await db("studcourse")
      .select("*")
      //   .groupBy("course_id")
      .where({ course_id: course_id });
    //   .orderBy("course_id", "desc");
    console.log(details1);
    return res.status(201).json(details1);
  } catch (error) {
    return res.status(500).send("Error creating student");
  }

  // const courseDetails = await db("courses").where({ id: course_id });
  // const details = await db("studcourse")
  //   .where({ course_id: course_id })
  //   .count("* as total")
  //   .groupBy("course_id");
  // const studDetails = await db("students").where({ name: name }).first();

  // const details2 = await db("studcourse").insert({
  //   email: studDetails.email,
  //   course_id: courseDetails.id,
  //   student_id: studDetails.id,
  // });
  // console.log(details[0].total);
});
router.post("/scdep", async (req, res) => {
  const { student_id, course_id } = req.body;
  if (course_id === 1 || course_id === 2 || course_id === 4) {
    const details2 = await db("stuCourseDep").insert({
      course_id: course_id,
      student_id: student_id,
      dep_id: 1,
    });
    return res.json({ msg: "dep is 1" });
  } else if (course_id === 3) {
    const details2 = await db("stuCourseDep").insert({
      course_id: course_id,
      student_id: student_id,
      dep_id: 2,
    });
    return res.json({ msg: "dep is 2" });
  } else if (course_id === 5) {
    const details2 = await db("stuCourseDep").insert({
      course_id: course_id,
      student_id: student_id,
      dep_id: 3,
    });
    return res.json({ msg: "dep is 3" });
  } else if (course_id === 6) {
    const details2 = await db("stuCourseDep").insert({
      course_id: course_id,
      student_id: student_id,
      dep_id: 4,
    });
    return res.json({ msg: "dep is 4" });
  } else {
    return res.json({ msg: "no dep" });
  }
});

router.get("/details", async (req, res) => {
  try {
    const id = req.body.id;
    const joinin = await db("stuCourseDep as st")
      .join("students as s", "s.id", "st.student_id")
      .join("courses as c", "c.id", "st.course_id")
      .join("dep as d", "d.id", "st.dep_id")
      .select("s.name as studentName", "c.name as course")
      .where("s.id", id)
      .groupBy("s.name", "c.name", "c.id");
    console.log(joinin);
    return res.json({ msg: joinin });
  } catch (e) {
    return res.json({ msg: e });
  }
});

module.exports = router;
