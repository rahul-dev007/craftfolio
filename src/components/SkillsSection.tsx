'use client';
import React from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaFigma,
  FaPython,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiVercel,
  SiDocker,
  SiOpenai,
} from 'react-icons/si';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Express.js', icon: <SiExpress className="text-gray-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
  { name: 'GitHub', icon: <FaGithub className="text-white" /> },
  { name: 'Figma', icon: <FaFigma className="text-pink-400" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" /> },
  { name: 'Docker', icon: <SiDocker className="text-blue-300" /> },
  { name: 'Vercel', icon: <SiVercel className="text-white" /> },
  { name: 'OpenAI', icon: <SiOpenai className="text-emerald-300" /> },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-ping"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🚀 My <span className="text-indigo-400">Tech Stack</span>
        </motion.h2>

        {/* Scrolling Row Animation */}
        <motion.div
          className="flex overflow-hidden whitespace-nowrap mb-16"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 mx-6 text-4xl opacity-80 hover:opacity-100"
            >
              {skill.icon}
              <span className="text-sm text-gray-400">{skill.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Static grid (interactive) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 0px 25px rgba(79,70,229,0.4)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="flex flex-col items-center justify-center p-5 bg-gray-800/60 rounded-xl backdrop-blur-md shadow-lg border border-gray-700 hover:border-indigo-500 transition duration-300"
            >
              <div className="text-5xl mb-3 animate-bounce-slow">{skill.icon}</div>
              <p className="text-white text-md font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
