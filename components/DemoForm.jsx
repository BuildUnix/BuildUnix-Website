"use client";

import { useState } from "react";
import styles from "@/app/home.module.css";

export default function DemoForm({ className }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    size: "1 tower", intent: "", msg: "",
    siteLocation: "",
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
    if (!form.siteLocation.trim()) errs.siteLocation = "Required";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setStatus("sending");
      
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setStatus("success");
          setSent(true);
        } else {
          const errData = await response.json().catch(() => ({}));
          setServerError(errData.error || "Something went wrong.");
          setStatus("error");
        }
      } catch (error) {
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
          We received your request for <strong>{form.intent}</strong>. A BuildUNIX team member will
          reach out within 24 hours to schedule your walkthrough.
        </p>
        <button
          className="button buttonGhost"
          onClick={() => { 
            setSent(false); 
            setStatus("idle");
            setForm({ name: "", email: "", company: "", role: "", size: "1 tower", intent: "", msg: "", siteLocation: "" }); 
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const intents = [
    { k: "Accountability", d: "Clear ownership & photo proof on every stage" },
    { k: "Delays", d: "Spot late work early & speed up PMC approvals" },
    { k: "Rework", d: "Catch mistakes before the next stage starts" },
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
          <label className={styles.fieldLabel}>Size of your project</label>
          <select className={styles.fieldInput} value={form.size} onChange={update("size")} disabled={status === "sending"}>
            <option>1 tower</option>
            <option>2–5 towers</option>
            <option>6+ towers</option>
            <option>Not sure</option>
          </select>
          <div className={styles.fieldErr}></div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull} ${errors.intent ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>What do you want to fix?</label>
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
        <div className={`${styles.field} ${styles.fieldFull} ${errors.siteLocation ? styles.fieldError : ""}`}>
          <label className={styles.fieldLabel}>Site location</label>
          <input className={styles.fieldInput} type="text" placeholder="e.g. Hitech City, Hyderabad" value={form.siteLocation} onChange={update("siteLocation")} disabled={status === "sending"} />
          <div className={styles.fieldErr}>{errors.siteLocation}</div>
        </div>
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.fieldLabel}>Anything else?</label>
          <textarea
            className={styles.fieldTextarea}
            placeholder="Tell us about your project, current bottlenecks, timelines…"
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
        LIVE IN ABOUT ONE WEEK · TRY IT ON ONE TOWER
      </p>
    </form>
  );
}
