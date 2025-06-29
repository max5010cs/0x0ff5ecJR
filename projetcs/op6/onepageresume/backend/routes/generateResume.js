const express = require('express');
const router = express.Router();
const axios = require('axios');

// 🔁 OPTIONAL: Uncomment when switching to OpenAI GPT (requires billing)
// const { OpenAI } = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const {
    fullName,
    jobTitle,
    about,
    experience,
    education,
    skills,
    style = 'modern',     // e.g., 'classic', 'minimal'
    language = 'English', // e.g., 'English', 'Spanish'
  } = req.body;

  // 🧠 AI Prompt
const prompt = `
You are an expert resume writer with deep knowledge of modern hiring practices.

Your task is to create a polished, recruiter-friendly, and ATS-optimized one-page resume from the provided structured data.

✦ Return the resume in **well-formatted plain text** (not JSON, not Markdown).
✦ Use clear section headers: "Summary", "Experience", "Education", and "Skills".
✦ Write in confident, professional, and concise language.
✦ Expand short inputs with realistic professional phrasing.
✦ The resume should look ready to paste into a document or export as a PDF.
✦ Maintain readability and logical flow, as if written by a human expert.

Input:
===
Full Name: ${fullName}
Target Job Title: ${jobTitle}
About: ${about}

Experience:
${experience.map((e, i) =>
  `${i + 1}. ${e.title} at ${e.company} (${e.date}) — ${e.desc}`).join('\n')}

Education:
${education.map((e, i) =>
  `${i + 1}. ${e.degree} - ${e.school} (${e.date})`).join('\n')}

Skills: ${skills.join(', ')}
===

Format the resume output as follows:
------------------------------
FULL NAME  
TARGET JOB TITLE

Summary:  
...

Experience:  
...

Education:  
...

Skills:  
...
------------------------------
Only return the resume text. No additional explanation.
`;


  // ✅ MAIN: OpenRouter Request
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat:free',
        messages: [
          { role: 'system', content: 'You format resumes into elegant, clean plain text.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = response.data.choices?.[0]?.message?.content || '';
    console.log('\n------ START OF AI RESPONSE ------\n' + raw + '\n------ END OF AI RESPONSE ------');
    return res.send(raw); // plain text resume
  }

  // 🔁 FALLBACK: GPT-3.5/4 (uncomment below when ready)
  /*
  catch (openRouterError) {
    console.warn('⚠️ OpenRouter failed:', openRouterError?.response?.data || openRouterError.message);

    try {
      const gptChat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // or 'gpt-4'
        messages: [
          { role: 'system', content: 'You generate professional resumes in clean plain text.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
      });

      const gptResponse = gptChat.choices[0]?.message?.content || '';
      console.log('\n✅ Fallback GPT response:\n' + gptResponse);
      return res.send(gptResponse);
    } catch (gptError) {
      console.error('❌ GPT fallback failed:', gptError?.response?.data || gptError.message);
      return res.status(500).json({ error: 'Both AI providers failed.', details: gptError.message });
    }
  }
  */

  catch (err) {
    console.error('❌ AI request failed:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Resume generation failed.', details: err.message });
  }
});

module.exports = router;
