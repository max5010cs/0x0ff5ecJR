const express = require('express');
const router = express.Router();
const generatePDF = require('../utils/generatePDF');

// Accept raw string resume text
router.use(express.text({ type: '*/*', limit: '1mb' }));

router.post('/', async (req, res) => {
  try {
    const rawText = typeof req.body === 'string' ? req.body : req.body.toString();

    const pdfBuffer = await generatePDF(rawText);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
