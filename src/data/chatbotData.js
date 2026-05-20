export const chatbotIntro = "Hey, I'm Mubix AI 👋\nAsk anything about Mohammed Mubashir, projects, skills, or contact.";

export const quickReplies = [
  "Who are you?",
  "Projects?",
  "Skills?",
  "Hire you?",
  "Design style?",
];

export const fallback = `Hmm 👀
I'm still learning that answer.
Try asking about:
• projects
• skills
• education
• contact
• freelancing
• tech stack`;

const responses = [
  {
    keywords: ["who are you", "who is mubashir", "about you", "tell me about yourself"],
    answer: "I’m Mohammed Mubashir, a Computer Science student and aspiring software developer focused on building useful systems, websites, and AI-powered projects.",
  },
  {
    keywords: ["what do you do", "what is your work", "what do you build"],
    answer: "I build websites, software systems, portfolio projects, and experiment with AI-based tools and automation.",
  },
  {
    keywords: ["skills", "technologies", "tech stack", "programming languages", "what languages"],
    answer: "My main skills include HTML, CSS, JavaScript, PHP, Python, SQL Server, C#, GitHub, and Vercel deployment.",
  },
  {
    keywords: ["are you a student", "studying", "degree"],
    answer: "Yes. I’m currently pursuing BTech in Computer Science.",
  },
  {
    keywords: ["which college", "university", "institute"],
    answer: "I’m currently studying Computer Science Engineering through direct second-year admission.",
  },
  {
    keywords: ["what is mubix", "mubix"],
    answer: "Mubix is my personal developer identity and portfolio brand.",
  },
  {
    keywords: ["freelance", "collaboration", "hire", "open to work"],
    answer: "Yes 👋 I’m open to freelance work, project collaborations, and portfolio-worthy development opportunities. You can contact me through the website contact form for project discussions.",
  },
  {
    keywords: ["contact", "reach", "email", "message", "whatsapp"],
    answer: "You can contact me using the contact form available on this website.",
  },
  {
    keywords: ["projects", "what have you built", "portfolio projects"],
    answer: "I’ve built a College Management System with AI chatbot integration, a Football Academy website, and a Book Portfolio website.",
  },
  {
    keywords: ["best project", "main project", "top project"],
    answer: "One of my main projects is a College Management System integrated with an AI chatbot and admin management features.",
  },
  {
    keywords: ["ai", "artificial intelligence", "chatbots"],
    answer: "I’m currently learning AI tools, automation systems, and chatbot integrations. Yes 👋 I’m actively experimenting with AI chatbot integrations.",
  },
  {
    keywords: ["full stack", "frontend", "backend"],
    answer: "Yes. I’m actively improving my frontend, backend, and database development skills.",
  },
  {
    keywords: ["goal", "aim", "future plan"],
    answer: "My goal is to become a skilled software developer, earn through tech, and build impactful projects.",
  },
  {
    keywords: ["deploy", "hosting", "vercel"],
    answer: "Yes. I deploy websites using platforms like Vercel and GitHub Pages.",
  },
  {
    keywords: ["favorite tech", "enjoy working"],
    answer: "I enjoy working with modern frontend design combined with backend systems and AI integrations.",
  },
  {
    keywords: ["responsive", "mobile friendly"],
    answer: "Yes. I build responsive websites optimized for desktop and mobile devices.",
  },
  {
    keywords: ["portfolio websites", "landing pages", "business websites"],
    answer: "Yes 👋 I can build modern portfolio websites, educational systems, business websites, custom frontend designs, and responsive landing pages.",
  },
  {
    keywords: ["experience level", "how much experience"],
    answer: "I’m continuously learning and building real-world projects to improve my development experience.",
  },
  {
    keywords: ["github", "version control"],
    answer: "Yes. I use GitHub for version control and project hosting.",
  },
  {
    keywords: ["cybersecurity", "security"],
    answer: "I’m interested in security, privacy, and safe web development practices.",
  },
  {
    keywords: ["admin panels", "dashboards", "management systems"],
    answer: "Yes. I can create admin dashboards and management systems.",
  },
  {
    keywords: ["database", "sql", "mysql"],
    answer: "I mainly use SQL Server and MySQL-based systems.",
  },
  {
    keywords: ["strongest skill", "best skill"],
    answer: "My strongest skill is combining creativity with practical development projects.",
  },
  {
    keywords: ["api", "apis", "integrations"],
    answer: "Yes. I use APIs for integrations and dynamic features.",
  },
  {
    keywords: ["about portfolio", "why create portfolio"],
    answer: "This portfolio showcases my projects, skills, goals, and developer journey. I created it to showcase my work, improve opportunities, and build a strong developer identity online.",
  },
  {
    keywords: ["design style", "ui style", "brutalist"],
    answer: "I like brutalist, comic-inspired, modern indie hacker, and creative UI styles.",
  },
  {
    keywords: ["tools", "vscode", "ide"],
    answer: "VS Code, GitHub, Vercel, SQL Server, XAMPP, and AI-assisted tools.",
  },
  {
    keywords: ["ui designs", "create ui"],
    answer: "Yes. I enjoy creating creative and modern UI layouts.",
  },
  {
    keywords: ["unique", "makes portfolio unique"],
    answer: "Its playful brutalist style, interactive design, and developer-focused presentation.",
  },
  {
    keywords: ["animations", "transitions"],
    answer: "Yes 👀 I use subtle animations and smooth transitions to improve user experience.",
  },
  {
    keywords: ["learning currently", "learning now"],
    answer: "I’m learning advanced frontend development, backend systems, AI tools, and deployment workflows.",
  },
  {
    keywords: ["kind of projects", "what projects want"],
    answer: "Useful, creative, and portfolio-worthy projects with real-world impact.",
  },
  {
    keywords: ["instagram", "insta"],
    answer: "Yes 👋 You can find me on Instagram at @mubix.o_0",
  },
  {
    keywords: ["where are you from", "location", "city"],
    answer: "I’m from Aurangabad, Maharashtra, India.",
  },
  {
    keywords: ["education background", "qualification"],
    answer: "I completed a Diploma in Computer Engineering and I’m currently pursuing BTech in Computer Science.",
  },
  {
    keywords: ["diploma score", "marks"],
    answer: "I scored 76.69% in Diploma Computer Engineering.",
  },
  {
    keywords: ["motivation", "what motivates you"],
    answer: "Learning, building useful projects, improving myself, and growing through technology.",
  },
  {
    keywords: ["work alone", "team"],
    answer: "Mostly yes, but I’m open to team collaborations and partnerships.",
  },
  {
    keywords: ["what should i ask", "help", "options"],
    answer: "Try asking about projects, skills, education, tech stack, goals, or collaborations 👀",
  },
  {
    keywords: ["hello", "hi", "hey", "sup", "yo", "hola"],
    answer: "Hey there! 👋 I'm Mubix AI. Try asking about my projects, skills, education, tech stack, goals, or collaborations 👀",
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
