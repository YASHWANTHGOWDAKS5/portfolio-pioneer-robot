
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Brain, Eye, Zap } from 'lucide-react';

const CursorRobot: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const robotRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Disable the custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add slight delay for smoothness
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setOpacity(1);
        setIsActive(true);
        setIdleTime(0);
      });
    };

    // Set up idle animation
    const idleAnimation = setInterval(() => {
      if (isActive) {
        setIdleTime(prev => prev + 1);
        if (idleTime > 2) { // 2 seconds of inactivity
          setIsActive(false);
        }
      }
    }, 1000);

    // Hide cursor when leaving the window
    const handleMouseLeave = () => {
      setOpacity(0);
    };
    
    // Show cursor when entering the window
    const handleMouseEnter = () => {
      setOpacity(1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(idleAnimation);
    };
  }, [isActive, idleTime]);

  return (
    <div 
      ref={robotRef}
      className="fixed pointer-events-none z-50 will-change-transform"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: opacity,
        transition: 'opacity 0.3s ease, transform 0.2s cubic-bezier(0.19, 1, 0.22, 1)',
        left: '-20px', // Offset to position at cursor point
        top: '-20px',  // Offset to position at cursor point
      }}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Main robot face with glass morphism effect */}
        <div className="absolute w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center overflow-hidden">
          <Brain 
            className={`w-5 h-5 text-primary/80 absolute transition-all duration-300 ${isActive ? 'animate-pulse-light' : 'animate-float'}`} 
          />
        </div>
        
        {/* Robot eye that follows nearby elements */}
        <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-background/80 animate-pulse-light flex items-center justify-center">
          <Eye className="w-2 h-2 text-foreground" />
        </div>
        
        {/* Robot energy indicator */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center">
          <Zap className={`w-3 h-3 text-secondary ${isActive ? 'animate-pulse-light' : ''}`} />
        </div>
        
        {/* Ambient glow around the robot */}
        <div className="absolute w-14 h-14 -left-2 -top-2 rounded-full bg-primary/10 blur-sm transform scale-75 transition-transform duration-500"></div>
      </div>
    </div>
  );
};

export default CursorRobot;
