import { useState } from 'react';
import axios from 'axios';
import ResumePreview from '../components/ResumePreview';
import './Home.css';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [about, setAbout] = useState('');
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
      const res = await axios.post('http://localhost:3001/api/generate', {
        fullName,
        jobTitle,
        about,
        experience,
        education,
        skills: skills.split(',').map((s) => s.trim()),
        language,
        style,
      });
      setResumeText(res.data);
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
      const response = await axios.post(
        'http://localhost:3001/api/export-pdf',
        resumeText, // ✅ raw string only
        {
          headers: {
            'Content-Type': 'text/plain',
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
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
        <input
          type="text"
          className="input-field"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Target Job Title</label>
        <input
          type="text"
          className="input-field"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label>About</label>
        <textarea
          className="textarea-field"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label>Language</label>
        <select
          className="input-field"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>

        <label>Style</label>
        <select
          className="input-field"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="Modern">Modern</option>
          <option value="Minimal">Minimal</option>
          <option value="Creative">Creative</option>
        </select>
      </div>

      <div className="form-section">
        <h2>Experience</h2>
        {experience.map((e, i) => (
          <div key={i} className="entry-box">
            <input
              className="input-field"
              placeholder="Company"
              value={e.company}
              onChange={(ev) => {
                const copy = [...experience];
                copy[i].company = ev.target.value;
                setExperience(copy);
              }}
            />
            <input
              className="input-field"
              placeholder="Title"
              value={e.title}
              onChange={(ev) => {
                const copy = [...experience];
                copy[i].title = ev.target.value;
                setExperience(copy);
              }}
            />
            <input
              className="input-field"
              placeholder="Date"
              value={e.date}
              onChange={(ev) => {
                const copy = [...experience];
                copy[i].date = ev.target.value;
                setExperience(copy);
              }}
            />
            <textarea
              className="textarea-field"
              placeholder="Description"
              value={e.desc}
              onChange={(ev) => {
                const copy = [...experience];
                copy[i].desc = ev.target.value;
                setExperience(copy);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddExperience} className="add-button">
          + Add More Experience
        </button>
      </div>

      <div className="form-section">
        <h2>Education</h2>
        {education.map((e, i) => (
          <div key={i} className="entry-box">
            <input
              className="input-field"
              placeholder="School"
              value={e.school}
              onChange={(ev) => {
                const copy = [...education];
                copy[i].school = ev.target.value;
                setEducation(copy);
              }}
            />
            <input
              className="input-field"
              placeholder="Degree"
              value={e.degree}
              onChange={(ev) => {
                const copy = [...education];
                copy[i].degree = ev.target.value;
                setEducation(copy);
              }}
            />
            <input
              className="input-field"
              placeholder="Date"
              value={e.date}
              onChange={(ev) => {
                const copy = [...education];
                copy[i].date = ev.target.value;
                setEducation(copy);
              }}
            />
          </div>
        ))}
        <button onClick={handleAddEducation} className="add-button">
          + Add More Education
        </button>
      </div>

      <div className="form-section">
        <label>Skills (comma-separated)</label>
        <input
          className="input-field"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
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
