const express = require('express');
const router = express.Router();
const multer = require('multer');
const generatePDF = require('../utils/generatePDF');

// Handle multipart/form-data for photo upload
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const json = JSON.parse(req.body.resumeData || '{}');
    const photoBuffer = req.file ? req.file.buffer : null;
    const theme = req.body.theme || 'blue'; // 👈 extract theme from form data

    const pdfBuffer = await generatePDF(json, photoBuffer, theme);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('❌ PDF generation error:', err);
    res.status(500).json({ error: 'Failed to generate PDF', details: err.message });
  }
});

module.exports = router;
