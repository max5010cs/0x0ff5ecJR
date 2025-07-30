'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Services.css';
import {
  Code, PenTool, Rocket, Wrench, Monitor,
  Cloud, Database, Shield, Globe, Layers
} from 'lucide-react';

const services = [
  {
    title: 'Full-Stack Development',
    icon: <Code size={36} />,
    description: 'Building fast, scalable, and secure web apps using modern stacks like React, Next.js, Node.js, and Supabase.'
  },
  {
    title: 'UI/UX Design',
    icon: <PenTool size={36} />,
    description: 'Creating intuitive, user-centric interfaces with Figma and CSS magic to ensure beautiful design across devices.'
  },
  {
    title: 'Cloud & Deployment',
    icon: <Rocket size={36} />,
    description: 'From CI/CD pipelines to cloud architecture, I deploy and scale your app using Vercel, Render, or custom infra.'
  },
  {
    title: 'Debugging & Maintenance',
    icon: <Wrench size={36} />,
    description: 'I offer long-term support and debugging services with clear communication and solid documentation.'
  },
  {
    title: 'Custom Dashboards',
    icon: <Monitor size={36} />,
    description: 'Crafting powerful admin panels and analytics dashboards tailored to your business logic and KPIs.'
  },
  {
    title: 'DevOps & Infra',
    icon: <Cloud size={36} />,
    description: 'Docker, NGINX, cloud compute, and automated deployments – let’s keep your stack smooth and modern.'
  },
  {
    title: 'Database Modeling',
    icon: <Database size={36} />,
    description: 'Designing performant relational/NoSQL schemas with Supabase, PostgreSQL, MongoDB, and Prisma.'
  },
  {
    title: 'App Security',
    icon: <Shield size={36} />,
    description: 'Implementing authentication, rate limiting, encryption, and best practices to protect your users and data.'
  },
  {
    title: 'API Integrations',
    icon: <Globe size={36} />,
    description: 'Whether Stripe, Telegram, OpenAI or custom services — I connect your app to the world.'
  },
  {
    title: 'Component Libraries',
    icon: <Layers size={36} />,
    description: 'Reusable React components with shadcn/ui, Framer Motion, and Lucide make your codebase elegant.'
  },

    {
    title: 'Component Libraries',
    icon: <Layers size={36} />,
    description: 'Reusable React components with shadcn/ui, Framer Motion, and Lucide make your codebase elegant.'
  },

    {
    title: 'Component Libraries',
    icon: <Layers size={36} />,
    description: 'Reusable React components with shadcn/ui, Framer Motion, and Lucide make your codebase elegant.'
  }


];

export default function Services() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="services" className="services-section">



      {/* 🌌 Background Effects */}
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
        <p className="services-subtitle">Here’s what I can build, break, or scale for you:</p>
      </motion.div>

      <div className="services-grid">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ rotateX: 4, rotateY: -4 }}
            style={{ perspective: '1000px' }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-heading">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </motion.div>
        ))}
      </div>



  <div className="border-line bottom" />
    </section>
  );
}


