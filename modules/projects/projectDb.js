import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

// Define Project schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: String,
  githubLink: String,
  liveLink: String,
});

// Initialize Mongoose models based on the defined schemas
const Project = mongoose.model("Project", ProjectSchema);
// Connect to MongoDB
await mongoose.connect(dbUrl);

/*-----------------------------*/
/*      Project Controllers     */
/*-----------------------------*/

// Retrieve all projects from the database
async function getProjects() {
  try {
    const result = await Project.find({});
    return result;
  } catch (error) {
    throw error;
  }
}

// Retrieve a single project by its MongoDB _id
async function getProjectById(id) {
  try {
    let result = await Project.findById(id);
    return result;
  } catch (error) {
    throw error;
  }
}

// Initialize the projects collection with a default portfolio project
async function initializeProjects() {
  try {
    let newProject = new Project({
      title: "Portfolio Website",
      description: "My personal developer portfolio",
      technologies: "HTML, CSS, JavaScript, Node.js",
      githubLink: "",
      liveLink: "",
    });
    const savedProject = await newProject.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
}

// Add a new project to the database
async function addProject(
  projectTitle,
  projectDesc,
  projectTechnologies,
  projectGitLink,
  projectLiveLink
) {
  try {
    let addNewProject = new Project({
      title: String(projectTitle),
      description: String(projectDesc),
      technologies: String(projectTechnologies),
      githubLink: String(projectGitLink),
      liveLink: String(projectLiveLink),
    });
    const savedProject = await addNewProject.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
}

// Update fields of an existing project identified by its _id
async function updateProjectById(id, updateFields) {
  try {
    const result = await Project.findByIdAndUpdate(id, {
      $set: updateFields,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

// Delete a project by its _id
async function deleteProjectById(id) {
  try {
    const result = await Project.findByIdAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

// Export controller methods
export default {
  getProjects,
  initializeProjects,
  addProject,
  updateProjectById,
  deleteProjectById,
  getProjectById,
};
