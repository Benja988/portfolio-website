'use client';

import { Project } from '../types';
import ModernCard from './ModernCard';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <ModernCard className="h-full flex flex-col">
      <div className="relative h-48 w-full">
        {project.image && (
          <Image
            src={`http://localhost:5000/${project.image}`}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.split(',').map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
            >
              {tech.trim()}
            </motion.span>
          ))}
        </div>
      </div>
    </ModernCard>
  );
}