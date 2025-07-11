'use client';

import { Skill } from '../types';
import ModernCard from './ModernCard';
import { motion } from 'framer-motion';

export default function SkillCard({ skill }: { skill: Skill }) {
  const categoryColors: Record<string, string> = {
    frontend: 'from-purple-500 to-pink-500',
    backend: 'from-blue-500 to-cyan-500',
    database: 'from-green-500 to-teal-500',
    devops: 'from-orange-500 to-red-500',
    other: 'from-gray-500 to-gray-700',
  };

  const bgGradient = categoryColors[skill.category.toLowerCase()] || categoryColors.other;

  return (
    <ModernCard>
      <div className="p-6 text-center">
        <div className={`h-16 w-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-r ${bgGradient}`}>
          {skill.name.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-white">{skill.name}</h3>
        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
          {skill.category}
        </span>
      </div>
    </ModernCard>
  );
}