import { motion } from 'framer-motion';
import GradientButton from '../GradientButton';
import CurvedDivider from '../CurvedDivider';

export default function HeroSection() {
  return (
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
  );
}