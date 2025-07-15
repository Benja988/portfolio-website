import Joi from 'joi';

export const validateProject = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    techStack: Joi.string().required(),
    githubUrl: Joi.string().uri().optional().allow(''),
    liveUrl: Joi.string().uri().optional().allow(''),
    image: Joi.string().optional().allow(''),
  });
  return schema.validate(data);
};

export const validateSkill = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().min(2).max(50).required(),
    proficiency: Joi.number().min(0).max(100).optional(),
  });
  return schema.validate(data);
};

export const validateContact = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).max(1000).required(),
  });
  return schema.validate(data);
};