export const chatbotIntro = "Hey, I'm Mubix AI 👋\nAsk anything about Mohammed Mubashir, projects, skills, or education.";

export const quickReplies = [
  "Who are you?",
  "BTech Degree?",
  "Mubix Prompt Maker?",
  "Skills & Tech?",
  "Freelance Work?",
];

export const fallback = `Hmm 👀
I'm still learning that answer.
Try asking about:
• BTech degree
• Mubix Prompt Maker
• Football Leaders Academy
• skills & tools
• contact info
• AI & SEO expertise`;

const responses = [
  {
    keywords: ["who are you", "who is mubashir", "about you", "tell me about yourself", "developer name"],
    answer: "I’m Mohammed Mubashir (alternate name: Mubix), a Full Stack & AI Developer from Aurangabad, Maharashtra, India. I am pursuing BTech in Computer Science.",
  },
  {
    keywords: ["what do you do", "what is your work", "what do you build", "services"],
    answer: "I build high-performance web systems, custom interactive operating systems, prompt engineering wizards, and AI automations. I also specialize in Google and AI Search Optimization (GEO).",
  },
  {
    keywords: ["skills", "technologies", "tech stack", "programming languages", "tools"],
    answer: "My core skills include: AI Tools, Prompt Engineering, Frontend Development, Web Development, SEO, AI Automation, and UI/UX Design. Technologies I use: HTML5, CSS3, JavaScript, PHP, Python, SQL Server, MySQL, C#, GitHub, and Vercel.",
  },
  {
    keywords: ["education", "degree", "qualification", "btech", "study", "college"],
    answer: "I am pursuing a Bachelor of Technology (BTech) in Computer Science. I also completed a Diploma in Computer Engineering from P.E.S College with a score of 76.69%.",
  },
  {
    keywords: ["where are you", "location", "city", "country", "aurangabad", "maharashtra", "india"],
    answer: "I am based in Aurangabad, Maharashtra, India.",
  },
  {
    keywords: ["what is mubix", "mubix name", "brand"],
    answer: "Mubix is the official personal brand and developer identity of Mohammed Mubashir.",
  },
  {
    keywords: ["freelance", "collaboration", "hire", "open to work", "work together"],
    answer: "Yes, I am actively open for freelance work, web design projects, AI integration work, and technical collaborations. You can message me via the Google Form on the contact section! ⚡",
  },
  {
    keywords: ["contact", "reach", "email", "message", "socials", "links"],
    answer: "You can find all my social links (LinkedIn, GitHub, Instagram, Twitter) in the contact section. To send a direct inquiry, click the 'Start a Project' or floating message button to open my contact Google Form.",
  },
  {
    keywords: ["projects", "what have you built", "portfolio projects", "builds"],
    answer: "My featured projects include:\n1. Mubix Prompt Maker (an AI prompt wizard)\n2. Football Leaders Academy Website (full academy CMS)\n3. MUBIX OS (browser-based simulated operating system)\n4. Mom's Book Portfolio (elegant book showcase website).",
  },
  {
    keywords: ["mom", "book portfolio", "mother", "nazia afreen", "fan ka tohfa"],
    answer: "Mom's Book Portfolio is a clean, modern, and emotional showcase website built with React, Vite, Tailwind CSS, and Framer Motion for Nazia Afreen's book & drawing portfolio. Try it: https://fan-ka-tohfa-nazia-afreen.vercel.app",
  },
  {
    keywords: ["mubix prompt maker", "prompt maker", "prompt builder", "prompt wizard"],
    answer: "Mubix Prompt Maker is an AI-powered system designed to construct structured, high-efficiency prompts for LLMs. It features a complexity-gated 9-step wizard, interactive footer telemetry, and secure validation.",
  },
  {
    keywords: ["football academy", "football leaders", "football website"],
    answer: "The Football Leaders Academy Website is a management platform featuring player registrations, PHP/MySQL backend, AI Support chatbot, QR player verification, and secure payment integrations.",
  },
  {
    keywords: ["mubix os", "browser os", "web operating system", "web os"],
    answer: "MUBIX OS is a simulated cloud desktop environment built in React. It features multi-window task management, a virtual filesystem, a functional developer terminal shell, text editors, settings dashboards, and retro arcade games. Try it: https://mubix-os.vercel.app/",
  },
  {
    keywords: ["ai", "prompt engineering", "automation", "llm"],
    answer: "I specialize in prompt engineering architectures, context window optimization, AI chatbot integrations, and LLM-crawler discoverability structures.",
  },
  {
    keywords: ["seo", "geo", "search engine optimization", "discoverability"],
    answer: "I implement advanced 2026-level SEO and GEO (Generative Engine Optimization) principles. This ensures websites and profiles are properly parsed, indexed, and referenced by traditional search engines and AI engines like ChatGPT, Claude, Perplexity, and Gemini.",
  },
  {
    keywords: ["design style", "brutalist", "ui", "ux"],
    answer: "I love creative neo-brutalist and high-contrast comic layouts that stand out from generic corporate designs while retaining high accessibility standards.",
  },
  {
    keywords: ["github", "repository", "source code"],
    answer: "My GitHub profile is @mubashirsys-dev (https://github.com/mubashirsys-dev). I publish open-source systems there like MUBIX OS.",
  },
  {
    keywords: ["linkedin", "professional profile"],
    answer: "Connect with me on LinkedIn: https://www.linkedin.com/in/mohammed-mubashir-aa62a440a",
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo", "greeting"],
    answer: "Hello! 👋 I'm Mubix AI, the virtual branding assistant of Mohammed Mubashir. Ask me about his BTech degree, skills, or projects!",
  }
];

export function getBotResponse(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return fallback;

  for (const r of responses) {
    if (r.keywords.some((kw) => lower.includes(kw))) {
      return r.answer;
    }
  }
  return fallback;
}
