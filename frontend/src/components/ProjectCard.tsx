import Image from 'next/image';
import { Project } from '../types';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
      {project.image && (
        <Image src={project.image} alt={project.title} width={400} height={200} className="rounded mb-4" />
      )}
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <p className="text-gray-500 mt-2"><strong>Tech Stack:</strong> {project.techStack}</p>
    </div>
  );
}