import { motion } from 'framer-motion';
import ModernCard from '../ModernCard';
import SectionHeader from '../shared/SectionHeader';
import CurvedDivider from '../CurvedDivider';
import { Skill } from '@/types';

interface SkillsSectionProps {
  skillsByCategory: Record<string, Skill[]>;
}

export default function SkillsSection({ skillsByCategory }: SkillsSectionProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <CurvedDivider className="rotate-180" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="My Skills" 
          subtitle="Technologies I've worked with across different domains" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <ModernCard key={category} className="p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill._id}
                    whileHover={{ y: -3 }}
                    className="px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
      <CurvedDivider />
    </div>
  );
}