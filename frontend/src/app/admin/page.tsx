'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, Skill } from '../../types';
import ModernCard from '../../components/ModernCard';
import GradientButton from '../../components/GradientButton';
import AnimatedSection from '../../components/AnimatedSection';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState({ title: '', description: '', techStack: '', image: null as File | null });
  const [skill, setSkill] = useState({ name: '', category: '' });

  if (status === 'loading') return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('techStack', project.techStack);
    if (project.image) formData.append('image', project.image);

    await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { Authorization: `Bearer ${(session.user as any).token}` },
      body: formData,
    });
    setProject({ title: '', description: '', techStack: '', image: null });
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(session.user as any).token}`,
      },
      body: JSON.stringify(skill),
    });
    setSkill({ name: '', category: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.3}>
          <ModernCard className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Add Project</h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={project.techStack}
                  onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                      <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          onChange={(e) => setProject({ ...project, image: e.target.files?.[0] || null })}
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
              <GradientButton type="submit" className="w-full mt-4">
                Add Project
              </GradientButton>
            </form>
          </ModernCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <ModernCard className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Add Skill</h2>
            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js"
                  value={skill.name}
                  onChange={(e) => setSkill({ ...skill, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={skill.category}
                  onChange={(e) => setSkill({ ...skill, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <GradientButton type="submit" className="w-full mt-4">
                Add Skill
              </GradientButton>
            </form>
          </ModernCard>
        </AnimatedSection>
      </div>
    </div>
  );
}