import express from "express";
const router = express.Router();

import db from "./skillsDb.js";

/*--------------------------------
  Skill Routes
--------------------------------*/

// Get all skills
router.get("/skill", async (req, res) => {
  try {
    let skills = await db.getSkills();
    if (!skills.length) {
      await db.initializeSkills();
      skills = await db.getSkills();
    }
    res.render("skills", { skills: skills });
  } catch (error) {
    console.log("error message: ", error);
  }
});

// Render form to add a new skill
router.get("/skill/add", (req, res) => {
  res.render("addSkill");
});
// Handle new skill creation
router.post("/skill/add", async (req, res) => {
  try {
    const { skillName, skillLevel } = req.body;
    await db.addSkill(skillName, skillLevel);
    res.redirect("/admin/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to add skill");
  }
});

// Render update form with existing skill data for given id
router.get("/skill/update", async (req, res) => {
  const { id } = req.query;
  try {
    const skill = await db.getSkillById(id);
    res.render("updateSkill", { skill: skill });
  } catch (error) {
    console.log("Error fetching skill:", error);
    res.status(500).send("Failed to load skill");
  }
});
// Handle skill level update from submitted form data
router.post("/skill/update", async (req, res) => {
  try {
    const { id, newLevel } = req.body;
    await db.updateSkillLevel(id, newLevel);
    res.redirect("/admin/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to update skill");
  }
});

// Delete skill by id
router.post("/skill/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await db.deleteSkill(id);
    res.redirect("/admin/skill");
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).send("Failed to delete skill");
  }
});

export default router;