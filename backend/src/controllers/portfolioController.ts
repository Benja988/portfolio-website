import { Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import { uploadMedia } from '../utils/cloudinary';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProject = async (req: Request, res: Response) => {
  try {
    const { title, description, techStack } = req.body;
    let image = '';
    if (req.file) {
      image = await uploadMedia(req.file);
    }
    const project = new Project({ title, description, techStack, image });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;
    const skill = new Skill({ name, category });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};