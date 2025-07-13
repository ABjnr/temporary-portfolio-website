import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

// Define Skill schema
const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,
});

// Initialize Mongoose models based on the defined schemas
const Skill = mongoose.model("Skill", SkillSchema);
// Connect to MongoDB
await mongoose.connect(dbUrl);

/*-----------------------------*/
/*       Skill Controllers      */
/*-----------------------------*/

// Retrieve all skills stored in the database
async function getSkills() {
  try {
    return await Skill.find({});
  } catch (error) {
    throw error;
  }
}

// Retrieve a single skill by its MongoDB _id
async function getSkillById(id) {
  try {
    let result = await Skill.findById(id);
    return result;
  } catch (error) {
    throw error;
  }
}

// Initialize the skills collection
async function initializeSkills() {
  try {
    const skills = [
      { name: "JavaScript", level: "Advanced" },
      { name: "HTML", level: "Intermediate" },
      { name: "CSS", level: "Intermediate" },
      { name: "Node.js", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
    ];

    const savedSkills = await Skill.insertMany(skills);
    return savedSkills;
  } catch (error) {
    throw error;
  }
}

// Add a new skill
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

// Update the proficiency level of a skill
async function updateSkillLevel(id, newLevel) {
  try {
    const result = await Skill.findByIdAndUpdate(id, {
      $set: { level: newLevel },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

// Delete a skill document by its id
async function deleteSkill(id) {
  try {
    return await Skill.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

export default {
  getSkills,
  initializeSkills,
  addSkill,
  updateSkillLevel,
  deleteSkill,
  getSkillById,
};
