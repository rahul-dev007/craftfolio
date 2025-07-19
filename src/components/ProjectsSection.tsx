'use client';
import React from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Clabar Platform',
    description:
      'Clabar is a full-stack club management app where users can log in, set up profiles, and manage events efficiently.',
    image: '/projects/clabar.png', // Must be inside public/projects/
    liveLink: 'https://clabar.vercel.app',
    githubLink: 'https://github.com/rahul-dev007/clabar',
  },
  {
    title: 'Upwork Profile',
    description:
      'This is my Upwork freelancing profile where I handle web development projects with clients around the globe.',
    image: '/projects/upwork.png', // Screenshot of your profile
    liveLink: 'https://www.upwork.com/freelancers/~01rahul007', // use your real profile
    githubLink: '',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={300}
                className="w-full h-[200px] object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/projects/placeholder.png';
                }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  {project.liveLink && (
                    <a
                      href={"https://clabar.vercel.app/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Live Site
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={"https://github.com/rahul-dev007/clabar"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
