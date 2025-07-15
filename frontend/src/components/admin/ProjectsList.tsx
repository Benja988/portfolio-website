import { Project } from '../../types';
import { ModernCard } from '../ui/ModernCard';
import { GradientButton } from '../ui/GradientButton';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProjectsListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const ProjectsList = ({ projects, onEdit, onDelete, loading }: ProjectsListProps) => {
  return (
    <ModernCard className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Manage Projects</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 py-4 text-center">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
  {(Array.isArray(project.techStack)
    ? project.techStack
    : (project.techStack as string).split(',').map((t: string) => t.trim())
  ).map((tech: string, index: number) => (
    <span
      key={index}
      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
    >
      {tech}
    </span>
  ))}
</div>

              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <GradientButton
                  onClick={() => onEdit(project)}
                  className="flex-1 sm:px-4 py-2"
                  variant="secondary"
                >
                  Edit
                </GradientButton>
                <GradientButton
                  onClick={() => onDelete(project._id)}
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
