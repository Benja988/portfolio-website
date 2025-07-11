'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import { Project, Skill } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import GradientButton from '../components/GradientButton';
import ModernCard from '../components/ModernCard';
import useDarkMode from '../hooks/useDarkMode';

const SectionDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`overflow-hidden ${flip ? 'rotate-180' : ''}`}>
    <svg viewBox="0 0 1440 150" className="w-full h-20">
      <path
        fill="#f3f4f6"
        className="dark:fill-gray-800"
        d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,106.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
);

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/skills'),
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
      <div className="flex justify-center items-center min-h-screen dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto px-4 py-8">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow hover:scale-105 transition-all"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Hero */}
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
          <div className="relative z-10 text-center py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Benjamin Okumu Okinyi
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Software Engineer & Business Central Consultant
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/benjamin-okumu-b947802b8/',
                    '_blank'
                  )
                }
              >
                Connect on LinkedIn
              </GradientButton>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
                className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider />

      {/* About Section */}
      <AnimatedSection delay={0.2}>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <ModernCard className="p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Skilled Software Engineer and Business Central Technical Consultant with hands-on experience in Microsoft Dynamics 365 Business Central (AL language), .NET, and ERP systems development. Proficient in full-stack web development using the MERN stack and Python for backend automation. Passionate about delivering secure, user-focused solutions that solve real-world business challenges.
            </p>
          </ModernCard>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection delay={0.3}>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection delay={0.4}>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Work Experience Section */}
      <AnimatedSection delay={0.5}>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <ModernCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Pinnoserve Limited</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Business Central & Dynamics NAV Technical Consultant | 2025 - Present</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Developed and customized modules in Microsoft Dynamics 365 Business Central using AL language.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Automated recurring processes like interest accrual and loan repayment schedules.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Supported live client environments and provided technical documentation.</span>
                </li>
              </ul>
            </ModernCard>

            <ModernCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Upwork</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Freelance Developer | 2024 - 2025</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Migrated a React Firebase application to MERN stack, reducing API response times by 50%.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Deployed web apps to cloud platforms with secure authentication using JWT and OAuth.</span>
                </li>
              </ul>
            </ModernCard>

            <ModernCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Teknohub Limited</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Software Developer | 2022 - 2024</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Led full-cycle implementation of Microsoft Dynamics 365 Business Central.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>Built custom Power Apps and Power Automate flows for automated workflows.</span>
                </li>
              </ul>
            </ModernCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection delay={0.6}>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <ModernCard className="p-8 max-w-4xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Microsoft Certified: Azure AI Fundamentals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Microsoft Certified: Azure Fundamentals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Django Essentials React: Creating and Hosting Full Website</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Microsoft Certified: Power App Developer</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">•</span>
                <span>Microsoft Certified: Power Platform Fundamentals</span>
              </li>
            </ul>
          </ModernCard>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection delay={0.7}>
        <div id="contact" className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <ModernCard className="p-8 max-w-md mx-auto">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:okumub85@gmail.com" className="text-blue-600 hover:underline">
                  okumub85@gmail.com
                </a>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span> +254704479392
              </p>
              <p className="text-lg">
                <span className="font-semibold">Location:</span> Nairobi, Kenya
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => window.open('https://www.linkedin.com/in/benjamin-okumu-b947802b8/', '_blank')}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
              <button
                onClick={() => window.open('https://github.com/yourusername', '_blank')}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </ModernCard>
        </div>
      </AnimatedSection>
    </div>
  );
}