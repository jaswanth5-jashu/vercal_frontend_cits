import React, { useMemo, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/hackathon.css";

const MAX_MEMBERS = 6;

const BRANCHES = ["CSE", "ECE"];
const SECTIONS = ["A", "B"];
const YEARS = ["1st", "2nd"];

const emptyMember = () => ({
  fullName: "",
  email: "",
  phone: "",
  branch: "",
  section: "",
  year: "",
});

export default function Hackathon() {
  // scroll ref
  const registrationRef = useRef(null);

  // ✅ RULES MODAL STATE
  const [showRules, setShowRules] = useState(false);

  // teamName
  const [teamName, setTeamName] = useState("");

  // leader
  const [leader, setLeader] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    section: "",
    year: "",
  });

  // members
  const [members, setMembers] = useState([]);

  const memberCount = useMemo(() => 1 + members.length, [members.length]);
  const canAdd = memberCount < MAX_MEMBERS;

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openRules = () => setShowRules(true);
  const closeRules = () => setShowRules(false);

  // ✅ ESC key to close modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeRules();
    };
    if (showRules) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showRules]);

  // optional: prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showRules ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showRules]);

  const addMember = () => {
    if (!canAdd) return;
    setMembers((prev) => [...prev, emptyMember()]);
  };

  const deleteMember = (idx) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateLeader = (key, value) => {
    setLeader((prev) => ({ ...prev, [key]: value }));
  };

  const updateMember = (idx, key, value) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [key]: value } : m))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      teamName,
      leader,
      members,
      totalParticipants: 1 + members.length,
    };

    console.log("Registration Payload:", payload);
    alert("Registered! (Check console for payload)");
  };

  return (
    <div className="hackathon-page">
      {/* ================= HERO ================= */}
      <section className="hack-hero">
        <div className="container text-center hack-box">
          <div className="hack-badge">
            <i className="bi bi-trophy-fill" /> CITS Hackathon 2026
          </div>

          <h1 className="hack-title">
            Code. Create. <span>Conquer.</span>
          </h1>

          <p className="hack-text">
            Join the ultimate 24-hour coding challenge. Build innovative solutions,
            compete with the best, and win exciting prizes!
          </p>

          <div className="hack-info">
            <div className="hack-pill">
              <i className="bi bi-calendar-event" /> March 15–16, 2026
            </div>
            <div className="hack-pill">
              <i className="bi bi-geo-alt" /> CITS Campus
            </div>
            <div className="hack-pill">
              <i className="bi bi-people" /> Teams of 2–6
            </div>
          </div>

          {/* ✅ ACTION BUTTONS */}
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              className="btn btn-light"
              onClick={scrollToRegistration}
            >
              Register
            </button>

            {/* ✅ Rules now opens popup (NOT route) */}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={openRules}
            >
              Rules
            </button>

            <NavLink to="/contact" className="btn btn-outline-light">
              Contact
            </NavLink>
          </div>
        </div>
      </section>

      {/* ================= REGISTRATION ================= */}
      <section ref={registrationRef} className="reg-sec py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="reg-title">Team Registration</h2>
            <p className="reg-sub">Register your team for the hackathon (2–6 members)</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* TEAM NAME */}
            <div className="reg-card mb-4">
              {/* ✅ remove fw-semibold (it makes bold) */}
              <label className="form-label">
                Team Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>

            {/* TEAM LEADER */}
            <div className="reg-card mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-badge fs-5" />
                <h5 className="mb-0">Team Leader</h5>
                <span className="badge bg-primary-subtle text-primary"></span>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-control"
                    value={leader.fullName}
                    onChange={(e) => updateLeader("fullName", e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={leader.email}
                    onChange={(e) => updateLeader("email", e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number *</label>
                  <input
                    className="form-control"
                    value={leader.phone}
                    onChange={(e) => updateLeader("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Branch *</label>
                  <select
                    className="form-select"
                    value={leader.branch}
                    onChange={(e) => updateLeader("branch", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Section *</label>
                  <select
                    className="form-select"
                    value={leader.section}
                    onChange={(e) => updateLeader("section", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {SECTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Year *</label>
                  <select
                    className="form-select"
                    value={leader.year}
                    onChange={(e) => updateLeader("year", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* MEMBERS */}
            {members.map((m, idx) => (
              <div key={idx} className="reg-card mem-card mb-4">
                <button
                  type="button"
                  className="mem-del"
                  onClick={() => deleteMember(idx)}
                  aria-label={`Remove member ${idx + 2}`}
                >
                  ×
                </button>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-people fs-5" />
                  <h5 className="mb-0">Member {idx + 2}</h5>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-control"
                      value={m.fullName}
                      onChange={(e) => updateMember(idx, "fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={m.email}
                      onChange={(e) => updateMember(idx, "email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone *</label>
                    <input
                      className="form-control"
                      value={m.phone}
                      onChange={(e) => updateMember(idx, "phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Branch *</label>
                    <select
                      className="form-select"
                      value={m.branch}
                      onChange={(e) => updateMember(idx, "branch", e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Section *</label>
                    <select
                      className="form-select"
                      value={m.section}
                      onChange={(e) => updateMember(idx, "section", e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {SECTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Year *</label>
                    <select
                      className="form-select"
                      value={m.year}
                      onChange={(e) => updateMember(idx, "year", e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* ADD MEMBER */}
            {canAdd && (
              <div
                className="add-mem"
                onClick={addMember}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") addMember();
                }}
              >
                <span className="add-plus">+</span>
                <span>{`Add Team Member (${memberCount}/${MAX_MEMBERS})`}</span>
              </div>
            )}

            {/* SUBMIT */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-5">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-sec">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="stat-card">
                <i className="bi bi-trophy" />
                <h3>₹50,000</h3>
                <p>Prize Pool</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <i className="bi bi-people" />
                <h3>100+</h3>
                <p>Participants Expected</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card">
                <i className="bi bi-calendar-event" />
                <h3>24 Hours</h3>
                <p>Non-Stop Coding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RULES MODAL ================= */}
      {showRules && (
        <div className="rules-overlay" onClick={closeRules} role="dialog" aria-modal="true">
          <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rules-head">
              <h5 className="rules-title">
                <i className="bi bi-shield-check" /> Hackathon Rules
              </h5>
              <button className="rules-close" onClick={closeRules} aria-label="Close rules">
                ×
              </button>
            </div>

            <ol className="rules-list">
              <li>Teams must have 2–6 members (including leader).</li>
              <li>Bring your college ID and laptop.</li>
              <li>No plagiarism — original work only.</li>
              <li>All coding must be done during the 24-hour event window.</li>
              <li>Judging based on innovation, impact, and working demo.</li>
              <li>Respect venue rules and maintain professionalism.</li>
            </ol>

            <div className="rules-actions">
              <button type="button" className="btn btn-primary" onClick={closeRules}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}