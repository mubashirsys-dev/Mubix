import { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Mail,
  User,
  Tag,
  MessageSquare,
  Phone,
  ChevronDown,
  Search
} from "lucide-react";
import "./ContactModal.css";

const WEB3FORMS_ACCESS_KEY = "db719e89-2348-4b0f-8c84-18f2201e308d";

const COUNTRY_CODES = [
  { code: "+91", name: "India", iso: "in", digits: 10 },
  { code: "+1", name: "United States", iso: "us", digits: 10 },
  { code: "+1", name: "Canada", iso: "ca", digits: 10 },
  { code: "+44", name: "United Kingdom", iso: "gb", digits: 10 },
  { code: "+971", name: "United Arab Emirates", iso: "ae", digits: 9 },
  { code: "+966", name: "Saudi Arabia", iso: "sa", digits: 9 },
  { code: "+61", name: "Australia", iso: "au", digits: 9 },
  { code: "+49", name: "Germany", iso: "de", digits: 10 },
  { code: "+33", name: "France", iso: "fr", digits: 9 },
  { code: "+81", name: "Japan", iso: "jp", digits: 10 },
  { code: "+65", name: "Singapore", iso: "sg", digits: 8 },
  { code: "+60", name: "Malaysia", iso: "my", digits: 9 },
  { code: "+92", name: "Pakistan", iso: "pk", digits: 10 },
  { code: "+880", name: "Bangladesh", iso: "bd", digits: 10 },
  { code: "+94", name: "Sri Lanka", iso: "lk", digits: 9 },
  { code: "+977", name: "Nepal", iso: "np", digits: 10 },
  { code: "+62", name: "Indonesia", iso: "id", digits: 10 },
  { code: "+63", name: "Philippines", iso: "ph", digits: 10 },
  { code: "+86", name: "China", iso: "cn", digits: 11 },
  { code: "+82", name: "South Korea", iso: "kr", digits: 10 },
  { code: "+55", name: "Brazil", iso: "br", digits: 11 },
  { code: "+52", name: "Mexico", iso: "mx", digits: 10 },
  { code: "+27", name: "South Africa", iso: "za", digits: 9 },
  { code: "+234", name: "Nigeria", iso: "ng", digits: 10 },
  { code: "+20", name: "Egypt", iso: "eg", digits: 10 },
  { code: "+7", name: "Russia", iso: "ru", digits: 10 },
  { code: "+34", name: "Spain", iso: "es", digits: 9 },
  { code: "+39", name: "Italy", iso: "it", digits: 10 },
  { code: "+31", name: "Netherlands", iso: "nl", digits: 9 },
  { code: "+41", name: "Switzerland", iso: "ch", digits: 9 },
  { code: "+46", name: "Sweden", iso: "se", digits: 9 },
  { code: "+47", name: "Norway", iso: "no", digits: 8 },
  { code: "+968", name: "Oman", iso: "om", digits: 8 },
  { code: "+974", name: "Qatar", iso: "qa", digits: 8 },
  { code: "+965", name: "Kuwait", iso: "kw", digits: 8 },
  { code: "+973", name: "Bahrain", iso: "bh", digits: 8 },
];

const QUICK_MESSAGES = [
  {
    label: "🌐 Web Project",
    subject: "Website / Web Application Project",
    message: "Hi Mubashir, I need a modern website or web application built for my business. Let's connect!",
  },
  {
    label: "📱 Mobile App",
    subject: "Mobile Application Development",
    message: "Hi Mubashir, I need a custom mobile application developed for iOS and Android.",
  },
  {
    label: "🛒 E-commerce Site",
    subject: "E-commerce Website Development",
    message: "Hi Mubashir, I am looking to build a full-featured e-commerce online store with payment integrations.",
  },
  {
    label: "📊 ERP System",
    subject: "Custom ERP / Management System",
    message: "Hi Mubashir, I need an ERP or enterprise management system to automate business workflows and data.",
  },
  {
    label: "🔄 Website Cloning",
    subject: "Website Cloning & Revamp",
    message: "Hi Mubashir, I would like to clone, redesign, or modernize an existing website.",
  },
  {
    label: "🤖 AI & Chatbots",
    subject: "AI Integration & Automation",
    message: "Hi Mubashir, I am interested in integrating AI features, intelligent chatbots, or automations into my product.",
  },
  {
    label: "💼 Freelance Work",
    subject: "Freelance Collaboration Opportunity",
    message: "Hi Mubashir, I have a freelance project opportunity and would love to collaborate with you.",
  },
  {
    label: "🎨 UI/UX Redesign",
    subject: "UI/UX Design & Frontend Redesign",
    message: "Hi Mubashir, I want to redesign my website's user interface and user experience with a clean aesthetic.",
  },
  {
    label: "🎯 SEO & GEO",
    subject: "SEO & AI Engine Optimization",
    message: "Hi Mubashir, I want to optimize my website for traditional search engines and AI crawlers.",
  },
  {
    label: "💻 Full Stack App",
    subject: "Full Stack Web Application",
    message: "Hi Mubashir, I need a complete database-driven web platform with admin tools and API integration.",
  },
  {
    label: "👋 Say Hello",
    subject: "General Inquiry",
    message: "Hi Mubashir, I came across your portfolio and wanted to reach out!",
  },
];

export function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // Default India 🇮🇳 +91
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryPickerRef = useRef(null);

  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (isCountryDropdownOpen) {
          setIsCountryDropdownOpen(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (countryPickerRef.current && !countryPickerRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isCountryDropdownOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const cleanVal = e.target.value.replace(/[^0-9\s\-]/g, "");
    setFormData((prev) => ({ ...prev, phone: cleanVal }));
    validatePhoneNumber(cleanVal, selectedCountry);
  };

  const validatePhoneNumber = (phoneVal, countryObj) => {
    if (!phoneVal.trim()) {
      setPhoneError("");
      return true;
    }

    const digitsOnly = phoneVal.replace(/[^0-9]/g, "");

    if (countryObj.iso === "in" && digitsOnly.length !== 10) {
      setPhoneError("India (+91) phone number must be 10 digits.");
      return false;
    }

    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setPhoneError("Phone number must be between 7 and 15 digits.");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setCountrySearch("");
    validatePhoneNumber(formData.phone, country);
  };

  const handleQuickSelect = (qm) => {
    setFormData((prev) => ({
      ...prev,
      subject: qm.subject,
      message: qm.message,
    }));
  };

  const filteredCountries = COUNTRY_CODES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch) ||
    c.iso.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    if (formData.phone.trim() && !validatePhoneNumber(formData.phone, selectedCountry)) {
      setStatus("error");
      setErrorMessage("Please fix the invalid phone number before sending.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const fullPhone = formData.phone.trim()
      ? `${selectedCountry.name} (${selectedCountry.code}) ${formData.phone.trim()}`
      : "Not provided";

    // Use FormData POST submission (the standard Web3Forms payload)
    const formDataToSend = new FormData();
    formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("email", formData.email.trim());
    formDataToSend.append("phone", fullPhone);
    formDataToSend.append("subject", formData.subject.trim() || `New Contact Message from ${formData.name.trim()}`);
    formDataToSend.append("message", formData.message.trim());
    formDataToSend.append("from_name", "MUBIX Portfolio");
    formDataToSend.append("replyto", formData.email.trim());
    formDataToSend.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("[Web3Forms Response]", result);

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setPhoneError("");
      } else {
        console.error("[Web3Forms Submission Failed]", result);
        setStatus("error");
        setErrorMessage(
          result.message || "Web3Forms submission failed. Please check your Web3Forms access key or recipient email activation."
        );
      }
    } catch (err) {
      console.error("[Web3Forms Network Error]", err);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection and try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
    setPhoneError("");
  };

  return (
    <div
      className="contact-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="contact-modal-card">
        {/* Header */}
        <div className="contact-modal-header">
          <div className="contact-modal-title-group">
            <span className="contact-modal-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Get In Touch</span>
            </span>
            <h2 id="contact-modal-title">Send a Message</h2>
          </div>
          <button
            className="contact-modal-close"
            onClick={onClose}
            aria-label="Close contact form modal"
            type="button"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="contact-modal-body">
          {status === "success" ? (
            <div className="contact-success-state">
              <div className="success-icon-wrapper">
                <CheckCircle size={48} className="success-icon" />
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you for reaching out! Your message has been delivered to Mohammed Mubashir. You will receive a response via email shortly.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="contact-submit-btn contact-submit-btn--secondary"
                  onClick={handleReset}
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  className="contact-submit-btn"
                  onClick={onClose}
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {status === "error" && (
                <div className="contact-error-banner" role="alert">
                  <AlertCircle size={20} className="error-icon" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid 2-cols: Name & Email */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="contact-name">
                    <User size={15} />
                    <span>FULL NAME <span className="required-star">*</span></span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    disabled={status === "sending"}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">
                    <Mail size={15} />
                    <span>EMAIL ADDRESS <span className="required-star">*</span></span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              {/* Grid 2-cols: Phone Number & Subject */}
              <div className="form-row-2col">
                {/* Phone Number Field with Flag & Search Selector */}
                <div className="form-group">
                  <label htmlFor="contact-phone">
                    <Phone size={15} />
                    <span>PHONE NUMBER <span className="optional-tag">(OPTIONAL)</span></span>
                  </label>
                  <div className="phone-input-wrapper">
                    <div className="country-picker-container" ref={countryPickerRef}>
                      <button
                        type="button"
                        className="country-picker-btn"
                        onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                        disabled={status === "sending"}
                        aria-label="Select Country Code"
                      >
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                          alt={selectedCountry.name}
                          className="country-btn-flag-img"
                          width="20"
                          height="14"
                        />
                        <span className="country-btn-code">{selectedCountry.code}</span>
                        <ChevronDown size={14} className={`chevron-icon ${isCountryDropdownOpen ? "is-open" : ""}`} />
                      </button>

                      {isCountryDropdownOpen && (
                        <div className="country-dropdown-menu">
                          <div className="country-search-box">
                            <Search size={14} className="search-icon" />
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <div className="country-options-list">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <button
                                  key={`${c.iso}-${c.code}`}
                                  type="button"
                                  className={`country-option-item ${selectedCountry.iso === c.iso ? "is-selected" : ""}`}
                                  onClick={() => handleCountrySelect(c)}
                                >
                                  <img
                                    src={`https://flagcdn.com/w40/${c.iso}.png`}
                                    alt={c.name}
                                    className="country-option-flag-img"
                                    width="20"
                                    height="14"
                                    loading="lazy"
                                  />
                                  <span className="option-name">{c.name}</span>
                                  <span className="option-code">{c.code}</span>
                                </button>
                              ))
                            ) : (
                              <div className="no-countries-found">No country found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.iso === "in" ? "9876543210" : "Phone number"}
                      disabled={status === "sending"}
                      className={phoneError ? "input-has-error" : ""}
                    />
                  </div>
                  {phoneError && <span className="inline-field-error">{phoneError}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">
                    <Tag size={15} />
                    <span>SUBJECT</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Website Project / Freelance Work"
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              {/* Quick Messages Selection - Positioned right above Message textarea */}
              <div className="quick-messages-section">
                <span className="quick-messages-title">
                  <Sparkles size={14} /> QUICK TOPICS:
                </span>
                <div className="quick-messages-chips">
                  {QUICK_MESSAGES.map((qm) => (
                    <button
                      key={qm.label}
                      type="button"
                      className={`quick-chip ${formData.subject === qm.subject ? "is-selected" : ""}`}
                      onClick={() => handleQuickSelect(qm)}
                      disabled={status === "sending"}
                    >
                      {qm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Message */}
              <div className="form-group">
                <label htmlFor="contact-message">
                  <MessageSquare size={15} />
                  <span>YOUR MESSAGE <span className="required-star">*</span></span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Mubashir, I'd like to discuss a project..."
                  required
                  disabled={status === "sending"}
                />
              </div>

              <button
                type="submit"
                className={`contact-submit-btn ${status === "sending" ? "is-sending" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" />
                    <span>SENDING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
