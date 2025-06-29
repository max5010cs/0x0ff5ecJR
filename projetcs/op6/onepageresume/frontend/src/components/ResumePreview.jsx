import './ResumePreview.css';

export default function ResumePreview({ json, onClose, onDownload }) {
  const resume = json;

  return (
    <div className="modal-overlay">
      <div className="modal-content resume-preview-modal">
        <div className="modal-header">
          <h2>Resume Preview</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        <div className="resume-container">
          {/* Header */}
          <div className="resume-header">
            <h1>{resume.fullName}</h1>
            <h3>{resume.jobTitle}</h3>
          </div>

          {/* Summary */}
          {resume.about && (
            <div className="resume-section">
              <h4>Summary</h4>
              <p>{resume.about}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="resume-section">
            <h4>Contact</h4>
            <ul>
              {resume.contact?.phone && <li><strong>Phone:</strong> {resume.contact.phone}</li>}
              {resume.contact?.email && <li><strong>Email:</strong> {resume.contact.email}</li>}
              {resume.contact?.location && <li><strong>Location:</strong> {resume.contact.location}</li>}
              {resume.contact?.linkedin && <li><strong>LinkedIn:</strong> {resume.contact.linkedin}</li>}
              {resume.contact?.github && <li><strong>GitHub:</strong> {resume.contact.github}</li>}
              {resume.contact?.telegram && <li><strong>Telegram:</strong> {resume.contact.telegram}</li>}
            </ul>
          </div>

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <div className="resume-section">
              <h4>Experience</h4>
              {resume.experience.map((e, i) => (
                <div key={i} className="entry-block">
                  <p><strong>{e.title}</strong> at <em>{e.company}</em> ({e.date})</p>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <div className="resume-section">
              <h4>Education</h4>
              {resume.education.map((e, i) => (
                <div key={i} className="entry-block">
                  <p><strong>{e.degree}</strong> – {e.school} ({e.date})</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <div className="resume-section">
              <h4>Skills</h4>
              <ul>
                {resume.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {resume.languages?.length > 0 && (
            <div className="resume-section">
              <h4>Languages</h4>
              <ul>
                {resume.languages.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          )}

          {/* Hobbies */}
          {resume.hobbies?.length > 0 && (
            <div className="resume-section">
              <h4>Hobbies & Interests</h4>
              <ul>
                {resume.hobbies.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onDownload} className="download-btn">Download PDF</button>
        </div>
      </div>
    </div>
  );
}
