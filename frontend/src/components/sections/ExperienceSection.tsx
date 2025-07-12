import TimelineItem from '../TimelineItem';
import SectionHeader from '../shared/SectionHeader';
import CurvedDivider from '../CurvedDivider';

export default function ExperienceSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <CurvedDivider className="rotate-180" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Professional Journey" 
          subtitle="My career path and professional milestones" 
        />

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
  );
}