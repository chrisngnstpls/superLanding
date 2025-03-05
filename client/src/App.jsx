import React, { useState } from 'react';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Sample App 1',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://github.com/example/ecommerce',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=E-Commerce'
  },
  {
    id: 2,
    title: 'Sample App 2',
    description: 'A Kanban-style task management application with drag-and-drop functionality',
    tags: ['React', 'Redux', 'Firebase', 'Material UI'],
    link: 'https://github.com/example/task-manager',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=Task+Manager'
  },
  {
    id: 3,
    title: 'Sample App 3',
    description: 'Real-time weather information with interactive maps and forecasts',
    tags: ['JavaScript', 'OpenWeather API', 'Leaflet', 'Chart.js'],
    link: 'https://github.com/example/weather-app',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=Weather+App'
  },
  {
    id: 4,
    title: 'Sample App 4',
    description: 'Dashboard for tracking and analyzing social media performance metrics',
    tags: ['React', 'D3.js', 'Node.js', 'Social APIs'],
    link: 'https://github.com/example/social-analytics',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=Analytics'
  },
  {
    id: 5,
    title: 'Sample App 5',
    description: 'Mobile-first application for tracking workouts and nutrition',
    tags: ['React Native', 'GraphQL', 'MongoDB', 'Auth0'],
    link: 'https://github.com/example/fitness-app',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=Fitness+App'
  },
  {
    id: 6,
    title: 'Sample App 6',
    description: 'A searchable repository of reusable code snippets with syntax highlighting',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Prism.js'],
    link: 'https://github.com/example/code-snippets',
    image: 'https://via.placeholder.com/300x200/16213e/e94560?text=Code+Snippets'
  }
];

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card group">
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 neon-text">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded-full bg-accent text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-highlight text-white rounded-lg hover:bg-opacity-80 transition-colors"
      >
        View Project
      </a>
    </div>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Background SVG Pattern */}
      <div className="fixed inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="#e94560" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 animate-pulse-slow neon-text">
            devsden.xyz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore a curated collection of software projects built with popular technologies.
          </p>
        </header>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="glass-effect p-2 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-400 mx-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No projects found matching your search criteria.</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} Software Projects Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
