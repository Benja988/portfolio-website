import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState({ title: '', description: '', techStack: '', image: '' });
  const [skill, setSkill] = useState({ name: '', category: '' });

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('techStack', project.techStack);
    formData.append('image', project.image);

    await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    });
    setProject({ title: '', description: '', techStack: '', image: '' });
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill),
    });
    setSkill({ name: '', category: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Project</h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Tech Stack"
              value={project.techStack}
              onChange={(e) => setProject({ ...project, techStack: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              onChange={(e) => setProject({ ...project, image: e.target.files?.[0] as any })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Project
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Skill</h2>
          <form onSubmit={handleSkillSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={skill.category}
              onChange={(e) => setSkill({ ...skill, category: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Skill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}