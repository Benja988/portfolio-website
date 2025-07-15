import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Skill, SkillFormData } from '../types';

export const useSkills = () => {
  const { data: session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillForm, setSkillForm] = useState<SkillFormData>({
    name: '',
    category: '',
    proficiency: ''
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      setError('Failed to fetch skills');
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
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({
          ...skillForm,
          proficiency: skillForm.proficiency ? parseInt(skillForm.proficiency) : undefined
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save skill');
      }

      await fetchSkills();
      setSkillForm({
        name: '',
        category: '',
        proficiency: ''
      });
      setEditingSkill(null);
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
        headers: { Authorization: `Bearer ${session?.token}` },
      });

      if (!res.ok) throw new Error('Failed to delete skill');
      await fetchSkills();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency?.toString() || ''
    });
  };

  return {
    skills,
    skillForm,
    editingSkill,
    loading,
    error,
    fetchSkills,
    handleSkillSubmit,
    handleDeleteSkill,
    handleEditSkill,
    setSkillForm,
    setEditingSkill
  };
};