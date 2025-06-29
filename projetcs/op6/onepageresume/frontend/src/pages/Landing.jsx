// Landing.jsx
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import Lottie from 'lottie-react';
import './Landing.css';

import logoAnim from '../assets/logo3d.json';
import resumeAnim from '../assets/resume.json';
import typingAnim from '../assets/typing.json';
import clickAnim from '../assets/demo-click.json';
import formAnim from '../assets/demo-form.json';
import downloadAnim from '../assets/demo-download.json';

export default function Landing() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div>
<header className="header">
  <div className="logo-text">OnePageResume<span className="dot">.ai</span></div>
  <div className="header-right">
    <div className="theme-toggle-wrap">
      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
    <div className="logo-3d">
      <Lottie animationData={logoAnim} loop={true} className="logo-animation" />
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section className="hero">
        <div className="creative-grid">
          <div className="hero-text">
            <h1 className="hero-title">AI-Powered Resumes, Designed to Impress</h1>
            <p className="hero-sub">
              <Typewriter
                options={{
                  strings: ['Clean. Fast. One Page.', 'Download in 10 Seconds.'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </p>
            <button className="cta-button" onClick={() => window.location.href = '/app'}>
              Build Yours Now
            </button>
          </div>
          <div className="hero-visual">
            <Lottie animationData={resumeAnim} loop={true} className="hero-img-animated" />
          </div>
        </div>
      </section>

<div className="demo-row">
  <div className="demo-item">
    <Lottie animationData={clickAnim} loop={true} />
    <p className="demo-caption">Click Start</p>
  </div>
  <div className="demo-item">
    <Lottie animationData={formAnim} loop={true} />
    <p className="demo-caption">Fill Details</p>
  </div>
  <div className="demo-item">
    <Lottie animationData={downloadAnim} loop={true} />
    <p className="demo-caption">Download Resume</p>
  </div>
</div>




      {/* How It Works Section 
      <section className="how-section">
        <div className="how-grid">
          <div className="step-carousel">
            <div className="step-item">1. Enter your info, job title & skills.</div>
            <div className="step-item">2. AI generates resume in real-time.</div>
            <div className="step-item">3. Download beautiful PDF instantly.</div>
          </div>
          <div className="how-animation">
            <Lottie animationData={typingAnim} loop={true} className="how-visual" />
          </div>
        </div>
      </section> */}

      {/* Testimonials 
      <section className="testimonials">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">“Best resume I’ve ever had. Took me 3 minutes!” — Alex</div>
          <div className="testimonial-card">“I applied to 12 jobs and got 5 replies.” — Noor</div>
          <div className="testimonial-card">“Way better than Canva or Word templates.” — Taylor</div>
        </div>
      </section>  */}

      {/* Final CTA */}
      <section className="cta-section">
        <h2 className="cta-heading">Try It Free – No Signup</h2>
        <button className="cta-button large" onClick={() => window.location.href = '/app'}>
          Start Generating
        </button>
      </section>

      <footer className="footer">
        Built by maxops | 2025
      </footer>
    </div>
  );
}