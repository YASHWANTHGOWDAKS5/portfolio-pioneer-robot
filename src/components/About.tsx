
import { useEffect, useRef } from 'react';
import { Brain, Code, CpuIcon, GraduationCap, Layers, UserCheck } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector('h2');
      const subheading = sectionRef.current.querySelector('p.section-subheading');
      
      if (heading) headingObserver.observe(heading);
      if (subheading) headingObserver.observe(subheading);
    }
    
    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in-element');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 100);
            });
            contentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }
    
    return () => {
      headingObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  const skills = [
    { name: "Machine Learning", icon: <Brain className="w-5 h-5" /> },
    { name: "Deep Learning", icon: <Layers className="w-5 h-5" /> },
    { name: "Computer Vision", icon: <CpuIcon className="w-5 h-5" /> },
    { name: "Natural Language Processing", icon: <Brain className="w-5 h-5" /> },
    { name: "Python", icon: <Code className="w-5 h-5" /> },
    { name: "TensorFlow", icon: <Layers className="w-5 h-5" /> },
    { name: "PyTorch", icon: <Layers className="w-5 h-5" /> },
    { name: "MLOps", icon: <CpuIcon className="w-5 h-5" /> }
  ];

  return (
    <section id="about" className="section-container bg-accent/30" ref={sectionRef}>
      <h2 className="section-heading text-center">About Me</h2>
      <p className="section-subheading text-center mx-auto">
        Passionate AI engineer with expertise in building intelligent systems and solving complex problems
      </p>
      
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div className="space-y-6">
          <div className="opacity-0 fade-in-element">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              Background
            </h3>
            <p className="text-muted-foreground mb-4">
              As an AI Engineer, I specialize in developing intelligent systems that solve real-world problems. With a strong foundation in machine learning algorithms, neural network architectures, and data science, I create innovative solutions that drive business value and technological advancement.
            </p>
            <p className="text-muted-foreground">
              My journey in AI began with a fascination for how machines can learn and adapt. This curiosity led me to explore various aspects of artificial intelligence, from supervised learning to reinforcement learning, eventually specializing in deep learning architectures and their applications.
            </p>
          </div>
          
          <div className="opacity-0 fade-in-element">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 border border-border rounded-lg">
                <h4 className="font-semibold">Master's in Artificial Intelligence</h4>
                <p className="text-sm text-muted-foreground">Stanford University, 2018-2020</p>
              </div>
              <div className="p-4 bg-background/50 border border-border rounded-lg">
                <h4 className="font-semibold">Bachelor's in Computer Science</h4>
                <p className="text-sm text-muted-foreground">MIT, 2014-2018</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="opacity-0 fade-in-element">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-3 bg-background/50 border border-border rounded-lg transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="text-primary">{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="opacity-0 fade-in-element">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CpuIcon className="w-6 h-6 text-primary" />
              Approach
            </h3>
            <p className="text-muted-foreground mb-4">
              I believe in a research-driven approach to AI development, staying at the forefront of technological advancements while ensuring practical implementation. By combining theoretical knowledge with practical expertise, I develop solutions that are not only technically sound but also address real-world challenges.
            </p>
            <p className="text-muted-foreground">
              My work focuses on creating AI systems that are explainable, ethical, and efficient. I strive to demystify AI technology, making it accessible and beneficial for various applications across industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
