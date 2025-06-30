import express from "express";
const router = express.Router();

import skillsDb from "./db.js";

router.get("/", async (req, res) => {
  try {
    let skills = await skillsDb.getSkills();
    res.render("skills", { skills: skills });
  } catch (error) {
    console.log("error message: ", error);
  }
});

router.get("/add", (req, res) => {
  res.render("addSkill");
});
router.post("/add", async (req, res) => {
  try {
    const { skillName, skillLevel } = req.body;
    await skillsDb.addSkill(skillName, skillLevel);
    res.redirect("/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to add skill");
  }
});

router.get("/update", (req, res) => {
  const { name } = req.query;
  res.render("updateSkill", { name: name });
});
router.post("/update", async (req, res) => {
  try {
    const { name, newLevel } = req.body;
    await skillsDb.updateSkillLevel(name, newLevel);
    res.redirect("/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to update skill");
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { name } = req.body;
    await skillsDb.deleteSkill(name);
    res.redirect("/skill");
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).send("Failed to delete skill");
  }
});

export default router;
