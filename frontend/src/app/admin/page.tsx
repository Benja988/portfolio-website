"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useSkills } from '@/hooks/useSkills';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useEffect } from 'react';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { AddProjectForm } from '@/components/admin/AddProjectForm';
import { AddSkillForm } from '@/components/admin/AddSkillForm';
import { ProjectsList } from '@/components/admin/ProjectsList';
import { SkillsList } from '@/components/admin/SkillsList';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const {
    projects,
    projectForm,
    editingProject,
    loading: projectsLoading,
    error: projectsError,
    handleProjectSubmit,
    handleDeleteProject,
    handleEditProject,
    setEditingProject,
    setProjectForm,
    fetchProjects
  } = useProjects();
  
  const {
    skills,
    skillForm,
    editingSkill,
    loading: skillsLoading,
    error: skillsError,
    handleSkillSubmit,
    handleDeleteSkill,
    handleEditSkill,
    setEditingSkill,
    setSkillForm,
    fetchSkills
  } = useSkills();

  useEffect(() => {
    if (session) {
      fetchProjects();
      fetchSkills();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
     
      <DashboardHeader title="Admin Dashboard" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AddProjectForm
          formData={projectForm}
          editingProject={!!editingProject}
          loading={projectsLoading}
          error={projectsError}
          onSubmit={handleProjectSubmit}
          onCancel={() => {
            setEditingProject(null);
            setProjectForm({
              title: '',
              description: '',
              techStack: '',
              githubUrl: '',
              liveUrl: '',
              image: null
            });
          }}
          onChange={setProjectForm}
        />
        
        <AddSkillForm
          formData={skillForm}
          editingSkill={!!editingSkill}
          loading={skillsLoading}
          error={skillsError}
          onSubmit={handleSkillSubmit}
          onCancel={() => {
            setEditingSkill(null);
            setSkillForm({
              name: '',
              category: '',
              proficiency: ''
            });
          }}
          onChange={setSkillForm}
        />
      </div>
      
      <div className="space-y-8">
        <ProjectsList
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          loading={projectsLoading}
        />
        
        <SkillsList
          skills={skills}
          onEdit={handleEditSkill}
          onDelete={handleDeleteSkill}
          loading={skillsLoading}
        />
      </div>
    </div>
  );
}