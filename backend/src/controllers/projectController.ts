import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a project
// @route   POST /api/projects
// @access  Private/Admin
export const addProject = async (req: Request, res: Response) => {
  try {
    const { title, description, techStack, liveLink, githubLink, image, featured } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Please provide title, description, and image' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map((tech: string) => tech.trim()),
        liveLink,
        githubLink,
        image,
        featured: featured || false
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, liveLink, githubLink, image, featured } = req.body;

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title || project.title,
        description: description || project.description,
        techStack: techStack ? (Array.isArray(techStack) ? techStack : techStack.split(',').map((tech: string) => tech.trim())) : project.techStack,
        liveLink: liveLink || project.liveLink,
        githubLink: githubLink || project.githubLink,
        image: image || project.image,
        featured: featured !== undefined ? featured : project.featured
      }
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 