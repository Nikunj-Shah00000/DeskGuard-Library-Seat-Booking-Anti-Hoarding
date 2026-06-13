import React, { useEffect, useRef } from 'react';

interface Insect {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  glowColor: string;
  glowRadius: number;
  rotationAngle: number;
  rotationSpeed: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  type: 'firefly' | 'moth' | 'beetle';
  pulsePhase: number;
  pulseSpeed: number;
  wingAngle: number;
  wingSpeed: number;
  opacity: number;
  fadeDirection: number;
}

const InsectBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const insectsRef = useRef<Insect[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(85, 107, 47,',   // earthy green
      'rgba(244, 180, 0,',   // warm yellow
      'rgba(78, 52, 46,',    // brown
      'rgba(63, 93, 63,',    // forest green
    ];

    const types: Array<'firefly' | 'moth' | 'beetle'> = ['firefly', 'moth', 'beetle'];

    insectsRef.current = Array.from({ length: 38 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 3 + 1.5,
      glowColor: colors[Math.floor(Math.random() * colors.length)],
      glowRadius: Math.random() * 18 + 8,
      rotationAngle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      orbitRadius: Math.random() * 30 + 10,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() - 0.5) * 0.008,
      type: types[Math.floor(Math.random() * types.length)],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      wingAngle: 0,
      wingSpeed: Math.random() * 0.15 + 0.08,
      opacity: Math.random() * 0.5 + 0.3,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    const drawFirefly = (ctx: CanvasRenderingContext2D, ins: Insect, glow: number) => {
      // Glow
      const grad = ctx.createRadialGradient(ins.x, ins.y, 0, ins.x, ins.y, ins.glowRadius * glow);
      grad.addColorStop(0, `${ins.glowColor}${ins.opacity * 0.9})`);
      grad.addColorStop(0.4, `${ins.glowColor}${ins.opacity * 0.4})`);
      grad.addColorStop(1, `${ins.glowColor}0)`);
      ctx.beginPath();
      ctx.arc(ins.x, ins.y, ins.glowRadius * glow, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Body
      ctx.save();
      ctx.translate(ins.x, ins.y);
      ctx.rotate(ins.rotationAngle);
      ctx.fillStyle = `${ins.glowColor}${ins.opacity})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, ins.size * 1.6, ins.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Abdomen glow spot
      ctx.fillStyle = `rgba(244, 230, 150, ${ins.opacity * 0.8})`;
      ctx.beginPath();
      ctx.arc(ins.size * 0.6, 0, ins.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawMoth = (ctx: CanvasRenderingContext2D, ins: Insect, glow: number) => {
      ctx.save();
      ctx.translate(ins.x, ins.y);
      ctx.rotate(ins.rotationAngle);
      
      const wingSpan = ins.size * 4;
      const wingFlap = Math.sin(ins.wingAngle) * 0.4;

      // Wings
      ctx.globalAlpha = ins.opacity * 0.6;
      ctx.fillStyle = `${ins.glowColor}0.7)`;
      
      // Left wing
      ctx.save();
      ctx.rotate(-wingFlap);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-wingSpan, -ins.size * 2, -wingSpan * 1.2, ins.size, -ins.size * 0.5, ins.size * 0.5);
      ctx.fill();
      ctx.restore();

      // Right wing
      ctx.save();
      ctx.rotate(wingFlap);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(wingSpan, -ins.size * 2, wingSpan * 1.2, ins.size, ins.size * 0.5, ins.size * 0.5);
      ctx.fill();
      ctx.restore();

      // Body
      ctx.globalAlpha = ins.opacity;
      ctx.fillStyle = `${ins.glowColor}0.9)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, ins.size * 0.5, ins.size * 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antennae
      ctx.strokeStyle = `${ins.glowColor}0.6)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -ins.size);
      ctx.quadraticCurveTo(-ins.size * 1.5, -ins.size * 3, -ins.size * 0.5, -ins.size * 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -ins.size);
      ctx.quadraticCurveTo(ins.size * 1.5, -ins.size * 3, ins.size * 0.5, -ins.size * 4);
      ctx.stroke();

      ctx.restore();
    };

    const drawBeetle = (ctx: CanvasRenderingContext2D, ins: Insect, glow: number) => {
      ctx.save();
      ctx.translate(ins.x, ins.y);
      ctx.rotate(ins.rotationAngle);
      ctx.globalAlpha = ins.opacity;

      // Shell
      ctx.fillStyle = `${ins.glowColor}0.8)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, ins.size * 1.2, ins.size * 1.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Elytra split
      ctx.strokeStyle = `${ins.glowColor}0.4)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -ins.size * 1.8);
      ctx.lineTo(0, ins.size * 1.8);
      ctx.stroke();

      // Head
      ctx.fillStyle = `${ins.glowColor}0.9)`;
      ctx.beginPath();
      ctx.arc(0, -ins.size * 1.8, ins.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Legs (3 each side)
      ctx.strokeStyle = `${ins.glowColor}0.5)`;
      ctx.lineWidth = 0.5;
      for (let i = -1; i <= 1; i++) {
        const ly = i * ins.size * 0.8;
        ctx.beginPath(); ctx.moveTo(-ins.size * 1.2, ly); ctx.lineTo(-ins.size * 2.5, ly - ins.size * 0.3); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ins.size * 1.2, ly); ctx.lineTo(ins.size * 2.5, ly - ins.size * 0.3); ctx.stroke();
      }
      ctx.restore();
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      insectsRef.current.forEach(ins => {
        // Orbit movement
        ins.orbitAngle += ins.orbitSpeed;
        ins.x += ins.vx + Math.cos(ins.orbitAngle) * 0.3;
        ins.y += ins.vy + Math.sin(ins.orbitAngle) * 0.3;
        ins.rotationAngle += ins.rotationSpeed;
        ins.pulsePhase += ins.pulseSpeed;
        ins.wingAngle += ins.wingSpeed;

        // Fade in/out
        ins.opacity += ins.fadeDirection * 0.003;
        if (ins.opacity > 0.7 || ins.opacity < 0.1) ins.fadeDirection *= -1;

        // Bounce off edges with wraparound
        if (ins.x < -50) ins.x = canvas.width + 50;
        if (ins.x > canvas.width + 50) ins.x = -50;
        if (ins.y < -50) ins.y = canvas.height + 50;
        if (ins.y > canvas.height + 50) ins.y = -50;

        const glow = 0.8 + Math.sin(ins.pulsePhase) * 0.2;

        if (ins.type === 'firefly') drawFirefly(ctx, ins, glow);
        else if (ins.type === 'moth') drawMoth(ctx, ins, glow);
        else drawBeetle(ctx, ins, glow);
      });

      frame++;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="insect-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.28,
      }}
    />
  );
};

export default InsectBackground;
