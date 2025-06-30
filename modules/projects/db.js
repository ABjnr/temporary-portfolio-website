import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: String,
  githubLink: String,
  liveLink: String,
});
const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,
});

const Project = mongoose.model("Project", ProjectSchema);
const Skill = mongoose.model("Skill", SkillSchema);
await mongoose.connect(dbUrl);

// project controller
async function getProjects() {
  try {
    const result = await Project.find({});
    return result;
  } catch (error) {
    throw error;
  }
}

async function getProjectById(id) {
  return await Project.findById(id);
}

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

async function deleteProjectById(id) {
  try {
    const result = await Project.findByIdAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

// skill controllers
async function getSkills() {
  try {
    return await Skill.find({});
  } catch (error) {
    throw error;
  }
}

async function addSkill(skillName, skillLevel) {
  try {
    let addNewSkill = new Skill({
      name: String(skillName),
      level: String(skillLevel),
    });
    const addedSkill = await addNewSkill.save();
    return addedSkill;
  } catch (error) {
    throw error;
  }
}

async function updateSkillLevel(name, newLevel) {
  try {
    const result = await Skill.updateOne(
      { name: name },
      { $set: { level: newLevel } }
    );
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteSkill(name) {
  try {
    return await Skill.deleteOne({ name: name });
  } catch (error) {
    throw error;
  }
}

export default {
  getProjects,
  initializeProjects,
  addProject,
  updateProjectById,
  deleteProjectById,
  getProjectById,
  getSkills,
  addSkill,
  updateSkillLevel,
  deleteSkill,
};
