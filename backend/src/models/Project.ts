import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model('Project', ProjectSchema);