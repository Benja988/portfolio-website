import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';

export default function CertificationsSection() {
  const certifications = [
    "Microsoft Certified: Azure AI Fundamentals",
    "Microsoft Certified: Azure Fundamentals",
    "Django Essentials React: Creating and Hosting Full Website",
    "Microsoft Certified: Power App Developer",
    "Microsoft Certified: Power Platform Fundamentals"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader 
        title="Certifications" 
        subtitle="Validations of my expertise and continuous learning" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{cert}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}