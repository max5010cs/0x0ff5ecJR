// src/utils/api.js

const API_BASE =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001'
    : 'https://zerox0ff5ecjr.onrender.com'; // ✅ your live backend

export const generateResume = async (data) => {
  const response = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return await response.text(); // resume is plain text
};

export const exportPDF = async (resumeText) => {
  const response = await fetch(`${API_BASE}/api/export-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: resumeText,
  });

  return response.blob(); // for downloading
};
