import { GraduationCap, MapPin, CheckCircle } from "lucide-react";
import { resume } from "../data/resume.js";

export function ProfileCard() {
  return (
    <aside className="profile-card" aria-label="Personal profile">
      <div className="profile-card-inner">
        <div className="profile-image-wrapper">
          <div className="profile-image-container">
            <img
              src={resume.imageUrl}
              alt="Mohammed Mubashir"
              className="profile-image profile-image--light"
              loading="eager"
              fetchPriority="high"
              width="280"
              height="280"
            />
            <img
              src="/MUBASHIR-CYBER.jpeg"
              alt="Mohammed Mubashir Cyber"
              className="profile-image profile-image--dark"
              loading="eager"
              fetchPriority="high"
              width="280"
              height="280"
            />
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-badge profile-badge--edu">
            <GraduationCap size={16} aria-hidden="true" />
            <span>BTech Computer Science</span>
          </div>
          <div className="profile-badge profile-badge--loc">
            <MapPin size={16} aria-hidden="true" />
            <span>Aurangabad, Maharashtra</span>
          </div>
          <div className="profile-badge profile-badge--avail">
            <CheckCircle size={16} aria-hidden="true" />
            <span>Available for Projects</span>
          </div>
        </div>

        <div className="profile-stats">
          {resume.highlights.map((item) => (
            <div className="profile-stat" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
