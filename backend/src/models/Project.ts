import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string;
  image: string;
}

const ProjectSchema: Schema<IProject> = new Schema({
  title: { type: String, required: [true, 'Title is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  techStack: { type: String, required: [true, 'Tech stack is required'] },
  image: { type: String },
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;