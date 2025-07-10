import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
}

const SkillSchema: Schema<ISkill> = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  category: { type: String, required: [true, 'Category is required'] },
});

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;