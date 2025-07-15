import { Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Contact from '../models/Contact';
import { uploadMedia } from '../utils/cloudinary';
import { connectToDatabase } from '../lib/mongodb';
import { validateContact, validateProject, validateSkill } from '../utils/validators';

export const getProjects = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const project = await Project.findById(req.params.id);
    if (!project) {
       res.status(404).json({ message: 'Project not found' });
       return;
    }
    res.json(project);
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

export const addProject = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const { error } = validateProject(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    let image = '';
    if (req.file) {
      image = await uploadMedia(req.file);
    }

    const project = new Project({
      title,
      description,
      techStack: techStack.split(',').map((tech: string) => tech.trim()),
      image,
      githubUrl,
      liveUrl,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ message: 'Failed to add project' });
  }
};

export const updateProject = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const { error } = validateProject(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    let image = req.body.image;
    if (req.file) {
      image = await uploadMedia(req.file);
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        techStack: techStack.split(',').map((tech: string) => tech.trim()),
        image,
        githubUrl,
        liveUrl,
      },
      { new: true }
    );

    if (!project) {
       res.status(404).json({ message: 'Project not found' });
       return;
    }

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
       res.status(404).json({ message: 'Project not found' });
       return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

export const getSkills = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

export const addSkill = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const { error } = validateSkill(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return
    }

    const { name, category, proficiency } = req.body;
    const skill = new Skill({ name, category, proficiency });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ message: 'Failed to add skill' });
  }
};

export const updateSkill = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const { error } = validateSkill(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    const { name, category, proficiency } = req.body;
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, category, proficiency },
      { new: true }
    );

    if (!skill) {
       res.status(404).json({ message: 'Skill not found' });
       return;
    }

    res.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Failed to update skill' });
  }
};

export const deleteSkill = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
       res.status(404).json({ message: 'Skill not found' });
       return
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Failed to delete skill' });
  }
};

export const submitContact = async (req: Request, res: Response):Promise<void> => {
  try {
    await connectToDatabase();
    const { error } = validateContact(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
};