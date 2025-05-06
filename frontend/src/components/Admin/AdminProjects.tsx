import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const AdminProjects: React.FC = () => {
  const { projects = [], loading, error, addProject, updateProject, deleteProject, refetch } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    image: '',
    featured: false,
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      techStack: '',
      liveLink: '',
      githubLink: '',
      image: '',
      featured: false,
    });
    setCurrentProject(null);
    setIsEditing(false);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      image: project.image,
      featured: project.featured || false,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.techStack || !formData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const projectData: Project = {
        id: formData.id || `project-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(',').map(tech => tech.trim()),
        liveLink: formData.liveLink || undefined,
        githubLink: formData.githubLink || undefined,
        image: formData.image,
        featured: formData.featured,
        createdAt: currentProject?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let success = false;
      if (isEditing && currentProject) {
        success = await updateProject(projectData);
      } else {
        success = await addProject(projectData);
      }

      if (success) {
        resetForm();
        await refetch();
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const success = await deleteProject(id);
        if (success) {
          await refetch();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading projects: {error}
        <button 
          onClick={() => refetch()}
          className="ml-4 px-4 py-2 bg-purple-light text-white rounded hover:bg-purple-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:w-2/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {loading ? 'Loading Projects...' : projects.length > 0 ? 'All Projects' : 'No Projects Yet'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {!loading && projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-purple-light text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg truncate">{project.title}</h3>
                    <p className="text-xs text-foreground/60 mt-1">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-1 my-3">
                      {Array.isArray(project.techStack) && project.techStack.map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 glass">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-sm text-purple-light hover:text-neon-blue transition-colors"
                        disabled={isSubmitting}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-sm text-red-400 hover:text-red-500 transition-colors"
                        disabled={isSubmitting}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="col-span-2 text-center py-12">
                Loading projects...
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <form onSubmit={handleSubmit} className="glass-card p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Project title"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="Project description"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="techStack" className="block text-sm font-medium mb-1">
                Tech Stack * (comma separated)
              </label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="liveLink" className="block text-sm font-medium mb-1">
                Live Link (optional)
              </label>
              <input
                type="url"
                id="liveLink"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="githubLink" className="block text-sm font-medium mb-1">
                GitHub Link (optional)
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full glass bg-transparent border-0 border-b border-foreground/10 px-4 py-2 focus:outline-none focus:ring-0 focus:border-purple-light transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  disabled={isSubmitting}
                  className="rounded-sm text-purple-light focus:ring-0 focus:ring-offset-0 border-foreground/30 bg-transparent"
                />
                <span className="text-sm">Featured Project</span>
              </label>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-4 py-2 glass hover:bg-foreground/10 transition-all disabled:opacity-50"
              >
                {isEditing ? 'Cancel' : 'Reset'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 glass hover:bg-purple-dark/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProjects;
