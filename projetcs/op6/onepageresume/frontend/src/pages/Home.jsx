import { useState } from 'react';
import ResumePreview from '../components/ResumePreview';
import './Home.css';

const API_BASE =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001'
    : 'https://zerox0ff5ecjr.onrender.com';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [telegram, setTelegram] = useState('');
  const [languages, setLanguages] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [experience, setExperience] = useState([{ company: '', title: '', date: '', desc: '' }]);
  const [education, setEducation] = useState([{ school: '', degree: '', date: '' }]);
  const [skills, setSkills] = useState('');
  const [language, setLanguage] = useState('English');
  const [style, setStyle] = useState('Modern');

  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleAddExperience = () => {
    setExperience([...experience, { company: '', title: '', date: '', desc: '' }]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { school: '', degree: '', date: '' }]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          jobTitle,
          about,
          phone,
          email,
          location,
          linkedin,
          github,
          telegram,
          languages: languages.split(',').map((l) => l.trim()),
          hobbies: hobbies.split(',').map((h) => h.trim()),
          experience,
          education,
          skills: skills.split(',').map((s) => s.trim()),
          language,
          style,
        }),
      });

      const text = await res.text();
      setResumeText(text);
      setShowPreview(true);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/export-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: resumeText,
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF.');
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Build Your One-Page Resume</h1>

      <div className="form-section">
        <label>Full Name</label>
        <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Target Job Title</label>
        <input className="input-field" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

        <label>About</label>
        <textarea className="textarea-field" value={about} onChange={(e) => setAbout(e.target.value)} />

        <h2>Contact Info</h2>
        <input className="input-field" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input-field" placeholder="Location (City, Country)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input className="input-field" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        <input className="input-field" placeholder="GitHub or Portfolio URL" value={github} onChange={(e) => setGithub(e.target.value)} />
        <input className="input-field" placeholder="Telegram (optional)" value={telegram} onChange={(e) => setTelegram(e.target.value)} />

        <label>Languages (comma-separated with level)</label>
        <input className="input-field" value={languages} onChange={(e) => setLanguages(e.target.value)} />

        <label>Hobbies & Interests</label>
        <input className="input-field" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />

        <label>Language</label>
        <select className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>

        <label>Style</label>
        <select className="input-field" value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="Modern">Modern</option>
          <option value="Minimal">Minimal</option>
          <option value="Creative">Creative</option>
        </select>
      </div>

      <div className="form-section">
        <h2>Experience</h2>
        {experience.map((e, i) => (
          <div key={i} className="entry-box">
            <input className="input-field" placeholder="Company" value={e.company} onChange={(ev) => {
              const copy = [...experience];
              copy[i].company = ev.target.value;
              setExperience(copy);
            }} />
            <input className="input-field" placeholder="Title" value={e.title} onChange={(ev) => {
              const copy = [...experience];
              copy[i].title = ev.target.value;
              setExperience(copy);
            }} />
            <input className="input-field" placeholder="Date" value={e.date} onChange={(ev) => {
              const copy = [...experience];
              copy[i].date = ev.target.value;
              setExperience(copy);
            }} />
            <textarea className="textarea-field" placeholder="Description" value={e.desc} onChange={(ev) => {
              const copy = [...experience];
              copy[i].desc = ev.target.value;
              setExperience(copy);
            }} />
          </div>
        ))}
        <button onClick={handleAddExperience} className="add-button">+ Add More Experience</button>
      </div>

      <div className="form-section">
        <h2>Education</h2>
        {education.map((e, i) => (
          <div key={i} className="entry-box">
            <input className="input-field" placeholder="School" value={e.school} onChange={(ev) => {
              const copy = [...education];
              copy[i].school = ev.target.value;
              setEducation(copy);
            }} />
            <input className="input-field" placeholder="Degree" value={e.degree} onChange={(ev) => {
              const copy = [...education];
              copy[i].degree = ev.target.value;
              setEducation(copy);
            }} />
            <input className="input-field" placeholder="Date" value={e.date} onChange={(ev) => {
              const copy = [...education];
              copy[i].date = ev.target.value;
              setEducation(copy);
            }} />
          </div>
        ))}
        <button onClick={handleAddEducation} className="add-button">+ Add More Education</button>
      </div>

      <div className="form-section">
        <label>Skills (comma-separated)</label>
        <input className="input-field" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>

      <button className="submit-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>

      {showPreview && (
        <ResumePreview
          text={resumeText}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownloadPDF}
        />
      )}
    </div>
  );
}
