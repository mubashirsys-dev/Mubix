import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Instagram,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from "lucide-react";
import { BrutalCard } from "./components/BrutalCard.jsx";
import { NeoButton } from "./components/NeoButton.jsx";
import { SectionHeader } from "./components/SectionHeader.jsx";
import { ProfileCard } from "./components/ProfileCard.jsx";
import { ContactCard } from "./components/ContactCard.jsx";
import { LoadingScreen } from "./components/LoadingScreen.jsx";
import { Chatbot } from "./components/Chatbot.jsx";
import { resume } from "./data/resume.js";

const navItems = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const marqueeItems = [
  "HTML","CSS","JavaScript","PHP","Python",
  "C#","SQL Server","GitHub","Vercel","AI Projects",
  "Full Stack","React",
];

const skillIcons = { Programming: Code2, Tools: Database, Languages: Languages };

/* ── scroll reveal ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "", id, ariaLabel, ariaLabelledBy }) {
  const ref = useReveal();
  return (
    <section ref={ref} className={`reveal ${className}`} id={id}
      aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  );
}

/* ────────────────── APP ────────────────── */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef(0);

  const closeMenu = () => setMenuOpen(false);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  /* active section tracker */
  useEffect(() => {
    if (isLoading) return;
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isLoading]);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* carousel controls */
  const allProjects = resume.projects;
  const totalSlides = allProjects.length;
  const prevSlide = () => setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setSlideIndex((i) => (i + 1) % totalSlides);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
  };

  if (isLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  const currentProject = allProjects[slideIndex];

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>

      {/* ═══ NAVBAR ═══ */}
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="logo-mark" href="#top" onClick={closeMenu} aria-label="Go to top">
            <img src={resume.logoUrl} alt="MUBIX" className="nav-logo-img" />
            <span>{resume.shortName}</span>
          </a>

          <button aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)} type="button">
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}
                className={activeSection === item.href.slice(1) ? "nav-active" : ""}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ═══ HERO ═══ */}
        <section className="hero section-grid" id="top">
          <div className="hero-copy animate-hero-left">
            <div className="availability-badge">
              <span className="pulse-dot" aria-hidden="true" />
              Open for freelance + project work
            </div>

            <h1>
              <span className="hero-name-outline">Mohammed</span>
              <span className="hero-name-solid">Mubashir</span>
            </h1>

            <p className="hero-role">{resume.role}</p>
            <p className="hero-text">{resume.objective}</p>

            <div className="hero-actions" aria-label="Primary actions">
              <NeoButton href="#projects" icon={ArrowRight}>View Projects</NeoButton>
              <NeoButton download href={resume.resumeUrl} icon={Download} variant="secondary">
                Download Resume
              </NeoButton>
              <NeoButton href={`https://wa.me/${resume.whatsappNumber}`}
                icon={MessageCircle} variant="accent" target="_blank" rel="noopener noreferrer">
                WhatsApp Me
              </NeoButton>
            </div>

            {/* hero social row */}
            <div className="hero-socials">
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero-social-link">
                <Linkedin size={18} />
              </a>
              <a href={`https://instagram.com/${resume.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hero-social-link">
                <Instagram size={18} />
              </a>
              <a href={`mailto:${resume.email}`} aria-label="Email" className="hero-social-link">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="animate-hero-right">
            <ProfileCard />
          </div>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <section className="marquee-strip" aria-label="Technical keywords">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`}><Star aria-hidden="true" />{item}</span>
            ))}
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <RevealSection className="section section--cream" id="skills">
          <SectionHeader eyebrow="Toolbox" title="Built for practical development work" />
          <div className="skills-grid">
            {resume.skillGroups.map((group, index) => {
              const Icon = skillIcons[group.title] || Code2;
              return (
                <BrutalCard className="skill-card" key={group.title}
                  tone={index === 1 ? "yellow" : "white"}>
                  <div className="card-icon"><Icon aria-hidden="true" /></div>
                  <h3>{group.title}</h3>
                  <ul className="chip-list" aria-label={`${group.title} skills`}>
                    {group.items.map((item) => (<li key={item}>{item}</li>))}
                  </ul>
                </BrutalCard>
              );
            })}
          </div>
          <div className="skill-bars-section">
            <h3 className="skill-bars-title">Proficiency</h3>
            <div className="skill-bars-grid">
              {resume.skills.map((skill) => (
                <div className="skill-bar-item" key={skill.name}>
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">{skill.name}</span>
                    <span className="skill-bar-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill"
                      style={{ "--fill-width": `${skill.level}%`, "--fill-color": skill.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ═══ PROJECTS CAROUSEL ═══ */}
        <RevealSection className="section section--violet" id="projects">
          <SectionHeader eyebrow="Projects" title="Systems, websites, and useful builds" />

          <div className="carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <button className="carousel-btn carousel-btn--prev" onClick={prevSlide}
              aria-label="Previous project" type="button">
              <ChevronLeft size={28} />
            </button>

            <div className="carousel-viewport">
              <BrutalCard className="carousel-card" tone="white" key={slideIndex}>
                {currentProject.featured && (
                  <div className="project-stamp"><Bot aria-hidden="true" />Featured</div>
                )}
                <div className="carousel-card-top">
                  <p className="project-number">
                    {String(slideIndex + 1).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="carousel-card-title">{currentProject.title}</h3>
                <p className="carousel-card-desc">{currentProject.description}</p>

                <ul className="feature-list">
                  {currentProject.features.map((f) => (
                    <li key={f}><ArrowRight aria-hidden="true" />{f}</li>
                  ))}
                </ul>

                <div className="project-stack">
                  {currentProject.stack.map((s) => (
                    <span className="stack-badge" key={s}>{s}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {currentProject.liveUrl && (
                    <NeoButton href={currentProject.liveUrl} icon={ExternalLink}
                      target="_blank" rel="noopener noreferrer">
                      Live Website
                    </NeoButton>
                  )}
                </div>
              </BrutalCard>
            </div>

            <button className="carousel-btn carousel-btn--next" onClick={nextSlide}
              aria-label="Next project" type="button">
              <ChevronRight size={28} />
            </button>
          </div>

          {/* dots */}
          <div className="carousel-dots">
            {allProjects.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === slideIndex ? "carousel-dot--active" : ""}`}
                onClick={() => setSlideIndex(i)} aria-label={`Go to project ${i + 1}`} type="button" />
            ))}
          </div>
        </RevealSection>

        {/* ═══ EDUCATION ═══ */}
        <RevealSection className="section section--yellow" id="education">
          <SectionHeader eyebrow="Education" title="Computer engineering foundation" />
          <div className="timeline">
            {resume.education.map((item) => (
              <BrutalCard className="timeline-card" key={`${item.title}-${item.period}`}>
                <div className="timeline-top">
                  <GraduationCap aria-hidden="true" />
                  <span>{item.period}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <strong>{item.detail}</strong>
              </BrutalCard>
            ))}
          </div>
        </RevealSection>

        {/* ═══ CERTIFICATIONS ═══ */}
        <RevealSection className="section section--black" ariaLabelledBy="certs-title">
          <SectionHeader eyebrow="Proof" id="certs-title" title="Certifications + workshops" />
          <div className="badge-wall">
            {resume.certifications.map((cert, i) => (
              <span className={`cert-badge cert-badge--${i % 3}`} key={cert}>
                <Award aria-hidden="true" />{cert}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* ═══ CONTACT ═══ */}
        <RevealSection className="section section--cream contact-section" id="contact">
          <div className="contact-panel">
            <div className="contact-left">
              <p className="eyebrow sticker sticker--red">Let's Connect</p>
              <h2>Let's build something useful together.</h2>
              <p className="contact-subtext">
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </div>
            <div className="contact-grid">
              <ContactCard icon={Mail} label="Email" value={resume.email}
                href={`mailto:${resume.email}`} />
              <ContactCard icon={Phone} label="Phone" value={resume.phone}
                href={`tel:+91${resume.phone}`} />
              <ContactCard icon={MapPin} label="Location" value={resume.location} />
              <ContactCard icon={MessageCircle} label="WhatsApp" value="Direct Chat"
                href={`https://wa.me/${resume.whatsappNumber}`} external />
              <ContactCard icon={Instagram} label="Instagram" value={`@${resume.instagram}`}
                href={`https://instagram.com/${resume.instagram}`} external />
              <ContactCard icon={Linkedin} label="LinkedIn" value="Mohammed Mubashir"
                href={resume.linkedin} external />
            </div>
          </div>
        </RevealSection>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={resume.logoUrl} alt="MUBIX" className="footer-logo-img" />
            <span className="footer-logo">MUBIX</span>
          </div>
          <p>Designed & Built by Mohammed Mubashir</p>
          <div className="footer-links">
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`https://instagram.com/${resume.instagram}`} target="_blank"
              rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={`mailto:${resume.email}`} aria-label="Email"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING BUTTONS ═══ */}
      <div className="floating-stack">
        <Chatbot />
        <a className="whatsapp-fab" href={`https://wa.me/${resume.whatsappNumber}`}
          target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}

export default App;
