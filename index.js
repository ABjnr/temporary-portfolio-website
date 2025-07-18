import "dotenv/config";
import express from "express";
import path from "path";

// Get the current directory name (ESM compatible)
const __dirname = import.meta.dirname;
const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set

// Set up view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
// for JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Import and mount admin router handling project and skill management routes under /admin
import skillRouter from "./modules/skills/skillsRouter.js";
import projectRouter from "./modules/projects/projectRouter.js";

import skillApiRouter from "./modules/allApi/skillApi.js";
import projectApiRouter from "./modules/allApi/projectApi.js";
app.use("/admin", skillRouter);
app.use("/admin", projectRouter);
app.use("/api", skillApiRouter);
app.use("/api", projectApiRouter);

app.get("/", (req, res) => {
  res.redirect("/admin/project");
});

app.get("/api", (req, res) => {
  res.redirect("/api/projects");
});

 // Start the server and listen on configured port
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`Listening on http://localhost:${PORT}`);
});
