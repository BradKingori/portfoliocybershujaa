import { useState } from "react";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects Portfolio - AI, Gaming & Web Development" },
    { name: "description", content: "Showcasing vehicle recognition, medical AI, STRTK1NG game, and parking booking system" },
  ];
}

// Project Card Component
function ProjectCard({ project, isExpanded, onToggle }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Project Image/Video */}
      <div className="relative h-64 overflow-hidden">
        {project.video ? (
          <video 
            src={project.video} 
            className="w-full h-full object-cover"
            autoPlay={false}
            muted
            loop
          />
        ) : (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === 'Completed' 
              ? 'bg-green-500 text-white' 
              : project.status === 'In Development'
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-3xl">{project.icon}</div>
          <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{project.shortDescription}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, idx: number) => (
            <span key={idx} className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
            <ul className="space-y-2 mb-4">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {project.challenge && (
              <>
                <h4 className="font-semibold text-gray-900 mb-2">Challenge Solved:</h4>
                <p className="text-gray-600 mb-4">{project.challenge}</p>
              </>
            )}
            
            {project.impact && (
              <>
                <h4 className="font-semibold text-gray-900 mb-2">Impact:</h4>
                <p className="text-gray-600 mb-4">{project.impact}</p>
              </>
            )}
            
            {/* Links */}
            <div className="flex gap-3 mt-4">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <span></span>Demo
                </a>
              )}
            </div>
          </div>
        )}
        
        <button
          onClick={onToggle}
          className="mt-4 text-green-600 hover:text-green-800 font-semibold transition"
        >
          {isExpanded ? 'Show Less ↑' : 'Learn More ↓'}
        </button>
      </div>
    </div>
  );
}

// Featured Project Component (for highlighted projects)
function FeaturedProject({ project }: any) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-600 rounded-2xl overflow-hidden shadow-xl mb-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 text-white">
          <div className="text-4xl mb-3">{project.icon}</div>
          <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
          <p className="text-green-100 mb-4">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, idx: number) => (
              <span key={idx} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                Live Demo
              </a>
            )}
          </div>
        </div>
        <div className="relative h-64 md:h-auto">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Vehicle Object Recognition System",
      shortDescription: "Advanced computer vision system for real-time vehicle detection and classification using deep learning.",
      image: "https://i.imgur.com/TkWYpg3.jpeg",
      technologies: ["Python", "TensorFlow", "YOLOv8", "OpenCV", "React"],
      status: "Completed",
      features: [
        "Real-time vehicle detection from video streams",
        "Classification of 50+ road sign types (stop, slowdown, etc.)",
        "Classification of 15+ vehicle types (sedan, SUV, truck, motorcycle, etc.)",
        "License plate recognition with 95% accuracy",
        "Vehicle counting and traffic analysis dashboard",
        "API endpoints for integration with traffic systems"
      ],
      challenge: "Achieving high accuracy in various lighting conditions and weather scenarios while maintaining real-time performance.",
      impact: "Deployed in smart city pilot program, reducing manual traffic monitoring by 80%",
      demo: "Sorry Mobile Only"
    },
    
    {
      id: 2,
      title: "Medical Analysis Tool",
      shortDescription: "AI-powered medical diagnostic tool that analyzes patient data to provide health insights and predictions.",
      image: "",
      technologies: ["Python", "Scikit-learn", "Flask", "React", "TensorFlow", "Pandas"],
      status: "Completed",
      features: [
        "Patient data ingestion from CSV, Excel, and medical devices",
        "Predictive modeling for disease risk assessment",
        "Interactive dashboard for visualizing health metrics",
        "Treatment recommendation system based on similar cases",
        "Exportable reports for healthcare providers"
      ],
      challenge: "Ensuring HIPAA compliance and data privacy while maintaining prediction accuracy across diverse patient populations.",
      impact: "Currently in beta testing with 3 clinics, helping identify at-risk patients 40% earlier than traditional methods",
      demo: "https://medical-analysis-demo.vercel.app"
    },
    {
      id: 3,
      title: "STRTK1NG - The Game",
      shortDescription: "An intense arcade-style action game featuring unique mechanics and challenging gameplay.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1224250/header.jpg?t=1707940356",
      technologies: ["Unity", "C#", "Photoshop", "FMOD", "Git LFS"],
      status: "In Development",
      features: [
        "Fast-paced combat system with unique special abilities",
        "Procedurally generated levels for infinite replayability",
        "Local multiplayer mode for competitive play",
        "Original soundtrack and sound design",
        "Achievement system and leaderboards"
      ],
      challenge: "Balancing gameplay difficulty while keeping it accessible for casual players but challenging for hardcore gamers.",
      impact: "Already featured in indie game showcase, with 1000+ wishlists on Steam",
      demo: "https://store.steampowered.com/app/1224250/STRTK1NG"
    },
    {
      id: 4,
      title: "SmartCop - Online Police Incident Booking",
      shortDescription: "Real-time police Incident Responsesystem with live availability tracking and mobile integration.",
      image: "https://imgur.com/7YV9AWE.jpg",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebSockets", "TailwindCSS"],
      status: "In Progress",
      features: [
        "Real-time spot availability map",
        "User authentication with Google/Facebook login",
        "Booking calendar with hourly/daily rates",
        "QR code generation for entry/exit",
         ],
      challenge: "Handling concurrent bookings and ensuring ploice are able to manage high-traffic scenarios.",
      impact: "Currently managing 500+ parking spots across 5 locations, reducing parking search time by 60%",
    }
  ];

  const featuredProject = projects[2]; // Vehicle recognition as featured

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            My Projects Portfolio
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Showcasing innovative solutions in Cyber Security AI, Healthcare, Gaming, and Web Development
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Project */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
             Featured Project
          </h2>
          <FeaturedProject project={featuredProject} />
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedProject === project.id}
                onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              />
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
             Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "TensorFlow", "PyTorch", "React", "Next.js", "Node.js", "Unity", "C#", "OpenCV", "PostgreSQL", "Docker", "AWS", "Flask", "FastAPI", "TailwindCSS"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Interested in collaborating or have questions about these projects?</p>
          <a href="http://www.linkedin.com\in\bradley-king-ori-3a2754110">
    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105">
      Get in Touch Via LinkedIn
    </button></a>
        </div>
      </div>
    </div>
  );
}