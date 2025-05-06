import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types';
import storageService from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await storageService.getProjects();
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Project): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedProjects = await storageService.addProject(project);
      if (Array.isArray(updatedProjects)) {
        setProjects(updatedProjects);
        toast({
          title: "Success",
          description: "Project added successfully",
        });
        return true;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Error adding project:', err);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (project: Project): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedProjects = await storageService.updateProject(project);
      if (Array.isArray(updatedProjects)) {
        setProjects(updatedProjects);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
        return true;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Error updating project:', err);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedProjects = await storageService.deleteProject(id);
      if (Array.isArray(updatedProjects)) {
        setProjects(updatedProjects);
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        return true;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}; 