import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  Cpu,
  CreditCard,
  Database,
  Download,
  Eye,
  ExternalLink,
  Facebook,
  Github,
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
  Sun,
  Moon,
  Twitter,
  X,
  Terminal,
  Gamepad,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { BrutalCard } from "./components/BrutalCard.jsx";
import { NeoButton } from "./components/NeoButton.jsx";
import { SectionHeader } from "./components/SectionHeader.jsx";
import { ProfileCard } from "./components/ProfileCard.jsx";
import { ContactCard } from "./components/ContactCard.jsx";
import { LoadingScreen } from "./components/LoadingScreen.jsx";
import { Chatbot } from "./components/Chatbot.jsx";
import { VisitorCounter } from "./components/VisitorCounter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { MubixOsLanding } from "./components/MubixOsLanding.jsx";
import { ContactModal } from "./components/ContactModal.jsx";
import { resume } from "./data/resume.js";

const navItems = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const marqueeItems = [
  "HTML", "CSS", "JavaScript", "PHP", "Python",
  "C#", "SQL Server", "GitHub", "Vercel", "AI Projects",
  "Full Stack", "React",
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState(null); // 'glitch' or 'fade'
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);
  const [activePreviewWin, setActivePreviewWin] = useState("editor");
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Client-side router history synchronization
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToPath = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

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

  /* scroll shadow & footer offset */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);

      const footer = document.querySelector('.site-footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setFooterOffset(window.innerHeight - rect.top);
        } else {
          setFooterOffset(0);
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn(); // init
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* theme effect */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const isGoingCyber = theme === "light";
    setTransitionType(isGoingCyber ? 'glitch' : 'comic-wipe');

    if (isGoingCyber) {
      // Glitch transition (Light -> Cyber)
      setTimeout(() => {
        setTheme("dark");
      }, 700); // Switch theme halfway through glitch peak

      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType(null);
      }, 1500); // Glitch finishes around 1.5s
    } else {
      // Comic Wipe transition (Cyber -> Light)
      setTimeout(() => {
        setTheme("light");
      }, 700); // Switch right when paper covers the screen

      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionType(null);
      }, 1600); // Transition completes
    }
  };

  /* carousel controls */
  const allProjects = resume.projects;
  const totalSlides = allProjects.length;
  const prevSlide = () => { setFeaturesExpanded(false); setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides); };
  const nextSlide = () => { setFeaturesExpanded(false); setSlideIndex((i) => (i + 1) % totalSlides); };
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
  };

  if (isLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  if (currentPath === "/mubix-os" || currentPath === "/projects/mubix-os") {
    return (
      <div className="app">
        <MubixOsLanding navigateToHome={() => navigateToPath("/")} />
      </div>
    );
  }

  const currentProject = allProjects[slideIndex];

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>

      {/* ═══ NAVBAR ═══ */}
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="logo-mark" href="#top" onClick={closeMenu} aria-label="Go to top">
            <img src={resume.logoUrl} alt="Mubix Logo - Mohammed Mubashir Portfolio" className="nav-logo-img" width="32" height="32" fetchPriority="high" />
            <span>{resume.shortName}</span>
          </a>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}
                className={activeSection === item.href.slice(1) ? "nav-active" : ""}>
                {item.label}
              </a>
            ))}
            {/* <a
              href="/mubix-os"
              onClick={(e) => { e.preventDefault(); closeMenu(); navigateToPath("/mubix-os"); }}
              style={{ fontWeight: 800, color: "var(--neo-accent)" }}
            >
              MUBIX OS Lite
            </a> */}
          </div>

          <div className="nav-controls">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="menu-toggle"
              onClick={() => setMenuOpen((o) => !o)} type="button">
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
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
              <NeoButton onClick={() => setIsResumeOpen(true)} icon={Eye} variant="secondary" className="preview-btn-glow">
                Preview Resume
              </NeoButton>
              <NeoButton download href={resume.resumeUrl} icon={Download} variant="secondary">
                Download Resume
              </NeoButton>
              <NeoButton onClick={() => setIsContactModalOpen(true)}
                icon={MessageCircle} variant="accent"
                className="cta-highlight">
                Start a Project
              </NeoButton>
            </div>

            {/* hero social row */}
            <div className="hero-socials">
              <a href={resume.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero-social-link">
                <Github size={18} />
              </a>
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero-social-link">
                <Linkedin size={18} />
              </a>
              <a href={`https://instagram.com/${resume.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hero-social-link">
                <Instagram size={18} />
              </a>
              <a href={resume.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hero-social-link">
                <Twitter size={18} />
              </a>
              <a href={resume.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hero-social-link">
                <Facebook size={18} />
              </a>
            </div>

            <div className="hero-visitor-counter">
              <VisitorCounter />
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

            <div className="carousel-viewport" aria-live="polite">
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

                {currentProject.stats && (
                  <div className="project-stats">
                    {currentProject.stats.map((stat) => (
                      <div className="stat-card" key={stat}>
                        <Cpu size={14} className="stat-icon" aria-hidden="true" />
                        <span>{stat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="carousel-card-desc">{currentProject.description}</p>

                <div className="project-features-container">
                  <ul className={`feature-list ${featuresExpanded ? "expanded" : ""}`}>
                    {(featuresExpanded ? currentProject.features : currentProject.features.slice(0, 4)).map((f) => (
                      <li key={f}><CheckCircle size={14} aria-hidden="true" className="feature-icon" />{f}</li>
                    ))}
                  </ul>
                  {currentProject.features.length > 4 && (
                    <button
                      className="feature-toggle-btn"
                      onClick={() => setFeaturesExpanded(!featuresExpanded)}
                      type="button"
                    >
                      {featuresExpanded ? (
                        <><ChevronUp size={16} /> Hide Features</>
                      ) : (
                        <><ChevronDown size={16} /> View {currentProject.features.length - 4} More Features</>
                      )}
                    </button>
                  )}
                </div>

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
                  {currentProject.githubUrl && currentProject.githubUrl !== "#" && (
                    <NeoButton href={currentProject.githubUrl} icon={Github} variant="github"
                      target="_blank" rel="noopener noreferrer">
                      GitHub
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

        {/* ═══ NEXT-GEN MUBIX OS SHOWCASE (Commented Out) ═══ */}
        {false && (
        <RevealSection className="mubixos-showcase-section" id="mubix-os-showcase">
          <div className="workspace-dotted-overlay"></div>
          <div className="mubixos-showcase-container">
            {/* Left Column: Premium Pitch */}
            <div className="mubixos-showcase-left">
              <div className="mubixos-badge">
                <Sparkles size={14} className="badge-sparkle-icon" />
                <span>Featured Interactive Product</span>
              </div>
              <h2 className="mubixos-showcase-headline">
                MEET THE FUTURE OF LIGHTWEIGHT COMPUTING
              </h2>
              <p className="mubixos-showcase-subheadline">
                An interactive, fully functional browser-based operating system designed to simulate a complete, immersive desktop environment.
              </p>

              {/* Mini spec stats */}
              <div className="mubixos-specs-grid">
                <div className="spec-item">
                  <span className="spec-val">120ms</span>
                  <span className="spec-lbl">Simulated Boot Time</span>
                </div>
                <div className="spec-item">
                  <span className="spec-val">&lt;1.5MB</span>
                  <span className="spec-lbl">Runtime Memory</span>
                </div>
                <div className="spec-item">
                  <span className="spec-val">100%</span>
                  <span className="spec-lbl">Vanilla Front-end</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mubixos-showcase-actions">
                <a
                  href="https://mubix-os.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary mubixos-launch-btn"
                >
                  <span>Launch MUBIX OS</span>
                  <span aria-hidden="true" style={{ fontSize: "1.2rem", marginLeft: "4px" }}>⚡</span>
                </a>
                <a
                  href="/mubix-os"
                  className="btn btn--outline mubixos-explore-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToPath("/mubix-os");
                  }}
                >
                  <span>MUBIX OS Lite Features</span>
                  <span aria-hidden="true" style={{ marginLeft: "4px" }}>🔍</span>
                </a>
              </div>
            </div>

            {/* Right Column: Immersive OS Mockup Preview */}
            <div className="mubixos-showcase-right">
              <div className="desktop-simulator">
                {/* Simulator Top Menu Bar */}
                <div className="simulator-bar">
                  <div className="bar-dots">
                    <span className="bar-dot bar-dot--close"></span>
                    <span className="bar-dot bar-dot--minimize"></span>
                    <span className="bar-dot bar-dot--maximize"></span>
                  </div>
                  <div className="bar-title">Mubix OS Environment (Simulated)</div>
                  <div className="bar-time">11:27 PM</div>
                </div>

                {/* Desktop Workspace */}
                <div className="desktop-workspace">
                  {/* Workspace Grid Pattern Overlay */}
                  <div className="workspace-grid-bg"></div>

                  {/* Window 1: Terminal Shell */}
                  <div
                    className={`simulated-window window--terminal ${activePreviewWin === "terminal" ? "window--active" : ""}`}
                    onClick={() => setActivePreviewWin("terminal")}
                    style={{ zIndex: activePreviewWin === "terminal" ? 10 : 2 }}
                  >
                    <div className="window-header">
                      <Terminal size={14} className="win-icon" />
                      <span>mubix-shell.sh</span>
                    </div>
                    <div className="window-content terminal-content">
                      <div className="terminal-line"><span className="term-prompt">mubix@desktop:~$</span> neofetch</div>
                      <div className="terminal-line term-output term-output--cyan">MUBIX OS [v1.2.0]</div>
                      <div className="terminal-line term-output">OS Type: Browser Emulator</div>
                      <div className="terminal-line term-output">Uptime: 45 mins</div>
                      <div className="terminal-line term-output">Host: Vercel Cloud Node</div>
                      <div className="terminal-line term-output term-output--green">Status: Active & Online</div>
                    </div>
                  </div>

                  {/* Window 2: Code Editor */}
                  <div
                    className={`simulated-window window--editor ${activePreviewWin === "editor" ? "window--active" : ""}`}
                    onClick={() => setActivePreviewWin("editor")}
                    style={{ zIndex: activePreviewWin === "editor" ? 10 : 2 }}
                  >
                    <div className="window-header">
                      <Code2 size={14} className="win-icon" />
                      <span>App.jsx</span>
                    </div>
                    <div className="window-content editor-content">
                      <pre><code>
                        {`import React from 'react';
export default function MubixOS() {
  return (
    <div className="os-core">
      <h1>Mubix OS Online</h1>
      <DesktopEnvironment />
    </div>
  );
}`}
                      </code></pre>
                    </div>
                  </div>

                  {/* Window 3: Retro Game */}
                  <div
                    className={`simulated-window window--game ${activePreviewWin === "game" ? "window--active" : ""}`}
                    onClick={() => setActivePreviewWin("game")}
                    style={{ zIndex: activePreviewWin === "game" ? 10 : 2 }}
                  >
                    <div className="window-header">
                      <Gamepad size={14} className="win-icon" />
                      <span>SnakeRetro.exe</span>
                    </div>
                    <div className="window-content game-content">
                      <div className="game-grid-sim">
                        <div className="sim-snake" style={{ top: "30%", left: "40%" }}></div>
                        <div className="sim-snake-body" style={{ top: "30%", left: "30%" }}></div>
                        <div className="sim-food" style={{ top: "60%", left: "70%" }}></div>
                      </div>
                      <div className="game-status-bar">
                        <span>Score: 1,840</span>
                        <span>High: 9,990</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulator Floating App Dock */}
                  <div className="simulator-dock">
                    <div className={`dock-item ${activePreviewWin === "terminal" ? "dock-item--active" : ""}`}
                      onClick={() => setActivePreviewWin("terminal")} title="Terminal Shell">
                      <Terminal size={20} />
                    </div>
                    <div className={`dock-item ${activePreviewWin === "editor" ? "dock-item--active" : ""}`}
                      onClick={() => setActivePreviewWin("editor")} title="Code Editor">
                      <Code2 size={20} />
                    </div>
                    <div className={`dock-item ${activePreviewWin === "game" ? "dock-item--active" : ""}`}
                      onClick={() => setActivePreviewWin("game")} title="Retro Games">
                      <Gamepad size={20} />
                    </div>
                    <div className="dock-item" title="Filesystem">
                      <FolderOpen size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating modular tactile feature cards */}
          <div className="mubixos-features-grid" id="mubixos-features">
            <BrutalCard className="feature-block-card block-card--yellow">
              <div className="card-badge">⚡ Advanced Core</div>
              <h3>Dynamic Windowing</h3>
              <p>Simulates real desktop multitasking. Click to bring forward, drag, maximize, minimize, or resize dynamic app frames.</p>
            </BrutalCard>
            <BrutalCard className="feature-block-card block-card--purple">
              <div className="card-badge">📁 Storage</div>
              <h3>Virtual Filesystem</h3>
              <p>Fully functional simulation of file trees. Create files, make folders, remove objects, and inspect hierarchy dynamically.</p>
            </BrutalCard>
            <BrutalCard className="feature-block-card block-card--coral">
              <div className="card-badge">💻 Developer Shell</div>
              <h3>Interactive Terminal</h3>
              <p>Hacker command terminal. Execute simulated directory changes, parse neofetch stats, clear, and print custom logs.</p>
            </BrutalCard>
            <BrutalCard className="feature-block-card block-card--blue">
              <div className="card-badge">🎮 Gaming Hub</div>
              <h3>Retro Game Center</h3>
              <p>Built-in responsive versions of classical games (Snake, Tetris, Minesweeper) compiled directly for quick plays.</p>
            </BrutalCard>
          </div>
        </RevealSection>
        )}



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
              <h2>Let's Build Something Useful Together.</h2>
              <p className="contact-subtext">
                Have a project, collaboration idea, freelance work, or just want to connect? Send me a message through the contact form.
              </p>

              <button
                type="button"
                className="contact-primary-cta"
                onClick={() => setIsContactModalOpen(true)}
              >
                <div className="cta-icon-box">
                  <MessageCircle size={24} aria-hidden="true" />
                </div>
                <div className="cta-body">
                  <span className="cta-label">Get in Touch</span>
                  <span className="cta-value">Open Contact Form</span>
                </div>
              </button>
            </div>
            <div className="contact-grid">
              <ContactCard icon={Instagram} label="Instagram" value={`@${resume.instagram}`}
                href={`https://instagram.com/${resume.instagram}`} external variant="instagram" />
              <ContactCard icon={Github} label="GitHub" value="mubashirsys-dev"
                href={resume.github} external variant="github" />
              <ContactCard icon={Twitter} label="X (Twitter)" value="@mubix.o_0"
                href={resume.x} external variant="twitter" />
              <ContactCard icon={Facebook} label="Facebook" value="Mubashir"
                href={resume.facebook} external variant="facebook" />
              <ContactCard icon={Linkedin} label="LinkedIn" value="Mohammed Mubashir"
                href={resume.linkedin} external variant="linkedin" />
              <ContactCard icon={MapPin} label="Location" value={resume.location} variant="location" />
              <ContactCard icon={Star} label="Availability Status" value="Open for Work" variant="availability" />
            </div>
          </div>
        </RevealSection>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={resume.logoUrl} alt="Mubix Logo by Mohammed Mubashir" className="footer-logo-img" width="40" height="40" loading="lazy" />
            <span className="footer-logo">MUBIX</span>
          </div>
          <p>Designed & Built by Mohammed Mubashir</p>
          {/* <div className="footer-quick-links" style={{ display: "flex", justifyContent: "center", gap: "1.5rem", margin: "1rem 0", fontFamily: "Space Mono, monospace", fontSize: "0.85rem" }}>
            <a
              href="/mubix-os"
              onClick={(e) => { e.preventDefault(); navigateToPath("/mubix-os"); }}
              style={{ fontWeight: 700, color: "var(--neo-accent)", textDecoration: "underline" }}
            >
              MUBIX OS Lite
            </a>
          </div> */}
          <p className="seo-footer-text" style={{ fontSize: "0.8rem", opacity: 0.6, maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.5" }}>
            Mohammed Mubashir (Mubix) is a Full Stack & AI Developer, Prompt Engineer, and student pursuing BTech Computer Science in Aurangabad, Maharashtra, India. Specialized in AI website development, prompt wizard design, and search optimization solutions.
          </p>
          <div className="footer-links">
            <a href={resume.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`https://instagram.com/${resume.instagram}`} target="_blank"
              rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={resume.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <Twitter size={20} />
            </a>
            <a href={resume.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING BUTTONS ═══ */}
      <div className="floating-stack" style={{ transform: `translateY(-${footerOffset}px)` }}>
        <Chatbot />
        <button
          type="button"
          className="contact-fab"
          onClick={() => setIsContactModalOpen(true)}
          aria-label="Send Message"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Transition Overlays */}
      {isTransitioning && transitionType === 'glitch' && (
        <div className="cyber-glitch-overlay">
          <div className="glitch-text">SYSTEM OVERRIDE</div>
          <div className="glitch-scanlines"></div>
        </div>
      )}

      {isTransitioning && transitionType === 'comic-wipe' && (
        <div className="comic-wipe-overlay">
          <div className="comic-paper-bg"></div>
          <div className="comic-wipe-content">
            <div className="comic-stamp">MUBIX UI LOADED</div>
            <div className="comic-bounce-text">BACK TO REALITY</div>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {isResumeOpen && (
        <div className="resume-modal-overlay" onClick={() => setIsResumeOpen(false)}>
          <div className="resume-modal-card brutal-card" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3>Resume Preview</h3>
              <button className="resume-modal-close" onClick={() => setIsResumeOpen(false)} aria-label="Close preview">
                &times;
              </button>
            </div>
            <div className="resume-modal-body">
              <img src={resume.resumePreviewUrl} alt="Resume Preview" className="resume-preview-img" />
            </div>
            <div className="resume-modal-footer">
              <NeoButton download href={resume.resumeUrl} icon={Download} variant="secondary">
                Download PDF
              </NeoButton>
              <NeoButton href={resume.resumeUrl} icon={ExternalLink} variant="accent" target="_blank" rel="noopener noreferrer">
                Open PDF
              </NeoButton>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;
