import React, { useEffect, useRef, useState } from 'react';

interface EducationalTool {
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: string;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  glowIntensity: number;
  isHovered: boolean;
  name: string;
}

const CanvasAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const toolsRef = useRef<EducationalTool[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const educationalIcons = [
    { icon: '📚', name: 'Digital Library', color: '#4299e1' },
    { icon: '🧮', name: 'Math Tools', color: '#9f7aea' },
    { icon: '🔬', name: 'Science Lab', color: '#38d9a9' },
    { icon: '🎨', name: 'Art Studio', color: '#f687b3' },
    { icon: '💻', name: 'Code Editor', color: '#4fd1c7' },
    { icon: '🌍', name: 'Geography', color: '#f6ad55' },
    { icon: '📝', name: 'Writing Tools', color: '#ed8936' },
    { icon: '🎵', name: 'Music Studio', color: '#805ad5' },
    { icon: '📊', name: 'Data Analysis', color: '#319795' },
    { icon: '🏛️', name: 'History Hub', color: '#ed64a6' },
    { icon: '🧠', name: 'AI Tutor', color: '#3182ce' },
    { icon: '🎯', name: 'Goal Tracker', color: '#38d9a9' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Initialize educational tools
    const toolCount = Math.min(12, Math.floor((canvas.width * canvas.height) / 20000));
    toolsRef.current = Array.from({ length: toolCount }, (_, i) => {
      const iconData = educationalIcons[i % educationalIcons.length];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        icon: iconData.icon,
        color: iconData.color,
        name: iconData.name,
        size: 30 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        glowIntensity: 0.3 + Math.random() * 0.4,
        isHovered: false
      };
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update tools
      toolsRef.current.forEach(tool => {
        // Update position
        tool.x += tool.vx;
        tool.y += tool.vy;
        tool.rotation += tool.rotationSpeed;

        // Bounce off edges with some padding
        const padding = tool.size;
        if (tool.x <= padding || tool.x >= canvas.width - padding) tool.vx *= -1;
        if (tool.y <= padding || tool.y >= canvas.height - padding) tool.vy *= -1;

        // Keep tools in bounds
        tool.x = Math.max(padding, Math.min(canvas.width - padding, tool.x));
        tool.y = Math.max(padding, Math.min(canvas.height - padding, tool.y));

        // Check for mouse hover
        const distance = Math.sqrt(
          (mouseRef.current.x - tool.x) ** 2 + (mouseRef.current.y - tool.y) ** 2
        );
        tool.isHovered = distance < tool.size;
      });

      // Draw connections between nearby tools
      ctx.strokeStyle = 'rgba(56, 217, 169, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < toolsRef.current.length; i++) {
        for (let j = i + 1; j < toolsRef.current.length; j++) {
          const toolA = toolsRef.current[i];
          const toolB = toolsRef.current[j];
          const distance = Math.sqrt((toolA.x - toolB.x) ** 2 + (toolA.y - toolB.y) ** 2);

          if (distance < 200) {
            const opacity = (200 - distance) / 200;
            ctx.strokeStyle = `rgba(56, 217, 169, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(toolA.x, toolA.y);
            ctx.lineTo(toolB.x, toolB.y);
            ctx.stroke();
          }
        }
      }

      // Draw educational tools
      toolsRef.current.forEach(tool => {
        ctx.save();
        ctx.translate(tool.x, tool.y);
        ctx.rotate(tool.rotation);

        // Draw glow effect
        if (tool.isHovered) {
          ctx.shadowColor = tool.color;
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } else {
          ctx.shadowColor = tool.color;
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        // Draw background circle
        ctx.fillStyle = tool.isHovered ? 
          `${tool.color}40` : 
          `${tool.color}20`;
        ctx.beginPath();
        ctx.arc(0, 0, tool.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Draw icon (emoji)
        ctx.shadowBlur = 0;
        ctx.font = `${tool.size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tool.icon, 0, 0);

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto cursor-pointer"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default CanvasAnimation;