'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import { Project, Skill } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import GradientButton from '../components/GradientButton';
import ModernCard from '../components/ModernCard';
import CurvedDivider from '@/components/CurvedDivider';
import TimelineItem from '@/components/TimelineItem';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/skills')
        ]);
        
        setProjects(await projectsRes.json());
        setSkills(await skillsRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Benjamin Okumu Okinyi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Software Engineer & Business Central Consultant
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <GradientButton
              onClick={() => window.open('https://www.linkedin.com/in/benjamin-okumu-b947802b8/', '_blank')}
            >
              Connect on LinkedIn
            </GradientButton>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
        <CurvedDivider />
      </section>

      {/* About Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Crafting digital solutions that bridge business needs with technical excellence
            </p>
          </div>
          
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
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection>
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <CurvedDivider className="rotate-180" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Skills
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Technologies I've worked with across different domains
              </p>
            </div>

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
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A selection of my recent work and contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection>
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <CurvedDivider className="rotate-180" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional Journey
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                My career path and professional milestones
              </p>
            </div>

            <div className="relative">
              <TimelineItem
                title="Pinnoserve Limited"
                subtitle="Business Central & Dynamics NAV Technical Consultant"
                date="2025 - Present"
              >
                <p>Developed and customized modules in Microsoft Dynamics 365 Business Central using AL language.</p>
                <p>Automated recurring processes like interest accrual and loan repayment schedules.</p>
                <p>Supported live client environments and provided technical documentation.</p>
              </TimelineItem>

              <TimelineItem
                title="Upwork"
                subtitle="Freelance Developer"
                date="2024 - 2025"
              >
                <p>Migrated a React Firebase application to MERN stack, reducing API response times by 50%.</p>
                <p>Deployed web apps to cloud platforms with secure authentication using JWT and OAuth.</p>
              </TimelineItem>

              <TimelineItem
                title="Teknohub Limited"
                subtitle="Software Developer"
                date="2022 - 2024"
                last
              >
                <p>Led full-cycle implementation of Microsoft Dynamics 365 Business Central.</p>
                <p>Built custom Power Apps and Power Automate flows for automated workflows.</p>
              </TimelineItem>
            </div>
          </div>
          <CurvedDivider />
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Validations of my expertise and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Microsoft Certified: Azure AI Fundamentals",
              "Microsoft Certified: Azure Fundamentals",
              "Django Essentials React: Creating and Hosting Full Website",
              "Microsoft Certified: Power App Developer",
              "Microsoft Certified: Power Platform Fundamentals"
            ].map((cert, index) => (
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
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <div id="contact" className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <CurvedDivider className="rotate-180" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                Let's Connect
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
            </div>

            <ModernCard className="p-8 md:p-12 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                        <a href="mailto:okumub85@gmail.com" className="text-base text-blue-600 dark:text-blue-400 hover:underline">
                          okumub85@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-base text-gray-700 dark:text-gray-300">+254704479392</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-base text-gray-700 dark:text-gray-300">Nairobi, Kenya</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.linkedin.com/in/benjamin-okumu-b947802b8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Send Me a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <GradientButton type="submit" className="w-full">
                      Send Message
                    </GradientButton>
                  </form>
                </div>
              </div>
            </ModernCard>
          </div>
          <CurvedDivider />
        </div>
      </AnimatedSection>
    </div>
  );
}