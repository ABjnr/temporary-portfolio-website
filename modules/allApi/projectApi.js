import express from "express";
const router = express.Router();

import db from "../projects/projectDb.js";

// Get all projects (API)
router.get("/projects", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json({ projects: projects });
  } catch (error) {
    console.error("API error (get all projects):", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get a single project by ID (API)
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ project: project });
  } catch (error) {
    console.error("API error (get project by id):", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create a new project (API)
router.post("/projects/add", async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    console.log(req.body);
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    const newProject = await db.addProject(
      title,
      description,
      technologies,
      githubLink,
      liveLink
    );
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    console.error("API error (create project):", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update a project by ID (API)
router.put("/projects/update/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const { title, description, technologies, githubLink, liveLink } = req.body;
    const updateFields = {
      title: title,
      description: description,
      technologies: technologies,
      githubLink: githubLink,
      liveLink: liveLink,
    };
    const updated = await db.updateProjectById(reqId, updateFields);
    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }
    console.log(updated);
    res.json({ message: "Project updated successfully", update: updated });
  } catch (error) {
    console.error("API error (update project):", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project by ID (API)
router.delete("/projects/delete/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const deleted = await db.deleteProjectById(reqId);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("API error (delete project):", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
