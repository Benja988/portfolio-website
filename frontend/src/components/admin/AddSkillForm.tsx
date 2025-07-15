import { FormEvent } from 'react';
import { ModernCard } from '../ui/ModernCard';
import { GradientButton } from '../ui/GradientButton';
import { ErrorAlert } from '../ui/ErrorAlert';
import { SkillFormData } from '../../types';

interface AddSkillFormProps {
  formData: SkillFormData;
  editingSkill: boolean;
  loading: boolean;
  error: string | null;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  onChange: (data: SkillFormData) => void;
}

export const AddSkillForm = ({
  formData,
  editingSkill,
  loading,
  error,
  onSubmit,
  onCancel,
  onChange
}: AddSkillFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <ModernCard className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        {editingSkill ? 'Edit Skill' : 'Add Skill'}
      </h2>
      
      {error && <ErrorAlert message={error} className="mb-4" />}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. React, Node.js"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
            name="proficiency"
            placeholder="e.g. 80"
            value={formData.proficiency}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            min="0"
            max="100"
          />
        </div>
        
        <div className="flex space-x-4 pt-2">
          <GradientButton 
            type="submit" 
            className="flex-1" 
            disabled={loading}
          >
            {loading ? 'Processing...' : editingSkill ? 'Update Skill' : 'Add Skill'}
          </GradientButton>
          
          {editingSkill && (
            <GradientButton
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </GradientButton>
          )}
        </div>
      </form>
    </ModernCard>
  );
};