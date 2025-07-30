'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import './Services.css';
import {
  Code, PenTool, Rocket, Wrench, Monitor,
  Cloud, Database, Shield
} from 'lucide-react';

// ✅ Define the structure of a service object
type Service = {
  title: string[];
  titles: string[];
  icon: React.ReactElement;
  description: string;
  details: {
    howIHelp: string;
    tools: string[];
    stack: string[];
  };
};


// ✅ Services array with full typings

const services: Service[] = [
{
  title: ['Full-Stack Development'],
  titles: ['Full-Stack Developer', 'Next.js Engineer', 'MERN Architect'],
  icon: <Code size={36} />,
  description: 'I can develop complete scalable applications from frontend to backend.',
  details: {
    howIHelp: `I build fast, secure full-stack applications using tools like Next.js, Node.js, and Supabase.
I’ve developed scalable apps that handle real-world use cases.
From frontend polish to backend logic, I cover the entire stack.` ,
    tools: ['VS Code', 'Postman', 'ESLint', 'Prettier'],
    stack: ['React', 'Next.js', 'Node.js', 'Supabase', 'Tailwind', 'MongoDB', 'PostgreSQL'],
  }
},

{
  title: ['UI/UX Design'],
  titles: ['UI/UX Designer', 'Product Thinker', 'Figma Specialist'],
  icon: <PenTool size={36} />,
  description: 'I design clean, intuitive user interfaces and seamless user flows.',
  details: {
    howIHelp:`I craft user-first interfaces with a sharp eye for detail and flow.
From clean layouts to smooth interactions, I aim for both beauty and usability.
Tools like Figma and Framer help bring ideas to life.` ,
    tools: ['Figma', 'Framer', 'Adobe XD'],
    stack: ['CSS Flex/Grid', 'Tailwind', 'Framer Motion', 'Shadcn/UI'],
  }
},

{
  title: ['Cloud & Deployment'],
  titles: ['DevOps Engineer', 'Cloud Specialist', 'CI/CD Automator'],
  icon: <Rocket size={36} />,
  description:  'I can set up environments, optimize deployments, and scale apps.',
  details: {
    howIHelp:`I set up seamless CI/CD pipelines, manage environments, and deploy to Vercel, Render, or VPS.
My stack ensures apps are not only live — but reliable, fast, and secure.
I optimize deployments so you can ship confidently and iterate quickly.`,
    tools: ['Vercel', 'Render', 'Nginx', 'PM2'],
    stack: ['Docker', 'GitHub Actions', 'Linux CLI'],
  }
},

{
  title: ['Debugging & Maintenance'],
  titles: ['Bug Fixer', 'Code Refactorer', 'System Maintainer'],
  icon: <Wrench size={36} />,
  description: 'I provide long-term support, refactor bad code, and write docs.',
  details: {
    howIHelp: `Fixing bugs is more than patching — it’s about improving reliability long term.
I dive deep into broken flows, clean up legacy code, and maintain system health.
Whether it’s performance issues or messy logic, I fix it at the root.`,
    tools: ['Chrome DevTools', 'ESLint', 'Git'],
    stack: ['JS/TS', 'React', 'Next.js', 'Node.js'],
  }
},

{
  title: ['Custom Dashboards'],
  titles: ['Dashboard Builder', 'Analytics Engineer', 'Control Panel Designer'],
  icon: <Monitor size={36} />,
  description: 'Custom visual dashboards for your KPIs and control systems.',
  details: {
    howIHelp:  `I build admin panels and dashboards that turn complex data into clean visuals.
Everything is tailored — from analytics graphs to real-time user controls.
I focus on clarity, responsiveness, and performance.`,
    tools: ['Chart.js', 'Recharts', 'Figma'],
    stack: ['React', 'Tailwind', 'Supabase'],
  }
},


{
  title: ['DevOps & Infra'],
  titles: ['Infrastructure Engineer', 'Linux Tuner', 'Workflow Automator'],
  icon: <Cloud size={36} />,
  description:'I containerize apps, configure servers, and streamline workflows.',
  details: {
    howIHelp: `I streamline dev workflows through Dockerization, automation, and custom server setups.
From local environments to production pipelines, I cover the full lifecycle.
My setups are optimized for performance, scalability, and clarity.` ,
    tools: ['Docker', 'NGINX', 'Linux'],
    stack: ['CLI', 'Shell scripting', 'CI/CD pipelines'],
  }
},


{
  title: ['Database Modeling'],
  titles: ['Database Designer', 'Schema Architect', 'Query Optimizer'],
  icon: <Database size={36} />,
  description: 'I build optimized schemas, design relations, and write secure queries.',
  details: {
    howIHelp: `Databases should be structured, secure, and scalable — that’s my goal.
I design schemas that evolve with your app and queries that run fast under pressure.
Both SQL and NoSQL, with tools like Prisma and Supabase Studio.` ,
    tools: ['Supabase Studio', 'Prisma', 'PgAdmin'],
    stack: ['PostgreSQL', 'MongoDB', 'Prisma'],
  }
},


{
  title: ['Backend Logic & APIs'],
  titles: ['API Architect', 'Middleware Engineer', 'Backend Flow Designer'],
  icon: <Shield size={36} />,
  description: `I design and implement scalable backend logic and robust API endpoints.`,
  details: {
    howIHelp: `I design solid backend logic — clean routes, auth flows, middlewares, and secure APIs.
From building REST endpoints to handling complex business rules — I do it all.
My logic is readable, modular, and always built with scaling in mind.`,
    tools: ['Express', 'Next.js API Routes', 'Zod'],
    stack: ['Node.js', 'REST', 'Middleware', 'Rate limiting'],
  }
}







];

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="services" className="services-section">
      {/* Background Effects */}
      <div className="border-line top" />
      <div className="gradient-ring top-left" />
      <div className="gradient-ring bottom-right" />
      <div className="aurora-streak" />

      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="services-title">SERVICES</h2>
        <p className="services-subtitle">Here’s what I can build, fix, or scale for you:</p>
      </motion.div>

      <div className="services-grid">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="service-card"
            onClick={() => setSelectedService(service)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ rotateX: 4, rotateY: -4 }}
            style={{ perspective: '1000px', cursor: 'pointer' }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-heading">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              { /*<h3>{selectedService.titles}</h3>
              <p className="modal-description">{selectedService.details.howIHelp}</p>  */ }
              {/* Animated Typed Title */}
<motion.h3
  className="typed-title"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <ReactTyped
    strings={selectedService.titles}
    typeSpeed={50}
    backSpeed={30}
    loop
  />
</motion.h3>

{/* Description with subtle animation */}
<motion.p
  className="modal-description enhanced-description"
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
>
  {selectedService.details.howIHelp}
</motion.p>
     {/*
              <div className="modal-tags">
                <strong>Tools:</strong>
                <ul>
                  {selectedService.details.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-tags">
                <strong>Stack:</strong>
                <ul>
                  {selectedService.details.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>    */}





              {/* Tools badges */}
<div className="badge-section">
  <strong>Tools:</strong>
  <div className="badge-container">
    {selectedService.details.tools.map((tool) => (
      <motion.span
        key={tool}
        className="badge tool-badge"
        whileHover={{ scale: 1.1 }}
      >
        {tool}
      </motion.span>
    ))}
  </div>
</div>

{/* Stack badges */}
<div className="badge-section">
  <strong>Stack:</strong>
  <div className="badge-container">
    {selectedService.details.stack.map((tech) => (
      <motion.span
        key={tech}
        className="badge stack-badge"
        whileHover={{ scale: 1.1 }}
      >
        {tech}
      </motion.span>
    ))}
  </div>
</div>


              <button onClick={() => setSelectedService(null)} className="modal-close">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-line bottom" />
    </section>
  );
}
