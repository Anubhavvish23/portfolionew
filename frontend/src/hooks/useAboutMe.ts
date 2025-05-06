import { useState, useEffect } from 'react';
import { AboutMe } from '@/types';
import storageService from '@/services/storageService';

// Fallback data in case API fails
const fallbackAboutMe: AboutMe = {
  id: '1',
  headline: 'Full Stack Developer & UI/UX Enthusiast',
  bio: 'I am a passionate Full Stack Developer with experience building modern web applications. Specializing in React.js and Node.js, I create responsive, user-friendly interfaces and robust backend systems.',
  skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'UI/UX Design'],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University',
      year: '2015 - 2019',
      description: 'Focused on web technologies and software engineering'
    }
  ],
  experience: [
    {
      id: '1',
      position: 'Full Stack Developer',
      company: 'Tech Company',
      startDate: 'Jan 2020',
      current: true,
      description: 'Developing and maintaining web applications using modern technologies.'
    }
  ],
  interests: ['Web Development', 'Open Source', 'AI & Machine Learning'],
  profileImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useAboutMe = () => {
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutMe = async () => {
    setLoading(true);
    try {
      const data = await storageService.getAboutMe();
      if (data) {
        setAboutMe(data);
      } else {
        console.warn('No about me data received, using fallback data');
        setAboutMe(fallbackAboutMe);
      }
    } catch (err) {
      console.error('Error fetching about me:', err);
      setError('Failed to fetch about me data');
      // Use fallback data when API fails
      setAboutMe(fallbackAboutMe);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const saveAboutMe = async (aboutMeData: AboutMe) => {
    try {
      const saved = await storageService.saveAboutMe(aboutMeData);
      if (saved) {
        setAboutMe(saved);
      }
      return saved;
    } catch (err) {
      console.error('Error saving about me:', err);
      setError('Failed to save about me data');
      return null;
    }
  };

  return { aboutMe, loading, error, saveAboutMe };
}; 