"use client";

import { useState } from "react";
import styles from "@/app/home.module.css";

export default function DemoForm({ className }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    size: "Mid (5–20 sites)", intent: "", msg: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: "" });
    if (status === "error") setStatus("idle");
  };
  const setIntent = (v) => {
    setForm({ ...form, intent: v });
    setErrors({ ...errors, intent: "" });
    if (status === "error") setStatus("idle");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.company.trim()) errs.company = "Required";
    if (!form.intent) errs.intent = "Pick one";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setStatus("sending");
      
      try {
        console.log("Submitting form to /api/send...", form);
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("Submission successful:", result);
          setStatus("success");
          setSent(true);
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error("Submission failed:", errData);
          setServerError(errData.error || "Something went wrong.");
          setStatus("error");
        }
      } catch (error) {
        console.error("Network or catch error:", error);
        setServerError("Connection error. Please check your internet.");
        setStatus("error");
      }
    }
  };

  if (sent) {
    return (
      <div className={`${className ?? styles.formCard} ${styles.formSuccess}`}>
        <div className={styles.formSuccessTag}>✓ REQUEST RECEIVED</div>
        <h3 className={styles.formSuccessTitle}>Thanks, {form.name.split(" ")[0]}.</h3>
        <p className={styles.formSuccessBody}>
          We received your request for <strong>{form.intent}</strong>. A BuildUNIX engineer will
          reach out within 24 hours with next steps.
        </p>
        <button
          className="button buttonGhost"
          onClick={() => { 
            setSent(false); 
            setStatus("idle");
            setForm({ name: "", email: "", company: "", role: "", size: "Mid (5–20 sites)", intent: "", msg: "" }); 
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const intents = [
    { k: "Improve QoS", d: "Tighter quality control & on-site evidence" },
    { k: "Reduce time", d: "Eliminate delays & speed up phase handoffs" },
    { k: "Improve profits", d: "Stop money mismanagement & leakage" },
  ];

  return (
    <form className={className ?? styles.formCard} onSubmit={submit} noValidate>
      <div className={styles.formGrid}>
        <div className={`${styles.field} ${errors.name ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>Full name</label>
          <input className={styles.fieldInput} type="text" placeholder="Jane Menon" value={form.name} onChange={update("name")} disabled={status === "sending"} />
          <div className={styles.fieldErr}>{errors.name}</div>
        </div>
        <div className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>Work email</label>
          <input className={styles.fieldInput} type="email" placeholder="jane@company.com" value={form.email} onChange={update("email")} disabled={status === "sending"} />
          <div className={styles.fieldErr}>{errors.email}</div>
        </div>
        <div className={`${styles.field} ${errors.company ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>Company</label>
          <input className={styles.fieldInput} type="text" placeholder="Meridian Infra" value={form.company} onChange={update("company")} disabled={status === "sending"} />
          <div className={styles.fieldErr}>{errors.company}</div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Role</label>
          <input className={styles.fieldInput} type="text" placeholder="Project Director" value={form.role} onChange={update("role")} disabled={status === "sending"} />
          <div className={styles.fieldErr}></div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel}>Portfolio size</label>
          <select className={styles.fieldInput} value={form.size} onChange={update("size")} disabled={status === "sending"}>
            <option>Small (1–5 sites)</option>
            <option>Mid (5–20 sites)</option>
            <option>Large (20–50 sites)</option>
            <option>Enterprise (50+ sites)</option>
          </select>
          <div className={styles.fieldErr}></div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull} ${errors.intent ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>What&apos;s the goal?</label>
          <div className={styles.intentGrid}>
            {intents.map((it) => (
              <button
                type="button"
                key={it.k}
                className={`${styles.intentOpt} ${form.intent === it.k ? styles.intentOptOn : ""}`}
                onClick={() => setIntent(it.k)}
                disabled={status === "sending"}
              >
                <span className={styles.intentOptTitle}>{it.k}</span>
                <span className={styles.intentOptDesc}>{it.d}</span>
              </button>
            ))}
          </div>
          <div className={styles.fieldErr}>{errors.intent}</div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel}>Anything else?</label>
          <textarea
            className={styles.fieldTextarea}
            placeholder="Tell us about current pain points, number of active sites, timelines…"
            value={form.msg}
            onChange={update("msg")}
            disabled={status === "sending"}
          />
          <div className={styles.fieldErr}></div>
        </div>
      </div>

      {status === "error" && (
        <div className={styles.formErrorMsg}>
          {serverError || "Something went wrong. Please try again or email us directly at info@buildunix.com"}
        </div>
      )}

      <button 
        type="submit" 
        className={`button buttonAccent ${styles.formSubmit}`}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Book a pilot →"}
      </button>
      <p className={styles.formNote}>
        NO CREDIT CARD · SHIP IN UNDER A WEEK · FREE 30-DAY PILOT
      </p>
    </form>
  );
}
