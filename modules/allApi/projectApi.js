import express from "express";
const router = express.Router();

import db from "../projects/projectDb.js";

/*--------------------------------
    API Endpoints for Projects
  --------------------------------*/

// Get all projects (API)
router.get("/projects", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json(projects);
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
    res.json(project);
  } catch (error) {
    console.error("API error (get project by id):", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create a new project (API)
router.post("/projects/add", async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
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
    res.status(201).json(newProject);
  } catch (error) {
    console.error("API error (create project):", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update a project by ID (API)
router.put("/projects/update/:id", async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    const updateFields = {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
    };
    const updated = await db.updateProjectById(req.params.id, updateFields);
    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("API error (update project):", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project by ID (API)
router.delete("/projects/delete/:id", async (req, res) => {
  try {
    const deleted = await db.deleteProjectById(req.params.id);
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
