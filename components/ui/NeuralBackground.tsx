import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Particle Configuration
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const connectionDistance = 140;
    const mouseDistance = 200;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      });
    }

    // Theme-based colors
    const getColors = () => {
      if (isDark) {
        return {
          background: 'rgba(2, 6, 23, 0.2)', // slate-950
          particle: 'rgba(99, 102, 241, 0.5)', // Indigo-500
          connection: (opacity: number) => `rgba(139, 92, 246, ${opacity * 0.2})`, // Violet-500
          mouseConnection: (opacity: number) => `rgba(20, 184, 166, ${opacity * 0.25})`, // Teal-500
        };
      } else {
        return {
          background: 'rgba(248, 250, 252, 0.3)', // slate-50
          particle: 'rgba(99, 102, 241, 0.4)', // Indigo-500 (slightly transparent)
          connection: (opacity: number) => `rgba(129, 140, 248, ${opacity * 0.25})`, // Indigo-400
          mouseConnection: (opacity: number) => `rgba(20, 184, 166, ${opacity * 0.3})`, // Teal-500
        };
      }
    };

    const draw = () => {
      const colors = getColors();

      // Create a trail effect by not clearing completely
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const dxMouse = p.x - mouseRef.current.x;
        const dyMouse = p.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          const force = (mouseDistance - distMouse) / mouseDistance;

          // Gentle repulsion
          p.vx += forceDirectionX * force * 0.02;
          p.vy += forceDirectionY * force * 0.02;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = colors.connection(opacity);
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (distMouse < mouseDistance) {
          ctx.beginPath();
          const opacity = 1 - distMouse / mouseDistance;
          ctx.strokeStyle = colors.mouseConnection(opacity);
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}
    />
  );
};

export default NeuralBackground;
