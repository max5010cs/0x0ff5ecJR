const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf-node');

function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateResumeHTML(resumeJson, photoBuffer = null) {
  const {
    fullName = '',
    jobTitle = '',
    about = '',
    contact = {},
    languages = [],
    hobbies = [],
    experience = [],
    education = [],
    skills = [],
  } = resumeJson;

  const photoBase64 = photoBuffer ? `data:image/jpeg;base64,${photoBuffer.toString('base64')}` : null;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 40px;
            color: #333;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #444;
            padding-bottom: 10px;
          }
          .photo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
          h2 {
            margin: 30px 0 10px;
            font-size: 18px;
            border-bottom: 1px solid #aaa;
          }
          ul {
            padding-left: 20px;
            margin: 0;
          }
          .section {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${escapeHTML(fullName)}</h1>
            <p><strong>${escapeHTML(jobTitle)}</strong></p>
          </div>
          ${photoBase64 ? `<img class="photo" src="${photoBase64}" alt="photo" />` : ''}
        </div>

        <div class="section">
          <h2>About</h2>
          <p>${escapeHTML(about)}</p>
        </div>

        <div class="section">
          <h2>Contact</h2>
          <p>📞 ${escapeHTML(contact.phone)} | ✉️ ${escapeHTML(contact.email)} | 📍 ${escapeHTML(contact.location)}</p>
          <p>🔗 ${escapeHTML(contact.linkedin)} | 💻 ${escapeHTML(contact.github)} | 📨 ${escapeHTML(contact.telegram)}</p>
        </div>

        <div class="section">
          <h2>Skills</h2>
          <ul>${skills.map(skill => `<li>${escapeHTML(skill)}</li>`).join('')}</ul>
        </div>

        <div class="section">
          <h2>Languages</h2>
          <ul>${languages.map(l => `<li>${escapeHTML(l)}</li>`).join('')}</ul>
        </div>

        <div class="section">
          <h2>Hobbies</h2>
          <ul>${hobbies.map(h => `<li>${escapeHTML(h)}</li>`).join('')}</ul>
        </div>

        <div class="section">
          <h2>Experience</h2>
          ${experience.map(e => `
            <p><strong>${escapeHTML(e.title)}</strong> at ${escapeHTML(e.company)} (${escapeHTML(e.date)})<br>
            ${escapeHTML(e.desc)}</p>
          `).join('')}
        </div>

        <div class="section">
          <h2>Education</h2>
          ${education.map(e => `
            <p><strong>${escapeHTML(e.degree)}</strong> - ${escapeHTML(e.school)} (${escapeHTML(e.date)})</p>
          `).join('')}
        </div>
      </body>
    </html>
  `;
}

async function generatePDF(resumeJson, photoBuffer = null) {
  const html = generateResumeHTML(resumeJson, photoBuffer);
  const file = { content: html };

  const options = {
    format: 'A4',
    margin: { top: '40px', bottom: '40px' },
  };

  const buffer = await pdf.generatePdf(file, options);
  return buffer;
}

module.exports = generatePDF;