
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Bot, BrainCircuit, Database, FileCode, Layers, Sparkles } from 'lucide-react';

type ProjectCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon, index }) => {
  return (
    <div 
      className="relative group card-hover bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 opacity-0"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      
      <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/50">AI Project</span>
        <button className="text-primary group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
          <span className="text-sm font-medium">View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector('h2');
      const subheading = sectionRef.current.querySelector('p');
      
      if (heading) observer.observe(heading);
      if (subheading) observer.observe(subheading);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.card-hover');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const projects = [
    {
      title: "Neural Network Architect",
      description: "Designing and implementing custom neural networks for computer vision applications.",
      icon: <BrainCircuit className="w-6 h-6 text-primary" />
    },
    {
      title: "NLP Processing System",
      description: "Building transformer-based models for advanced natural language understanding.",
      icon: <Bot className="w-6 h-6 text-primary" />
    },
    {
      title: "ML Operations Platform",
      description: "Developing MLOps infrastructure for seamless AI model deployment and monitoring.",
      icon: <Layers className="w-6 h-6 text-primary" />
    },
    {
      title: "Data Pipeline Framework",
      description: "Creating robust data processing pipelines for large-scale AI applications.",
      icon: <Database className="w-6 h-6 text-primary" />
    },
    {
      title: "AI Research Implementation",
      description: "Implementing cutting-edge AI research papers into practical applications.",
      icon: <FileCode className="w-6 h-6 text-primary" />
    },
    {
      title: "Generative AI Systems",
      description: "Building generative models for creating realistic images, text, and audio content.",
      icon: <Sparkles className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <section id="projects" className="section-container" ref={sectionRef}>
      <h2 className="section-heading text-center">Featured Projects</h2>
      <p className="section-subheading text-center mx-auto">
        Showcasing my journey through AI engineering and machine learning development
      </p>
      
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            icon={project.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
