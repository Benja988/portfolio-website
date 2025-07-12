import { motion } from 'framer-motion';
import ModernCard from '../ModernCard';
import SectionHeader from '../shared/SectionHeader';

export default function AboutSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader 
        title="About Me" 
        subtitle="Crafting digital solutions that bridge business needs with technical excellence" 
      />
      
      <ModernCard className="p-8 md:p-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-1/2 h-1/2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                </svg>
              </div>
            </motion.div>
          </div>
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Skilled Software Engineer and Business Central Technical Consultant with hands-on experience in Microsoft Dynamics 365 Business Central (AL language), .NET, and ERP systems development.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Proficient in full-stack web development using the MERN stack and Python for backend automation. Passionate about delivering secure, user-focused solutions that solve real-world business challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              {['ERP Systems', 'Full-Stack', 'Cloud Solutions', 'Automation'].map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}