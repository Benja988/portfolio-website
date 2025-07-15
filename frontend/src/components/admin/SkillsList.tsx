import { Skill } from '../../types';
import { ModernCard } from '../ui/ModernCard';
import { GradientButton } from '../ui/GradientButton';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface SkillsListProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const SkillsList = ({ skills, onEdit, onDelete, loading }: SkillsListProps) => {
  return (
    <ModernCard className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Manage Skills</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : skills.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 py-4 text-center">No skills found.</p>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{skill.name}</h3>
                  {skill.proficiency && (
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">
                        {skill.proficiency}%
                      </span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                  {skill.category}
                </span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <GradientButton 
                  onClick={() => onEdit(skill)} 
                  className="flex-1 sm:px-4 py-2"
                  variant="secondary"
                >
                  Edit
                </GradientButton>
                <GradientButton
                  onClick={() => onDelete(skill._id)}
                  className="flex-1 sm:px-4 py-2"
                  variant="danger"
                >
                  Delete
                </GradientButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModernCard>
  );
};