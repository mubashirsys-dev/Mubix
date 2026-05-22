import React, { useEffect, useState } from "react";
import { 
  Terminal, 
  Cpu, 
  HardDrive, 
  Gamepad, 
  Layers, 
  ArrowLeft, 
  ExternalLink, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Star,
  Github,
  Monitor,
  Music,
  Code2,
  Tv,
  Globe,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import { NeoButton } from "./NeoButton.jsx";
import "./MubixOsLanding.css";

export function MubixOsLanding({ navigateToHome }) {
  const [activeFaq, setActiveFaq] = useState(null);

  // Dynamic SEO meta tags injection
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    
    // Set product-specific SEO tags
    document.title = "MUBIX OS Lite — Futuristic Lightweight Browser Operating System";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore MUBIX OS Lite: A futuristic, lightweight, browser-based operating system designed to revive older hardware. Features dynamic windowing, virtual filesystem, custom developer terminal, retro games, and low memory footprints engineered by Mohammed Mubashir.");
    }

    // Add SoftwareApplication JSON-LD dynamically to the body for advanced crawling redundancy
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "mubixos-application-schema";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MUBIX OS Lite",
      "description": "Futuristic Lightweight Browser Operating System simulated environment built with React, pure front-end, custom filesystem, sandboxed iframe browser, media players, and a comprehensive terminal interface.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Cross-platform (Modern Browser)",
      "browserRequirements": "HTML5, ES6 JavaScript, CSS Grid",
      "creator": {
        "@type": "Person",
        "name": "Mohammed Mubashir",
        "url": "https://mubix.in/"
      },
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    });
    document.body.appendChild(script);

    window.scrollTo(0, 0);

    return () => {
      // Restore default portfolio SEO tags on unmount
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
      const existingScript = document.getElementById("mubixos-application-schema");
      if (existingScript) existingScript.remove();
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is MUBIX OS Lite?",
      a: "MUBIX OS Lite is a futuristic, highly responsive, browser-based web operating system designed to provide a lightweight desktop simulator. It features full window multitasking, sandboxed navigation, live coding setups, and interactive tools designed to run flawlessly on low-end hardware."
    },
    {
      q: "Can I install MUBIX OS Lite on a hard drive?",
      a: "No. MUBIX OS Lite is a pure web operating system (Web OS) that executes completely inside any standard web browser. It does not require partition formatting, dual-boot setups, or local system installations, making it an excellent, zero-configuration cloud desktop alternative."
    },
    {
      q: "How does the Virtual Filesystem (VFS) work?",
      a: "The Virtual Filesystem (VFS) acts as an in-memory tree directory structure. It mimics a traditional computer filesystem. Users can create, open, write, rename, and delete text files, system scripts, and media folders inside the environment with complete runtime feedback."
    },
    {
      q: "What programming languages and framework was it built with?",
      a: "MUBIX OS Lite is built using modern Web Technologies, including React, native JavaScript (ES6+), Vanilla CSS (neo-brutalist custom variables), and standard HTML5 Canvas/Web Audio API subsystems, assuring lightning-fast load times and less than 1.5MB of static bundle footprint."
    },
    {
      q: "Who is this web operating system designed for?",
      a: "It is designed for enthusiasts, computer science students, software developers, and retro hardware lovers who want to explore modular cloud desktop environments, simulate server shells, test HTML widgets inside sandboxed editors, or play arcade games without slowing down their machines."
    }
  ];

  return (
    <article className="mubixos-landing-page" aria-label="Mubix OS Product Information">
      {/* ── Landing Header ── */}
      <header className="mubixos-landing-header">
        <div className="landing-header-inner">
          <button 
            className="landing-back-btn" 
            onClick={navigateToHome}
            aria-label="Back to Mohammed Mubashir's Portfolio"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>
          <div className="landing-brand-logo">
            <span className="brand-dot">⚡</span>
            <span>MUBIX OS LITE</span>
          </div>
          <div className="landing-header-actions">
            <NeoButton 
              href="https://mubix-os.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="secondary"
              icon={ExternalLink}
            >
              Launch Live OS
            </NeoButton>
          </div>
        </div>
      </header>

      <main id="main-landing-content" className="landing-main-layout">
        {/* ── Section 1: Hero Section ── */}
        <section className="landing-hero" aria-label="Mubix OS Introduction">
          <div className="landing-grid-overlay"></div>
          <div className="landing-hero-content">
            <div className="product-badge">
              <Sparkles size={14} className="sparkle-anim" />
              <span>THE FUTURE OF LIGHTWEIGHT WEBTASKS</span>
            </div>
            <h1 className="landing-title">MUBIX OS Lite</h1>
            <h2 className="landing-subtitle">
              Futuristic Lightweight Browser Operating System
            </h2>
            <p className="landing-tagline">
              A premium, open-source simulated web desktop environment optimized for ultra-low resource footprints. Engineered to execute rich workspaces directly inside your browser.
            </p>

            {/* Spec Stats Row */}
            <div className="landing-specs-row">
              <div className="landing-spec-card">
                <span className="spec-number">120ms</span>
                <span className="spec-label">Simulated Boot Time</span>
              </div>
              <div className="landing-spec-card">
                <span className="spec-number">&lt;1.5MB</span>
                <span className="spec-label">Memory Footprint</span>
              </div>
              <div className="landing-spec-card">
                <span className="spec-number">100%</span>
                <span className="spec-label">Vanilla Front-end</span>
              </div>
              <div className="landing-spec-card">
                <span className="spec-number">Zero</span>
                <span className="spec-label">Installations Required</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="landing-hero-actions">
              <NeoButton 
                href="https://mubix-os.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                icon={Monitor}
                className="hero-launch-trigger"
              >
                Launch MUBIX OS Lite
              </NeoButton>
              <NeoButton 
                href="https://github.com/mubashirsys-dev/MubixOs" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="github"
                icon={Github}
              >
                View Repository Code
              </NeoButton>
            </div>
          </div>
        </section>

        {/* ── Section 2: Architectural Overview & Tech Stack ── */}
        <section className="landing-architecture" id="architecture" aria-label="Mubix OS Architecture Details">
          <div className="landing-section-header">
            <span className="section-pre">TECHNICAL BLUEPRINTS</span>
            <h2 className="section-title">Lightweight System Architecture</h2>
            <p className="section-desc">
              Engineered with extreme efficiency, MUBIX OS Lite runs as a client-side sandbox container. No database roundtrips, no server overheads—just pure, high-performance web engineering.
            </p>
          </div>

          <div className="architecture-grid">
            <div className="arch-card">
              <div className="arch-icon-box arch-icon--terminal">
                <Terminal size={24} />
              </div>
              <h3>Interactive Hacker Shell</h3>
              <p>
                A high-fidelity developer terminal environment supporting classical scripts, directory traversal, `neofetch` reports, clearing logs, and simulated developer diagnostic processes.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon-box arch-icon--fs">
                <HardDrive size={24} />
              </div>
              <h3>Virtual Filesystem (VFS)</h3>
              <p>
                An in-memory relational folder tree directory allowing dynamic file creations, naming allocations, file deletions, and read/write operations processed at sub-millisecond execution speeds.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon-box arch-icon--wm">
                <Layers size={24} />
              </div>
              <h3>Custom Window Manager</h3>
              <p>
                Designed to support dynamic multi-window stacking layouts, index adjustments, responsive resizing borders, minimize-to-dock actions, and tactile drag parameters for absolute multitasking flow.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon-box arch-icon--runtime">
                <Cpu size={24} />
              </div>
              <h3>Optimized Web Runtime</h3>
              <p>
                Assembled entirely in optimized modular components, utilizing localized asset pipelines to ensure that the active system state uses less than 1.5MB of device memory.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Built-In Core Product Suite ── */}
        <section className="landing-features" id="features" aria-label="Mubix OS App Ecosystem">
          <div className="landing-section-header">
            <span className="section-pre">Ecosystem Apps</span>
            <h2 className="section-title">Built-In Premium Software Suite</h2>
            <p className="section-desc">
              MUBIX OS Lite includes a cohesive collection of responsive simulator tools ready to run instantly on standard browser engines.
            </p>
          </div>

          <div className="features-showcase-grid">
            <div className="app-spec-card">
              <div className="app-spec-header">
                <Globe size={20} className="app-spec-icon" />
                <h4>Lite Sandbox Web Browser</h4>
              </div>
              <p>A fully featured browser simulation enabling private history tracking, simulated web search result rankings, bookmarks, and iframe sandboxes to explore the web securely.</p>
            </div>

            <div className="app-spec-card">
              <div className="app-spec-header">
                <Music size={20} className="app-spec-icon" />
                <h4>Vinyl Audio Media Player</h4>
              </div>
              <p>Synthesizes premium retro cyber synthwave chords on-the-fly using the browser's Web Audio API. Supports custom drag-and-drop local audio uploads and stylized vinyl rotation animations.</p>
            </div>

            <div className="app-spec-card">
              <div className="app-spec-header">
                <Code2 size={20} className="app-spec-icon" />
                <h4>Workspace Text & Code Editor</h4>
              </div>
              <p>A comprehensive coding playground allowing users to compose scripts, edit text files, configure custom markdown blocks, and run local widget previews.</p>
            </div>

            <div className="app-spec-card">
              <div className="app-spec-header">
                <Tv size={20} className="app-spec-icon" />
                <h4>YouTube Lite Video Player</h4>
              </div>
              <p>A premium inline video rendering app featuring customizable channel feeds, volume parameters, search filters, and smooth full-width viewport scaling.</p>
            </div>

            <div className="app-spec-card">
              <div className="app-spec-header">
                <ImageIcon size={20} className="app-spec-icon" />
                <h4>Fluid Image Gallery & Photos</h4>
              </div>
              <p>Enables dynamic uploads of digital photo assets. Features smooth canvas scales, details panels, and sleek slide-through visual presentation layouts.</p>
            </div>

            <div className="app-spec-card">
              <div className="app-spec-header">
                <Settings size={20} className="app-spec-icon" />
                <h4>Retro Settings Dashboard</h4>
              </div>
              <p>Provides complete administrative controls to customize active desk wallpapers, adjust theme colors, clear in-memory caches, and toggles audio alert profiles.</p>
            </div>
          </div>
        </section>

        {/* ── Section 4: Searchable Keyword Tags ── */}
        <section className="landing-tags-section" aria-label="Mubix OS Technical Keyword Targets">
          <div className="tags-container">
            <span className="tags-label">Related Categories:</span>
            <div className="tags-cloud">
              <span className="tag-item">browser operating system</span>
              <span className="tag-item">lightweight web OS</span>
              <span className="tag-item">futuristic operating system</span>
              <span className="tag-item">interactive desktop UI</span>
              <span className="tag-item">low-end laptop OS</span>
              <span className="tag-item">lightweight Linux alternative</span>
              <span className="tag-item">browser desktop environment</span>
              <span className="tag-item">JavaScript operating system</span>
              <span className="tag-item">React operating system</span>
              <span className="tag-item">web desktop workspace</span>
              <span className="tag-item">vanilla frontend development</span>
            </div>
          </div>
        </section>

        {/* ── Section 5: Technical FAQ Accordion ── */}
        <section className="landing-faq" id="faq" aria-label="Frequently Asked Questions">
          <div className="landing-section-header">
            <span className="section-pre">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Technical answers about the compilation, architecture, and utilization parameters of MUBIX OS Lite.
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div 
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`} 
                  key={i}
                >
                  <button 
                    className="faq-question-btn" 
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <HelpCircle size={18} className="faq-question-icon" />
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`faq-arrow-icon ${isOpen ? "faq-arrow-icon--rotated" : ""}`} />
                  </button>
                  <div className="faq-answer-container">
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 6: Launch Call-To-Action (CTA) ── */}
        <section className="landing-cta" aria-label="Try Mubix OS Live">
          <div className="landing-cta-inner">
            <Star className="cta-star-decor dec-1" />
            <Star className="cta-star-decor dec-2" />
            <h2>Experience MUBIX OS Lite Today</h2>
            <p>
              Launch the responsive, high-performance web desktop simulator right inside your viewport. Completely free, open source, and lightweight.
            </p>
            <div className="cta-button-group">
              <NeoButton 
                href="https://mubix-os.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                icon={ExternalLink}
                className="cta-primary-btn"
              >
                Launch Mubix OS Lite
              </NeoButton>
              <button className="cta-back-portfolio" onClick={navigateToHome}>
                Return to Homepage
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Landing Footer ── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <p>© {new Date().getFullYear()} MUBIX OS. Engineered under the MUBIX Brand by Mohammed Mubashir.</p>
          <p className="landing-footer-seo">
            MUBIX OS Lite is a futuristic, highly performant browser-based simulated operating system desktop environment. Open source developer tool designed to revive low-end architectures using JavaScript, React, and CSS.
          </p>
        </div>
      </footer>
    </article>
  );
}
