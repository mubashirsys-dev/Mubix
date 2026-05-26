import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { 
  Sparkles, 
  Terminal as TerminalIcon, 
  Code2, 
  Play, 
  CheckCircle, 
  RotateCcw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  X, 
  ExternalLink,
  Cpu,
  RefreshCw
} from "lucide-react";
import { BrutalCard } from "./BrutalCard.jsx";
import { templatesList } from "../data/promptTemplates.js";

export function MubixPromptsShowcase() {
  // Main state
  const [prompt, setPrompt] = useState(templatesList[0].prompt);
  const [selectedTemplate, setSelectedTemplate] = useState(templatesList[0]);
  const [compilingState, setCompilingState] = useState("idle"); // idle, compiling, completed
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeDevice, setActiveDevice] = useState("desktop"); // desktop, tablet, mobile
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Section rendering visibility stages during AI compilation
  const [visibleSections, setVisibleSections] = useState(4); // 0 to 4
  const [activeStep, setActiveStep] = useState(5); // 0 to 5 (5 is all complete)

  // Stats Counters (displayed in the hero card strip)
  const [statTime, setStatTime] = useState(0);
  const [statTemplates, setStatTemplates] = useState(0);
  const [statResponsive, setStatResponsive] = useState(0);
  const showcaseRef = useRef(null);
  
  // Refs for dynamic Scaling
  const modalPreviewContainerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  // Trigger stats animation when portfolio page section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStatTime(Math.min(15, Math.ceil((15 / steps) * step)));
      setStatTemplates(Math.min(50, Math.ceil((50 / steps) * step)));
      setStatResponsive(Math.min(100, Math.ceil((100 / steps) * step)));
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  // Compile timeline with typewriter delays
  const runGenerationTimeline = () => {
    setCompilingState("compiling");
    setProgress(0);
    setLogs([]);
    setVisibleSections(0);
    setActiveStep(0);

    const logHistory = [];
    
    const stepsData = [
      {
        step: 0,
        logs: ["> initializing blueprint-engine...", "> analyzing user prompt requirements..."],
        progress: 15,
        visibleSecs: 0,
        delay: 800
      },
      {
        step: 1,
        logs: ["> selecting grid layout DNA...", "> rendering layout navigation...", "> generating hero section blueprint..."],
        progress: 35,
        visibleSecs: 1, // Hero appears
        delay: 1100
      },
      {
        step: 2,
        logs: ["> configuring responsive viewport columns...", "> building features showcase layout..."],
        progress: 55,
        visibleSecs: 2, // Features appear
        delay: 1200
      },
      {
        step: 3,
        logs: ["> setting semantic database queries...", "> building pricing structures & testimonials..."],
        progress: 75,
        visibleSecs: 3, // Pricing and reviews appear
        delay: 1100
      },
      {
        step: 4,
        logs: ["> optimizing SEO/GEO structured metadata...", "> compiling responsive footer node..."],
        progress: 95,
        visibleSecs: 4, // Footer appears
        delay: 1000
      },
      {
        step: 5,
        logs: ["> deployment compile finished successfully ✓", "> sandbox preview server is online."],
        progress: 100,
        visibleSecs: 4,
        delay: 500
      }
    ];

    let currentStepIdx = 0;

    const executeNextStep = () => {
      if (currentStepIdx < stepsData.length) {
        const data = stepsData[currentStepIdx];
        setActiveStep(data.step);
        setProgress(data.progress);
        setVisibleSections(data.visibleSecs);

        // Add log lines one by one
        data.logs.forEach(logLine => {
          logHistory.push(logLine);
        });
        setLogs([...logHistory]);

        currentStepIdx++;
        setTimeout(executeNextStep, data.delay);
      } else {
        setCompilingState("completed");
      }
    };

    setTimeout(executeNextStep, 200);
  };

  // Compile on template selection
  useEffect(() => {
    if (isFullscreen) {
      runGenerationTimeline();
    }
  }, [selectedTemplate, isFullscreen]);

  // Handle template switching
  const handleTemplateChange = (e) => {
    const template = templatesList.find(t => t.name === e.target.value);
    if (template) {
      setSelectedTemplate(template);
      setPrompt(template.prompt);
    }
  };

  // Dynamic preview viewport scaling
  useEffect(() => {
    if (!isFullscreen || !modalPreviewContainerRef.current) return;

    const updateScale = () => {
      const container = modalPreviewContainerRef.current;
      if (!container) return;
      
      const parentWidth = container.clientWidth;
      const parentHeight = container.clientHeight;

      let virtualWidth = 1440;
      if (activeDevice === "tablet") virtualWidth = 768;
      if (activeDevice === "mobile") virtualWidth = 390;

      // Leave a small 32px boundary margin around the scaling preview
      const scaleVal = (parentWidth - 32) / virtualWidth;
      setPreviewScale(Math.min(1, scaleVal));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    // Setup ResizeObserver for responsive flex changes
    const observer = new ResizeObserver(updateScale);
    observer.observe(modalPreviewContainerRef.current);

    return () => {
      window.removeEventListener("resize", updateScale);
      observer.disconnect();
    };
  }, [activeDevice, isFullscreen, compilingState]);

  // ═══ Portal: render fullscreen modal directly to document.body ═══
  // This avoids position:fixed being offset by parent ScrollReveal transforms
  const fullscreenModalPortal = isFullscreen ? createPortal(
    <div className="prompts-fullscreen-modal">
      <div className="modal-backdrop-blur"></div>
      
      <div className="modal-inner-workspace">
        
        {/* Left AI System Panel (35% width) */}
        <div className="modal-left-ai-panel">
          {/* Top AI Status Bar */}
          <div className="ai-panel-header">
            <div className="header-badge">
              <span className="neon-blink-dot green"></span>
              <span>AI CONNECTED</span>
            </div>
            <div className="header-badge">
              <span className="neon-blink-dot yellow"></span>
              <span>BLUEPRINT ACTIVE</span>
            </div>
            <div className="header-badge">
              <span className="neon-blink-dot cyan"></span>
              <span>DEPLOYMENT READY</span>
            </div>
          </div>

          {/* Middle Large Prompt Box */}
          <div className="ai-panel-body">
            <h3>Prompt Architecture Configuration</h3>
            
            {/* Template Preset Selector */}
            <div className="ai-field-group">
              <label htmlFor="modal-preset-selector">Active Template Profile</label>
              <select 
                id="modal-preset-selector" 
                value={selectedTemplate.name} 
                onChange={handleTemplateChange}
                className="preset-select-dropdown"
                disabled={compilingState === "compiling"}
              >
                {templatesList.map(t => (
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Main Prompts Textarea */}
            <div className="ai-field-group">
              <label htmlFor="modal-prompt-textarea">System Input Prompt</label>
              <textarea 
                id="modal-prompt-textarea"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={compilingState === "compiling"}
                className="prompt-editable-textarea"
                rows={4}
              />
            </div>

            {/* Compilation Trigger */}
            <button 
              type="button" 
              onClick={runGenerationTimeline}
              disabled={compilingState === "compiling"}
              className="generate-blueprint-btn"
            >
              {compilingState === "compiling" ? (
                <>
                  <Cpu className="spin-icon" size={16} />
                  <span>GENERATING BLUEPRINT... {progress}%</span>
                </>
              ) : (
                <>
                  <span>Generate Website ⚡</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Live Terminal Output */}
          <div className="ai-panel-terminal">
            <div className="terminal-bar">
              <TerminalIcon size={12} className="term-icon" />
              <span>blueprint-builder-timeline.log</span>
              {compilingState === "completed" && (
                <button onClick={runGenerationTimeline} className="term-refresh-btn">
                  <RotateCcw size={10} /> Re-run
                </button>
              )}
            </div>
            <div className="terminal-body">
              <div className="term-prompt-line">
                <span className="prompt-indicator">mubix@prompts:~$</span>
                <span className="typed-command">npm run compile-live --template={selectedTemplate.theme}</span>
              </div>
              <div className="logs-scroller">
                {logs.map((logLine, idx) => (
                  <div key={idx} className={`log-line-item ${logLine.includes("✓") ? "green" : ""}`}>
                    {logLine}
                  </div>
                ))}
                {compilingState === "compiling" && (
                  <div className="log-line-item pulse-line">
                    &gt; compiling layout nodes...
                  </div>
                )}
              </div>
              {compilingState === "compiling" && (
                <div className="terminal-bar-progress">
                  <div className="terminal-bar-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Website Preview Panel (65% width) */}
        <div className="modal-right-preview-panel">
          
          {/* Sticky Top Control Toolbar */}
          <header className="preview-toolbar-sticky">
            <div className="toolbar-title-box">
              <Sparkles size={14} className="sparkle-active-icon" />
              <h4>Live Website Simulation</h4>
            </div>

            <div className="toolbar-actions">
              {/* Viewport Switchers */}
              <div className="viewport-toggle-container">
                <button 
                  onClick={() => setActiveDevice("desktop")} 
                  className={`device-btn ${activeDevice === "desktop" ? "active" : ""}`}
                  title="Desktop View (1440px)"
                >
                  <Monitor size={14} /> <span>Desktop</span>
                </button>
                <button 
                  onClick={() => setActiveDevice("tablet")} 
                  className={`device-btn ${activeDevice === "tablet" ? "active" : ""}`}
                  title="Tablet View (768px)"
                >
                  <Tablet size={14} /> <span>Tablet</span>
                </button>
                <button 
                  onClick={() => setActiveDevice("mobile")} 
                  className={`device-btn ${activeDevice === "mobile" ? "active" : ""}`}
                  title="Mobile View (390px)"
                >
                  <Smartphone size={14} /> <span>Mobile</span>
                </button>
              </div>

              <button onClick={runGenerationTimeline} className="toolbar-btn" title="Recompile preview">
                <RotateCcw size={14} /> <span>Refresh</span>
              </button>

              <button 
                onClick={() => window.open(`${window.location.origin}?preview=${selectedTemplate.theme}`, "_blank")} 
                className="toolbar-btn highlight-btn"
                title="Open full page preview sandbox"
              >
                <ExternalLink size={14} /> <span>Open Live Preview ↗</span>
              </button>

              <button 
                onClick={() => setIsFullscreen(false)} 
                className="toolbar-btn exit-btn" 
                title="Close demo sandbox"
              >
                <X size={15} /> <span>Exit</span>
              </button>
            </div>
          </header>

          {/* Main Preview Container with Canvas Grid */}
          <div className="preview-canvas-workspace" ref={modalPreviewContainerRef}>
            {compilingState === "compiling" && progress < 30 ? (
              /* Loading screen before compilation finishes sections */
              <div className="preview-synthesizing-splash">
                <Cpu size={48} className="spinner-loading-cpu" />
                <h3>AI Compiler Synthesizing Blueprint...</h3>
                <p>Generating styling variables and responsive grid nodes.</p>
              </div>
            ) : (
              /* Scaled Simulated Website Frame */
              <div 
                className={`virtual-website-frame device-type--${activeDevice}`}
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top center",
                  width: activeDevice === "desktop" ? "1440px" : activeDevice === "tablet" ? "768px" : "390px"
                }}
              >
                {/* Simulated Browser Bar Address */}
                <div className="mock-browser-top-bar">
                  <div className="circles">
                    <span className="circle red"></span>
                    <span className="circle yellow"></span>
                    <span className="circle green"></span>
                  </div>
                  <div className="address-bar-input">
                    <span>https://mubixprompts.vercel.app/sandbox/preview/{selectedTemplate.theme}</span>
                  </div>
                </div>

                {/* Simulated HTML DOM Canvas */}
                <div 
                  className="mock-site-html-body"
                  style={{
                    backgroundColor: selectedTemplate.bgColor,
                    color: selectedTemplate.theme === "retro" ? "#111" : "#fff"
                  }}
                >
                  {/* Step 1 & 2: Navbar & Hero Section */}
                  {visibleSections >= 1 && (
                    <div className="section-fade-in-entry">
                      <header className="sb-header" style={{ borderBottom: `2px solid ${selectedTemplate.primaryColor}` }}>
                        <div className="sb-logo">⚡ {selectedTemplate.name.toUpperCase()}</div>
                        <nav className="sb-nav-links">
                          <span>Features</span>
                          <span>Pricing</span>
                          <span>Reviews</span>
                          <span className="sb-cta-badge" style={{ backgroundColor: selectedTemplate.primaryColor }}>Get Started</span>
                        </nav>
                      </header>

                      <section className="sb-hero">
                        <span className="sb-badge" style={{ borderColor: selectedTemplate.secondaryColor, color: selectedTemplate.primaryColor }}>
                          BUILD STATUS: OK ✓
                        </span>
                        <h1 style={{ color: selectedTemplate.primaryColor }}>{selectedTemplate.heroTitle}</h1>
                        <h2>{selectedTemplate.heroSub}</h2>
                        <p className="sb-desc">
                          This responsive component is compiled directly from prompt layout planning. Use the toolbar on top to switch layouts in real-time.
                        </p>
                        <div className="sb-actions">
                          <span className="sb-btn sb-btn--primary" style={{ backgroundColor: selectedTemplate.primaryColor }}>
                            Get Started Now
                          </span>
                          <span className="sb-btn sb-btn--secondary">
                            View Blueprint Info
                          </span>
                        </div>
                      </section>
                    </div>
                  )}

                  {/* Step 3: Features cards list */}
                  {visibleSections >= 2 && (
                    <section className="sb-features section-fade-in-entry" style={{ backgroundColor: selectedTemplate.theme === "retro" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)" }}>
                      <h3 style={{ borderBottom: `1px dashed ${selectedTemplate.primaryColor}` }}>System Features</h3>
                      <div className="sb-features-grid">
                        {selectedTemplate.features.map((feat, idx) => (
                          <div key={idx} className="sb-feature-card">
                            <span className="f-icon">{feat.icon}</span>
                            <h5>{feat.title}</h5>
                            <p>{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Step 4: Pricing and Testimonials */}
                  {visibleSections >= 3 && (
                    <div className="section-fade-in-entry">
                      <section className="sb-pricing">
                        <h3 style={{ borderBottom: `1px dashed ${selectedTemplate.primaryColor}` }}>Flexible Subscriptions</h3>
                        <div className="sb-pricing-grid">
                          {selectedTemplate.pricing.map((tier, idx) => (
                            <div key={idx} className="sb-pricing-card" style={{ borderColor: selectedTemplate.primaryColor }}>
                              <span className="pricing-tier-name">{tier.name}</span>
                              <h4 className="pricing-value" style={{ color: selectedTemplate.primaryColor }}>{tier.price}</h4>
                              <p>{tier.desc}</p>
                              <button className="pricing-action-btn" style={{ backgroundColor: selectedTemplate.primaryColor }}>{tier.action}</button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="sb-testimonials" style={{ backgroundColor: selectedTemplate.theme === "retro" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)" }}>
                        <h3 style={{ borderBottom: `1px dashed ${selectedTemplate.primaryColor}` }}>Reviews</h3>
                        <div className="sb-testimonials-grid">
                          {selectedTemplate.testimonials.map((test, idx) => (
                            <div key={idx} className="sb-testimonial-card">
                              <p className="quote">"{test.quote}"</p>
                              <span className="author">— {test.author}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {/* Step 5: Footer */}
                  {visibleSections >= 4 && (
                    <footer className="sb-footer section-fade-in-entry">
                      <p>&copy; 2026 {selectedTemplate.heroTitle}. All rights reserved. Compiled via MUBIX Prompts operating system.</p>
                    </footer>
                  )}
                </div>
              </div>
            )}

            {/* AI Timeline Status overlay tracker */}
            <div className="compilation-timeline-status-overlay">
              <h5>AI TIMELINE PROGRESS</h5>
              <ul className="timeline-steps-list">
                <li className={activeStep >= 1 ? "completed" : activeStep === 0 ? "active" : ""}>
                  <span className="circle"></span>
                  <span className="label">Step 1: Prompt Analysis</span>
                </li>
                <li className={activeStep >= 2 ? "completed" : activeStep === 1 ? "active" : ""}>
                  <span className="circle"></span>
                  <span className="label">Step 2: Layout Generation</span>
                </li>
                <li className={activeStep >= 3 ? "completed" : activeStep === 2 ? "active" : ""}>
                  <span className="circle"></span>
                  <span className="label">Step 3: Responsive Engine</span>
                </li>
                <li className={activeStep >= 4 ? "completed" : activeStep === 3 ? "active" : ""}>
                  <span className="circle"></span>
                  <span className="label">Step 4: SEO Optimization</span>
                </li>
                <li className={activeStep >= 5 ? "completed" : activeStep === 4 ? "active" : ""}>
                  <span className="circle"></span>
                  <span className="label">Step 5: Deployment Preview</span>
                </li>
              </ul>
              {compilingState === "compiling" && (
                <div className="timeline-global-spinner">
                  <RefreshCw size={12} className="spinner-icon" />
                  <span>Compiling Blueprint...</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div ref={showcaseRef} style={{ width: "100%" }}>
      <div className="prompts-dotted-overlay"></div>
      
      <div className="mubixprompts-showcase-container">
        {/* Left Column: Branding, Pitch, Stats & CTA */}
        <div className="mubixprompts-showcase-left">
          <div className="mubixprompts-badge">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>AI WEBSITE BLUEPRINT ENGINE</span>
          </div>
          
          <h2 className="mubixprompts-showcase-headline">
            MUBIX PROMPTS
          </h2>
          
          <p className="eyebrow sticker sticker--violet" style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
            Generate Complete Websites Using AI-Powered Prompt Architecture
          </p>

          <p className="mubixprompts-showcase-subheadline">
            Transform simple ideas into production-ready website systems with intelligent AI prompt generation, responsive layouts, deployment planning, SEO optimization, and live blueprint compilation.
          </p>

          {/* Feature Specs Stats */}
          <div className="mubixprompts-specs-grid">
            <div className="spec-item">
              <span className="spec-val">&lt;{statTime}s</span>
              <span className="spec-lbl">Average Generation</span>
            </div>
            <div className="spec-item">
              <span className="spec-val">{statTemplates}+</span>
              <span className="spec-lbl">Website Templates</span>
            </div>
            <div className="spec-item">
              <span className="spec-val">{statResponsive}%</span>
              <span className="spec-lbl">Responsive Layouts</span>
            </div>
            <div className="spec-item">
              <span className="spec-val">AI+</span>
              <span className="spec-lbl">Prompt Optimization</span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="mubixprompts-showcase-actions">
            <a 
              href="https://mubixprompts.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn--secondary prompts-launch-btn"
            >
              <span>Launch Mubix Prompts</span>
              <span aria-hidden="true" style={{ fontSize: "1.2rem", marginLeft: "4px" }}>⚡</span>
            </a>
            
            <button 
              type="button" 
              onClick={() => setIsFullscreen(true)}
              className="btn btn--outline prompts-explore-btn"
            >
              <span>Watch Live Demo</span>
              <span aria-hidden="true" style={{ marginLeft: "4px" }}>🔍</span>
            </button>
          </div>
        </div>

        {/* Right Column: Static Live Showcase Display Cards */}
        <div className="mubixprompts-showcase-right">
          <div className="prompts-static-cards">
            <div className="mock-window">
              <div className="mock-window-bar">
                <div className="dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="title">mubixprompts.com/studio</div>
              </div>
              <div className="mock-window-content">
                <h4 style={{ color: "var(--neo-accent)", margin: "0 0 0.5rem" }}>⚡ AI GENERATOR STATUS</h4>
                <p style={{ margin: "0 0 1rem", fontSize: "0.95rem" }}>
                  The blueprint engine translates raw prompts into fully operational CSS & HTML layouts, including automated Vercel deployment setups.
                </p>
                <div className="mock-code-block">
                  <pre><code>{`// Compiled Blueprint Stack
const webConfig = {
  framework: "React/Vite",
  theme: "Cyber Brutalist",
  deployment: "Vercel Build",
  seo: "Optimized (Zod-schema)"
};`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under Hero Feature Strip */}
      <div className="mubixprompts-features-grid" id="prompts-features">
        <BrutalCard className="feature-block-card block-card--purple">
          <div className="card-badge">⚡ Generation</div>
          <h3>AI Prompt Compiler</h3>
          <p>Transforms raw ideas into highly structured developer-ready prompts with section layout plans.</p>
        </BrutalCard>
        
        <BrutalCard className="feature-block-card block-card--yellow">
          <div className="card-badge">📱 Layouts</div>
          <h3>Responsive Engine</h3>
          <p>Generates layout grids compatible with mobile, tablet, and widescreen desktop experiences.</p>
        </BrutalCard>

        <BrutalCard className="feature-block-card block-card--coral">
          <div className="card-badge">🚀 Host</div>
          <h3>Deployment Ready</h3>
          <p>Compiles optimized build commands for Vercel, Netlify, and GitHub workflows.</p>
        </BrutalCard>

        <BrutalCard className="feature-block-card block-card--blue">
          <div className="card-badge">🎨 Styling</div>
          <h3>Live Theme Builder</h3>
          <p>Configures semantic color variables, responsive typography DNA, and dynamic assets.</p>
        </BrutalCard>

        <BrutalCard className="feature-block-card block-card--green">
          <div className="card-badge">🧠 Discovery</div>
          <h3>SEO Optimization</h3>
          <p>Integrates structured FAQ graphs, crawl rules, OpenGraph meta, and semantic titles.</p>
        </BrutalCard>

        <BrutalCard className="feature-block-card block-card--orange">
          <div className="card-badge">🔒 Cyber</div>
          <h3>Security Architecture</h3>
          <p>Includes telemetry configurations, firewall headers, and sandboxed iframe parameters.</p>
        </BrutalCard>
      </div>

      {/* Bottom Mini Tags */}
      <div className="prompts-mini-tags">
        <span className="mini-tag">⚡ AI Prompt Engine</span>
        <span className="mini-tag">🎨 Responsive UI</span>
        <span className="mini-tag">🚀 Deploy Ready</span>
        <span className="mini-tag">🧠 Smart Blueprint</span>
        <span className="mini-tag">📱 Mobile Optimized</span>
      </div>

      {/* ═══ FULLSCREEN MODAL — rendered via Portal to document.body ═══ */}
      {fullscreenModalPortal}
    </div>
  );
}
