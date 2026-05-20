export const chatbotIntro = "Hey, I'm Mubix AI 👋\nAsk anything about Mohammed Mubashir, projects, skills, or contact.";

export const quickReplies = [
  "Skills?",
  "Projects?",
  "Contact?",
  "Resume?",
  "Education?",
];

const responses = [
  {
    keywords: ["skill", "tech", "stack", "technology", "know", "programming", "language"],
    answer:
      "Mubashir works with HTML, CSS, JavaScript, PHP, Python, C#, Java, SQL Server, and tools like GitHub and Vercel. He's currently expanding into AI and full-stack development! 💻",
  },
  {
    keywords: ["project", "build", "made", "work", "portfolio"],
    answer:
      "He's built 3 key projects:\n\n1️⃣ **College Management System** — A C# + SQL Server desktop app with AI chatbot integration.\n2️⃣ **Football Academy Website** — A responsive PHP website for a football academy.\n3️⃣ **Book Portfolio Website** — A Vercel-deployed showcase site for an author.\n\nScroll to the Projects section to see them all!",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "whatsapp", "hire", "message"],
    answer:
      "You can reach Mubashir via:\n\n📧 Email: mubashir.sgs@gmail.com\n📱 Phone: 9823786144\n💬 WhatsApp: Direct chat available in the contact section\n📍 Location: Aurangabad, Maharashtra, India",
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    answer:
      "You can download Mubashir's resume using the 'Download Resume' button in the hero section at the top. It's a detailed PDF with all his skills, projects, and education. 📄",
  },
  {
    keywords: ["education", "college", "degree", "study", "diploma", "btech", "school"],
    answer:
      "📚 Education:\n\n• **Diploma in Computer Engineering** — P.E.S College, Aurangabad (2022-2025) with 76.69%\n• **B.Tech** — Currently enrolled in engineering program\n• **SSC (10th)** — Little Flower High School, Aurangabad (2022)",
  },
  {
    keywords: ["who", "about", "mubashir", "tell", "intro", "introduction"],
    answer:
      "Mohammed Mubashir (aka Mubix) is a Computer Science student from Aurangabad, Maharashtra. He's passionate about building useful systems, websites, and AI-powered projects. Currently open for freelance and project work! 🚀",
  },
  {
    keywords: ["available", "freelance", "hire", "open", "job", "intern"],
    answer:
      "Yes! Mubashir is currently open for freelance work, project collaborations, and internship opportunities. Feel free to reach out via the contact section or WhatsApp! ✅",
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo", "hola"],
    answer: "Hey there! 👋 I'm Mubix AI. How can I help you? Ask me about skills, projects, education, or how to get in touch!",
  },
  {
    keywords: ["certificate", "certification", "workshop", "mscit"],
    answer:
      "🏅 Certifications:\n\n• MSCIT (80/100)\n• C & C++ Programming\n• Java\n• Cyber Security Workshop\n• Web Designing Workshop",
  },
  {
    keywords: ["location", "where", "city", "place", "from"],
    answer: "📍 Mubashir is based in Aurangabad, Maharashtra, India.",
  },
];

const fallback =
  "Hmm, I'm not sure about that one! 🤔 Try asking about skills, projects, contact, education, or resume.";

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
