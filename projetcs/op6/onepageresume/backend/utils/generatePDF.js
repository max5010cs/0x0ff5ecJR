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

  const photoBase64 = photoBuffer
    ? `data:image/jpeg;base64,${photoBuffer.toString('base64')}`
    : null;

  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
      <style>
        @page {
          margin: 20mm 15mm;
        }

        * { box-sizing: border-box; }

        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: #eaeef2;
          color: #333;
          font-size: 11.5px;
        }

        .resume {
          max-width: 850px;
          margin: 0 auto;
          background: #fff;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
        }

        .header {
          background-color: #2f3e55;
          color: white;
          padding: 20px 40px;
          text-align: center;
        }

        .header h1 {
          margin: 0;
          font-size: 20px;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .header p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #ccc;
          font-weight: 400;
        }

        .content {
          display: flex;
        }

        .sidebar {
          width: 30%;
          padding: 25px 20px;
          background: white;
          border-right: 1px solid #ddd;
        }

        .photo {
          text-align: center;
          margin-bottom: 18px;
        }

        .photo img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 6px;
          border: 1.5px solid #ccc;
        }

        .section {
          margin-bottom: 18px;
        }

        .section h3 {
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
          margin-bottom: 6px;
          color: #2f3e55;
          font-weight: 600;
        }

        .section ul {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }

        .section li {
          margin-bottom: 4px;
        }

        .contact li::before { content: '• '; color: #888; margin-right: 4px; }
        .skills li::before { content: '✔ '; color: green; margin-right: 4px; }
        .languages li::before { content: '🌐 '; }
        .hobbies li::before { content: '🎯 '; }

        .main {
          width: 70%;
          padding: 30px 40px;
          position: relative;
        }

        .main .section {
          position: relative;
          padding-left: 20px;
          border-left: 2px solid #ccc;
        }

        .main .entry {
          position: relative;
          margin-bottom: 16px;
        }

        .main .entry::before {
          content: '';
          position: absolute;
          left: -11px;
          top: 5px;
          width: 8px;
          height: 8px;
          background: #2f3e55;
          border-radius: 50%;
        }

        .main .entry strong {
          font-size: 12px;
          font-weight: 600;
          display: block;
          margin-bottom: 2px;
        }

        .main .entry em {
          font-style: normal;
          font-size: 11px;
          color: #555;
          display: block;
        }

        .main .entry small {
          font-size: 10px;
          color: #888;
          display: block;
        }

        .main .entry p {
          margin-top: 4px;
          font-size: 11px;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="resume">
        <div class="header">
          <h1>${escapeHTML(fullName)}</h1>
          ${jobTitle ? `<p>${escapeHTML(jobTitle)}</p>` : ''}
        </div>
        <div class="content">
          <div class="sidebar">
            ${photoBase64 ? `
              <div class="photo">
                <img src="${photoBase64}" alt="photo" />
              </div>` : ''}

            <div class="section">
              <h3>Contact</h3>
              <ul class="contact">
                ${contact.phone ? `<li>${escapeHTML(contact.phone)}</li>` : ''}
                ${contact.email ? `<li>${escapeHTML(contact.email)}</li>` : ''}
                ${contact.location ? `<li>${escapeHTML(contact.location)}</li>` : ''}
                ${contact.linkedin ? `<li>${escapeHTML(contact.linkedin)}</li>` : ''}
                ${contact.github ? `<li>${escapeHTML(contact.github)}</li>` : ''}
                ${contact.telegram ? `<li>${escapeHTML(contact.telegram)}</li>` : ''}
              </ul>
            </div>

            ${skills.length ? `
              <div class="section">
                <h3>Skills</h3>
                <ul class="skills">
                  ${skills.map(s => `<li>${escapeHTML(s)}</li>`).join('')}
                </ul>
              </div>` : ''}

            ${languages.length ? `
              <div class="section">
                <h3>Languages</h3>
                <ul class="languages">
                  ${languages.map(l => `<li>${escapeHTML(l)}</li>`).join('')}
                </ul>
              </div>` : ''}

            ${hobbies.length ? `
              <div class="section">
                <h3>Hobbies</h3>
                <ul class="hobbies">
                  ${hobbies.map(h => `<li>${escapeHTML(h)}</li>`).join('')}
                </ul>
              </div>` : ''}
          </div>

          <div class="main">
            ${about ? `
              <div class="section">
                <h3>Professional Summary</h3>
                <p>${escapeHTML(about)}</p>
              </div>` : ''}

            ${experience.length ? `
              <div class="section">
                <h3>Work Experience</h3>
                ${experience.map(e => `
                  <div class="entry">
                    <strong>${escapeHTML(e.title)}</strong>
                    <em>${escapeHTML(e.company)}</em>
                    <small>${escapeHTML(e.date)}</small>
                    <p>${escapeHTML(e.desc)}</p>
                  </div>`).join('')}
              </div>` : ''}

            ${education.length ? `
              <div class="section">
                <h3>Education</h3>
                ${education.map(e => `
                  <div class="entry">
                    <strong>${escapeHTML(e.degree)}</strong>
                    <em>${escapeHTML(e.school)}</em>
                    <small>${escapeHTML(e.date)}</small>
                  </div>`).join('')}
              </div>` : ''}
          </div>
        </div>
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
    printBackground: true, // ✅ ensure header background color shows
    margin: { top: '0px', bottom: '0px' }, // overridden by @page
  };

  const buffer = await pdf.generatePdf(file, options);
  return buffer;
}

module.exports = generatePDF;
