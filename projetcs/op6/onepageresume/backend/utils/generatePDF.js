const pdf = require('html-pdf-node');

function generateResumeHTML(rawText) {
  const safeText = String(rawText)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 50px;
            color: #333;
            font-size: 13px;
            line-height: 1.6;
          }
          h1, h2 {
            margin-bottom: 10px;
          }
          br + br {
            line-height: 2;
          }
        </style>
      </head>
      <body>
        ${safeText}
      </body>
    </html>
  `;
}

async function generatePDF(rawText) {
  const html = generateResumeHTML(rawText);
  const file = { content: html };

  const options = {
    format: 'A4',
    margin: { top: '40px', bottom: '40px' },
  };

  const buffer = await pdf.generatePdf(file, options);
  return buffer;
}

module.exports = generatePDF;
