'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, Skill } from '../../types';
import ModernCard from '../../components/ModernCard';
import GradientButton from '../../components/GradientButton';
import AnimatedSection from '../../components/AnimatedSection';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: null as File | null });
  const [skill, setSkill] = useState({ name: '', category: '', proficiency: '' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetchProjects();
      fetchSkills();
    }
  }, [session]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${(session?.user as any).token}` },
      });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        headers: { Authorization: `Bearer ${(session?.user as any).token}` },
      });
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      setError('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

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
    setError(null);
    setLoading(true);
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('techStack', project.techStack);
    formData.append('githubUrl', project.githubUrl);
    formData.append('liveUrl', project.liveUrl);
    if (project.image) formData.append('image', project.image);

    try {
      const url = editingProject 
        ? `http://localhost:5000/api/projects/${editingProject._id}`
        : 'http://localhost:5000/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${(session.user as any).token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save project');
      }

      await fetchProjects();
      setProject({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: null });
      setEditingProject(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const url = editingSkill 
        ? `http://localhost:5000/api/skills/${editingSkill._id}`
        : 'http://localhost:5000/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session.user as any).token}`,
        },
        body: JSON.stringify(skill),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save skill');
      }

      await fetchSkills();
      setSkill({ name: '', category: '', proficiency: '' });
      setEditingSkill(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${(session.user as any).token}` },
      });

      if (!res.ok) throw new Error('Failed to delete project');
      await fetchProjects();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${(session.user as any).token}` },
      });

      if (!res.ok) throw new Error('Failed to delete skill');
      await fetchSkills();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProject({
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack.join(', '),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      image: null,
    });
  };

  const handleEditSkill = (sk: Skill) => {
    setEditingSkill(sk);
    setSkill({
      name: sk.name,
      category: sk.category,
      proficiency: sk.proficiency?.toString() || '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedSection delay={0.3}>
          <ModernCard className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              {editingProject ? 'Edit Project' : 'Add Project'}
            </h2>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={project.githubUrl}
                  onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://project-url.com"
                  value={project.liveUrl}
                  onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
              <div className="flex space-x-4">
                <GradientButton type="submit" className="w-full mt-4" disabled={loading}>
                  {editingProject ? 'Update Project' : 'Add Project'}
                </GradientButton>
                {editingProject && (
                  <GradientButton
                    type="button"
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-700"
                    onClick={() => {
                      setEditingProject(null);
                      setProject({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: null });
                    }}
                  >
                    Cancel
                  </GradientButton>
                )}
              </div>
            </form>
          </ModernCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <ModernCard className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proficiency (0-100)</label>
                <input
                  type="number"
                  placeholder="e.g. 80"
                  value={skill.proficiency}
                  onChange={(e) => setSkill({ ...skill, proficiency: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex space-x-4">
                <GradientButton type="submit" className="w-full mt-4" disabled={loading}>
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </GradientButton>
                {editingSkill && (
                  <GradientButton
                    type="button"
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-700"
                    onClick={() => {
                      setEditingSkill(null);
                      setSkill({ name: '', category: '', proficiency: '' });
                    }}
                  >
                    Cancel
                  </GradientButton>
                )}
              </div>
            </form>
          </ModernCard>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.5}>
        <ModernCard className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Manage Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj._id} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{proj.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{proj.description.substring(0, 100)}...</p>
                  </div>
                  <div className="flex space-x-2">
                    <GradientButton onClick={() => handleEditProject(proj)} className="px-4 py-2">
                      Edit
                    </GradientButton>
                    <GradientButton
                      onClick={() => handleDeleteProject(proj._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700"
                      disabled={loading}
                    >
                      Delete
                    </GradientButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModernCard>
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <ModernCard className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Manage Skills</h2>
          {skills.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No skills found.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((sk) => (
                <div key={sk._id} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{sk.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{sk.category} {sk.proficiency && `(${sk.proficiency}%)`}</p>
                  </div>
                  <div className="flex space-x-2">
                    <GradientButton onClick={() => handleEditSkill(sk)} className="px-4 py-2">
                      Edit
                    </GradientButton>
                    <GradientButton
                      onClick={() => handleDeleteSkill(sk._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700"
                      disabled={loading}
                    >
                      Delete
                    </GradientButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModernCard>
      </AnimatedSection>
    </div>
  );
}