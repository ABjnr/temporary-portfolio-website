import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,
});
const Skill = mongoose.model("Skill", SkillSchema);
await mongoose.connect(dbUrl);

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
  getSkills,
  addSkill,
  updateSkillLevel,
  deleteSkill,
};
