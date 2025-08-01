const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const {
    fullName,
    jobTitle,
    about,
    phone,
    email,
    location,
    linkedin,
    github,
    telegram,
    languages,
    hobbies,
    experience,
    education,
    skills,
    style = 'Modern',
    language = 'English',
  } = req.body;

const prompt = `
You are an expert resume writer and career coach AI.

Your task is to generate a **professional one-page resume** in structured **JSON format**, based on the user's raw inputs.

🧠 IMPORTANT INSTRUCTIONS:
- Write the resume in **${language}**.
- Use a **${style}** tone and writing vibe (e.g., if 'Creative', be imaginative and vibrant; if 'Minimal', keep it clean and concise).
- Rewrite basic terms (like "CSS" or "football") into **professional, resume-worthy phrasing**.
- Use bullet-style summaries and recruiter-attractive language.
- Fill in missing detail where needed — write like a human expert would.
- Use confident and polished tone throughout.

⚠️ OUTPUT FORMAT:
- Do NOT include any explanation, pre-text, or \`\`\`json wrappers.
- Return a clean JSON object in the exact shape below.
- Values like "skills", "languages", and "hobbies" must be arrays of **complete, expanded strings** (not keywords).

JSON structure:
{
  "fullName": "",
  "jobTitle": "",
  "about": "",
  "contact": {
    "phone": "",
    "email": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "telegram": ""
  },
  "languages": [],
  "hobbies": [],
  "experience": [
    {
      "company": "",
      "title": "",
      "date": "",
      "desc": ""
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "date": ""
    }
  ],
  "skills": []
}

Use this input:
===
Full Name: ${fullName}
Target Job Title: ${jobTitle}
About: ${about}
Phone: ${phone}
Email: ${email}
Location: ${location}
LinkedIn: ${linkedin}
GitHub: ${github}
Telegram: ${telegram}
Languages: ${languages.join(', ')}
Hobbies: ${hobbies.join(', ')}

Experience:
${experience.map((e, i) =>
  `${i + 1}. ${e.title} at ${e.company} (${e.date}) — ${e.desc}`).join('\n')}

Education:
${education.map((e, i) =>
  `${i + 1}. ${e.degree} - ${e.school} (${e.date})`).join('\n')}

Skills: ${skills.join(', ')}
Selected Writing Style: ${style}
Target Output Language: ${language}
===

ONLY return the final structured JSON resume. Do not explain anything.
`;


  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'tngtech/deepseek-r1t2-chimera:free',    // deepseek/deepseek-chat:free
        messages: [
          { role: 'system', content: 'You generate professional resumes in strict JSON format.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let raw = response.data.choices?.[0]?.message?.content || '';
    console.log('\n------ START OF AI JSON RESPONSE ------\n' + raw + '\n------ END OF AI RESPONSE ------');

    // Clean potential wrapping from backticks or markdown
    const cleanJSON = raw.trim().replace(/^```(?:json)?|```$/g, '').trim();

    try {
      const parsed = JSON.parse(cleanJSON);
      return res.json(parsed);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return res.status(500).json({ error: 'Invalid JSON format from AI.', raw: cleanJSON });
    }
  }

  /*
  catch (openRouterError) {
    console.warn('⚠️ OpenRouter failed:', openRouterError?.response?.data || openRouterError.message);

    try {
      const gptChat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You generate structured JSON resumes.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
      });

      const gptResponse = gptChat.choices[0]?.message?.content || '';
      const fallbackParsed = JSON.parse(gptResponse);
      return res.json(fallbackParsed);
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
