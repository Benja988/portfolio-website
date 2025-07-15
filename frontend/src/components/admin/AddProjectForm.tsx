import { FormEvent } from 'react';
import { ModernCard } from '../ui/ModernCard';
import { GradientButton } from '../ui/GradientButton';
import { FileUpload } from '../ui/FileUpload';
import { ErrorAlert } from '../ui/ErrorAlert';
import { ProjectFormData } from '../../types';

interface AddProjectFormProps {
  formData: ProjectFormData;
  editingProject: boolean;
  loading: boolean;
  error: string | null;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
  onChange: (data: ProjectFormData) => void;
}

export const AddProjectForm = ({
  formData,
  editingProject,
  loading,
  error,
  onSubmit,
  onCancel,
  onChange
}: AddProjectFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleFileChange = (file: File | null) => {
    onChange({ ...formData, image: file });
  };

  return (
    <ModernCard className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        {editingProject ? 'Edit Project' : 'Add Project'}
      </h2>
      
      {error && <ErrorAlert message={error} className="mb-4" />}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL (optional)</label>
            <input
              type="url"
              name="githubUrl"
              placeholder="https://github.com/username/repo"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live URL (optional)</label>
            <input
              type="url"
              name="liveUrl"
              placeholder="https://project-url.com"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
          <FileUpload 
            onChange={handleFileChange} 
            accept="image/*"
            label={formData.image ? formData.image.name : 'Upload project image'}
          />
        </div>
        
        <div className="flex space-x-4 pt-2">
          <GradientButton 
            type="submit" 
            className="flex-1" 
            disabled={loading}
          >
            {loading ? 'Processing...' : editingProject ? 'Update Project' : 'Add Project'}
          </GradientButton>
          
          {editingProject && (
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