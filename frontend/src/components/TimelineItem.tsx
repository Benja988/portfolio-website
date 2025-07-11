'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  children: ReactNode;
  last?: boolean;
  icon?: ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}

export default function TimelineItem({
  title,
  subtitle,
  date,
  children,
  last = false,
  icon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  color = 'blue'
}: TimelineItemProps) {
  // Color variants
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex relative pb-12 group"
    >
      {/* Timeline connector line */}
      {!last && (
        <div className="h-full w-0.5 absolute left-5 top-6 bg-gray-200 dark:bg-gray-700 group-hover:bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-300" />
      )}

      {/* Icon container with gradient background */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${colorVariants[color]} inline-flex items-center justify-center text-white relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      {/* Content container */}
      <div className="flex-grow pl-6">
        {/* Title with hover effect */}
        <motion.h3 
          whileHover={{ x: 5 }}
          className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        >
          {title}
        </motion.h3>

        {/* Subtitle and date */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <p className="text-blue-600 dark:text-blue-400 font-medium">{subtitle}</p>
          <span className="hidden md:block text-gray-400">•</span>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{date}</p>
        </div>

        {/* Content with animated bullets */}
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-1.5 text-blue-500 dark:text-blue-400">•</span>
                <span>{child}</span>
              </motion.div>
            ))
          ) : (
            <div className="flex items-start">
              <span className="mr-2 mt-1.5 text-blue-500 dark:text-blue-400">•</span>
              <span>{children}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}