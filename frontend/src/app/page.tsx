'use client';

import { useEffect, useState } from 'react';
import { Project, Skill } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import CertificationsSection from '../components/sections/CertificationsSection';
import ContactSection from '../components/sections/ContactSection';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/skills')
        ]);
        
        setProjects(await projectsRes.json());
        setSkills(await skillsRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white dark:bg-gray-900">
     
      <HeroSection />
      
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection>
        <SkillsSection skillsByCategory={skillsByCategory} />
      </AnimatedSection>

      <AnimatedSection>
        <ProjectsSection projects={projects} />
      </AnimatedSection>

      <AnimatedSection>
        <ExperienceSection />
      </AnimatedSection>

      <AnimatedSection>
        <CertificationsSection />
      </AnimatedSection>

      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>
    </div>
  );
}