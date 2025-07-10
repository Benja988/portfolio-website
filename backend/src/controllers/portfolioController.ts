import { Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import { uploadMedia } from '../utils/cloudinary';
import { connectToDatabase } from '../lib/mongodb';

export const getProjects = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProject = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const { title, description, techStack } = req.body;
    let image = '';
    if (req.file) {
      image = await uploadMedia(req.file);
    }
    const project = new Project({ title, description, techStack, image });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSkills = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const { name, category } = req.body;
    const skill = new Skill({ name, category });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};