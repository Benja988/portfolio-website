'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import { Project, Skill } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsRes = await fetch('http://localhost:5000/api/projects');
      const skillsRes = await fetch('http://localhost:5000/api/skills');
      setProjects(await projectsRes.json());
      setSkills(await skillsRes.json());
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold">Benjamin Okumu Okinyi</h1>
        <p className="text-xl mt-4">Software Engineer & Business Central Consultant</p>
        <a
          href="https://www.linkedin.com/in/benjamin-okumu-b947802b8/"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Connect on LinkedIn
        </a>
      </section>

      {/* About Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Skilled Software Engineer and Business Central Technical Consultant with hands-on experience in Microsoft Dynamics 365 Business Central (AL language), .NET, and ERP systems development. Proficient in full-stack web development using the MERN stack and Python for backend automation. Passionate about delivering secure, user-focused solutions that solve real-world business challenges.
        </p>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Work Experience</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold">Pinnoserve Limited</h3>
            <p className="text-gray-600">Business Central & Dynamics NAV Technical Consultant | 2025 - Present</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Developed and customized modules in Microsoft Dynamics 365 Business Central using AL language.</li>
              <li>Automated recurring processes like interest accrual and loan repayment schedules.</li>
              <li>Supported live client environments and provided technical documentation.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Upwork</h3>
            <p className="text-gray-600">Freelance Developer | 2024 - 2025</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Migrated a React Firebase application to MERN stack, reducing API response times by 50%.</li>
              <li>Deployed web apps to cloud platforms with secure authentication using JWT and OAuth.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Teknohub Limited</h3>
            <p className="text-gray-600">Software Developer | 2022 - 2024</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Led full-cycle implementation of Microsoft Dynamics 365 Business Central.</li>
              <li>Built custom Power Apps and Power Automate flows for automated workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Certifications</h2>
        <ul className="list-disc list-inside max-w-3xl mx-auto text-gray-700">
          <li>Microsoft Certified: Azure AI Fundamentals</li>
          <li>Microsoft Certified: Azure Fundamentals</li>
          <li>Django Essentials React: Creating and Hosting Full Website</li>
          <li>Microsoft Certified: Power App Developer</li>
          <li>Microsoft Certified: Power Platform Fundamentals</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <p className="text-lg text-gray-700">
          Email: <a href="mailto:okumub85@gmail.com" className="text-blue-600">okumub85@gmail.com</a>
        </p>
        <p className="text-lg text-gray-700">Phone: +254704479392</p>
        <p className="text-lg text-gray-700">Location: Nairobi, Kenya</p>
      </section>
    </div>
  );
}