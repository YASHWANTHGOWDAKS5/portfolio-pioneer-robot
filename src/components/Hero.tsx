
import React, { useEffect, useRef } from 'react';
import { ArrowDown, Bot, Cpu, Database, Network } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Background gradient and shapes */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" aria-hidden="true"></div>
      
      {/* Floating icons */}
      <div className="absolute top-1/4 left-1/5 opacity-20 animate-float" aria-hidden="true">
        <Bot className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 opacity-20 animate-float" style={{animationDelay: '1s'}} aria-hidden="true">
        <Network className="w-10 h-10 text-secondary" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-20 animate-float" style={{animationDelay: '2s'}} aria-hidden="true">
        <Database className="w-6 h-6 text-primary" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 opacity-20 animate-float" style={{animationDelay: '1.5s'}} aria-hidden="true">
        <Cpu className="w-8 h-8 text-secondary" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-animation">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI Engineer & Machine Learning Specialist
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block mb-2">Yashwanth Gowda KS</span>
            Building the future with 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"> intelligent systems</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Transforming ideas into intelligent solutions through AI engineering, machine learning, and deep neural networks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              View My Work
            </a>
            <a 
              href="#about" 
              className="w-full sm:w-auto px-8 py-3 rounded-md bg-accent text-accent-foreground font-medium border border-border transition-all hover:bg-accent/70"
            >
              About Me
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm font-medium mb-2 text-muted-foreground">Scroll Down</span>
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
