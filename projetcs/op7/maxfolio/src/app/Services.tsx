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
    titles: ['Full-Stack Developer', 'Next.js Engineer', 'MERN Architect'],
    icon: <Code size={36} />,
    description: 'Fast, secure full-stack apps using React, Next.js, Node.js, Supabase.',
    details: {
      howIHelp: 'I can develop complete scalable applications from frontend to backend.',
      tools: ['VS Code', 'Postman', 'ESLint', 'Prettier'],
      stack: ['React', 'Next.js', 'Node.js', 'Supabase', 'Tailwind', 'MongoDB', 'PostgreSQL'],
    }
  },
  {
    titles: ['UI/UX Designer', 'Product Thinker', 'Figma Specialist'],
    icon: <PenTool size={36} />,
    description: 'User-first designs with Figma and CSS that look & feel great.',
    details: {
      howIHelp: 'I design clean, intuitive user interfaces and seamless user flows.',
      tools: ['Figma', 'Framer', 'Adobe XD'],
      stack: ['CSS Flex/Grid', 'Tailwind', 'Framer Motion', 'Shadcn/UI'],
    }
  },
  {
    titles: ['DevOps Engineer', 'Cloud Specialist', 'CI/CD Automator'],
    icon: <Rocket size={36} />,
    description: 'CI/CD, cloud infra, and smooth deploys via Vercel, Render or VPS.',
    details: {
      howIHelp: 'I can set up environments, optimize deployments, and scale apps.',
      tools: ['Vercel', 'Render', 'Nginx', 'PM2'],
      stack: ['Docker', 'GitHub Actions', 'Linux CLI'],
    }
  },
  {
    titles: ['Bug Fixer', 'Code Refactorer', 'System Maintainer'],
    icon: <Wrench size={36} />,
    description: 'Fixing bugs, performance issues, and keeping systems healthy.',
    details: {
      howIHelp: 'I provide long-term support, refactor bad code, and write docs.',
      tools: ['Chrome DevTools', 'ESLint', 'Git'],
      stack: ['JS/TS', 'React', 'Next.js', 'Node.js'],
    }
  },
  {
    titles: ['Dashboard Builder', 'Analytics Engineer', 'Control Panel Designer'],
    icon: <Monitor size={36} />,
    description: 'Building powerful admin panels and analytic dashboards.',
    details: {
      howIHelp: 'Custom visual dashboards for your KPIs and control systems.',
      tools: ['Chart.js', 'Recharts', 'Figma'],
      stack: ['React', 'Tailwind', 'Supabase'],
    }
  },
  {
    titles: ['Infrastructure Engineer', 'Linux Tuner', 'Workflow Automator'],
    icon: <Cloud size={36} />,
    description: 'Automation, infra setup, and system-level optimizations.',
    details: {
      howIHelp: 'I containerize apps, configure servers, and streamline workflows.',
      tools: ['Docker', 'NGINX', 'Linux'],
      stack: ['CLI', 'Shell scripting', 'CI/CD pipelines'],
    }
  },
  {
    titles: ['Database Designer', 'Schema Architect', 'Query Optimizer'],
    icon: <Database size={36} />,
    description: 'Designing performant schemas for SQL & NoSQL databases.',
    details: {
      howIHelp: 'I build optimized schemas, design relations, and write secure queries.',
      tools: ['Supabase Studio', 'Prisma', 'PgAdmin'],
      stack: ['PostgreSQL', 'MongoDB', 'Prisma'],
    }
  },
  {
    titles: ['App Security Expert', 'Auth Engineer', 'Secure Code Enforcer'],
    icon: <Shield size={36} />,
    description: 'Protecting your apps with strong auth and secure best practices.',
    details: {
      howIHelp: 'I implement auth flows, encryption, and input sanitization.',
      tools: ['JWT', 'Bcrypt', 'Helmet.js'],
      stack: ['NextAuth.js', 'OAuth', 'Rate limiting'],
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
            <h3 className="service-heading">{service.titles}</h3>
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
