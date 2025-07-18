import express from "express";
const router = express.Router();

import db from "../skills/skillsDb.js";

// Get all skills (API)
router.get("/skills", async (req, res) => {
  try {
    const skills = await db.getSkills();
    res.json({ skills: skills });
  } catch (error) {
    console.error("API error (get all skills):", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Get a single skill by ID (API)
router.get("/skills/:id", async (req, res) => {
  try {
    const skill = await db.getSkillById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json({ skills: skill });
  } catch (error) {
    console.error("API error (get skill by id):", error);
    res.status(500).json({ error: "Failed to fetch skill" });
  }
});

// Create a new skill (API)
router.post("/skills/add", async (req, res) => {
  try {
    const { name, level } = req.body;
    if (!name || !level) {
      return res.status(400).json({ error: "Name and level are required" });
    }
    const newSkill = await db.addSkill(name, level);
    res
      .status(201)
      .json({ message: "Skill added successfully", skill: newSkill });
  } catch (error) {
    console.error("API error (create skill):", error);
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// Update a skill by ID (API)
router.put("/skills/update/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const { name, level } = req.body;
    const updateFields = { name: name, level: level };

    const updated = await db.updateSkillById(reqId, updateFields);
    if (!updated) {
      return res
        .status(404)
        .json({ error: "Skill not found or update method missing" });
    }
    res.json({ skill: updated });
  } catch (error) {
    console.error("API error (update skill):", error);
    res.status(500).json({ error: "Failed to update skill" });
  }
});

// Delete a skill by ID (API)
router.delete("/skills/delete/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const deleted = await db.deleteSkill(reqId);
    if (!deleted) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("API error (delete skill):", error);
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

export default router;
