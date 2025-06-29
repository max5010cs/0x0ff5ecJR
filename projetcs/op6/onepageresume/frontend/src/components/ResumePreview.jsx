import './ResumePreview.css';

export default function ResumePreview({ text, onClose, onDownload }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in">
        <div className="modal-header">
          <h2>Your Generated Resume</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        <div className="modal-body">
          <pre className="resume-text">{text}</pre>
        </div>

        <div className="modal-footer">
          <button onClick={onDownload} className="download-btn">Download PDF</button>
        </div>
      </div>
    </div>
  );
}
