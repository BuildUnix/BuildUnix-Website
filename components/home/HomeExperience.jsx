"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "@/app/home.module.css";
import { companyEmail, homeBenefits } from "@/lib/site-content";
import dynamic from "next/dynamic";
const DemoForm = dynamic(() => import("@/components/DemoForm"), { ssr: false });

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  let btnRAF = null;
  const onBtnMove = (e) => {
    if (btnRAF) return;
    const el = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    btnRAF = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--y", `${((cy - r.top) / r.height) * 100}%`);
      btnRAF = null;
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <span className={styles.heroDot} />
          <span>Construction site management app, India</span>
        </div>

        <h1 className={styles.heroTitle}>
          Know what is happening on your site. Every day.
        </h1>

        <p className={styles.heroLede}>
          BuildUNIX is one app for owners, PMCs, engineers and contractors. Everyone updates work and uploads photos. Each stage is approved before the next one starts.
        </p>

        <div className={styles.heroActions}>
          <div className={styles.heroCta}>
            <Link href="/contact" className="button buttonPrimary" onMouseMove={onBtnMove}>
              Book a pilot
            </Link>
            <Link href="/product#how-it-works" className={`button buttonGhost ${styles.heroBtn}`} onMouseMove={onBtnMove}>
              See how it works
            </Link>
          </div>

          <p className={styles.heroProofLine} style={{ marginTop: "1rem", color: "var(--text-muted, #94a3b8)", fontSize: "0.9375rem" }}>
            Running now on a residential project in Hyderabad.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Benefits ───────────────────────────────────────── */
function BenefitsSection() {
  useEffect(() => {
    let raf = null;
    const handler = (e) => {
      if (raf) return;
      const card = e.currentTarget;
      const cx = e.clientX;
      const cy = e.clientY;
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${cx - r.left}px`);
        card.style.setProperty("--my", `${cy - r.top}px`);
        raf = null;
      });
    };
    const cards = document.querySelectorAll(`.${styles.hlCard}`);
    cards.forEach((c) => c.addEventListener("mousemove", handler, { passive: true }));
    return () => {
      if (raf) cancelAnimationFrame(raf);
      cards.forEach((c) => c.removeEventListener("mousemove", handler));
    };
  }, []);

  return (
    <section id="why" className={styles.highlightsSection}>
      <div className="containerWide">
        <div className={styles.sectionHead}>
          <div>
            <div className="sectionLabel">WHY BUILDUNIX</div>
            <h2 className={`sectionTitle ${styles.sectionH2}`}>
              Three ways we keep sites on track.
            </h2>
          </div>
          <p className={styles.sectionLede}>
            Clear accountability, instant updates from the field, and fewer costly mistakes.
          </p>
        </div>

        <div className={styles.hlGrid}>
          {homeBenefits.map((it) => (
            <Link key={it.ix} href={it.href} className={styles.hlCard}>
              <div className={styles.hlIx}>{it.ix}</div>
              <h3 className={styles.hlTitle}>{it.title}</h3>
              <p className={styles.hlBody}>{it.body}</p>
              <span className={styles.hlMore}>See details →</span>
            </Link>
          ))}
        </div>

        <div className={styles.intentStrip}>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Accountability
          </Link>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Save time
          </Link>
          <Link href="/contact" className={styles.intentChip}>
            <span className={styles.intentK}>→</span> Save money
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Before and After ───────────────────────────────── */
function BeforeAfterSection() {
  const withoutItems = [
    "Photos get lost in WhatsApp.",
    "Updates come late.",
    "Nobody is sure who was supposed to do what.",
    "Excel sheets are out of date."
  ];

  const withItems = [
    "One app.",
    "Photos with date, time and place.",
    "Clear approvals.",
    "Everyone sees the same status."
  ];

  return (
    <section className={styles.differSection}>
      <div className="containerWide">
        <div className={styles.sectionHead}>
          <div>
            <div className="sectionLabel">BEFORE AND AFTER</div>
            <h2 className={`sectionTitle ${styles.sectionH2}`}>
              Today your site runs on calls and chats.
            </h2>
          </div>
          <p className={styles.sectionLede}>
            When site updates live in chat groups, work slips through the cracks. BuildUNIX gives your entire team one clear source of truth.
          </p>
        </div>

        <div className={styles.differWrap}>
          <div className={styles.differCard}>
            <div className={styles.differTag}>WITHOUT BUILDUNIX</div>
            <h4 className={styles.differH4}>Lost messages, late updates, confusion.</h4>
            <div className={styles.differList}>
              {withoutItems.map((text) => (
                <div key={text} className={`${styles.differRow} ${styles.differBad}`}>
                  <span className={styles.differMk}>✕</span>
                  <div>{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.differCard} ${styles.differUs}`}>
            <div className={`${styles.differTag} ${styles.differTagUs}`}>WITH BUILDUNIX</div>
            <h4 className={styles.differH4}>Clear proof, on-time approvals, one status.</h4>
            <div className={styles.differList}>
              {withItems.map((text) => (
                <div key={text} className={`${styles.differRow} ${styles.differGood}`}>
                  <span className={styles.differMk}>✓</span>
                  <div>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact & How It Starts ────────────────────────── */
function ContactSection() {
  let btnRAF = null;
  const onBtnMove = (e) => {
    if (btnRAF) return;
    const el = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    btnRAF = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--y", `${((cy - r.top) / r.height) * 100}%`);
      btnRAF = null;
    });
  };

  const steps = [
    { n: 1, t: "You fill a short form.", d: "Tell us a few details about your project and team." },
    { n: 2, t: "We set up your project in the app.", d: "Your blocks and stages are loaded and ready." },
    { n: 3, t: "Your team learns it in a 30-minute walkthrough.", d: "Supervisors, PMCs, and contractors learn their views." },
    { n: 4, t: "Your site goes live.", d: "Your crew starts taking photos and approving stages." },
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="containerWide">
        <div className={styles.contactWrap}>
          <div className={styles.contactSide}>
            <div className="sectionLabel">PILOT STEPS</div>
            <h3 className={styles.contactTitle}>
              How it starts.<br />Live in about one week.
            </h3>
            <p className={styles.contactBody}>
              Try BuildUNIX on one tower first. We configure the app to your site and show your team how to use it in 30 minutes.
            </p>
            <div className={styles.contactMeta}>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>EMAIL</div>
                <div className={styles.contactMetaV}>{companyEmail}</div>
              </div>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>SETUP</div>
                <div className={styles.contactMetaV}><em>About 1 week</em></div>
              </div>
              <div className={styles.contactMetaRow}>
                <div className={styles.contactMetaK}>BASE</div>
                <div className={styles.contactMetaV}>Hyderabad, IN</div>
              </div>
            </div>
          </div>

          <div className={styles.proofPanel}>
            <div className={styles.proofTimeline}>
              <div className={styles.proofLabel}>HOW IT STARTS</div>
              <div className={styles.timelineSteps}>
                {steps.map((s) => (
                  <div key={s.n} className={styles.timelineStep}>
                    <div className={styles.timelineIndicator}>
                      <div className={styles.timelineDot}>{s.n}</div>
                      <div className={styles.timelineLine} />
                    </div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepTitle}>{s.t}</div>
                      <div className={styles.stepDesc}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.proofDivider} />

            <div className={styles.proofStats}>
              {[
                { v: "~ 1 week", l: "Setup time" },
                { v: "1 tower", l: "First pilot" },
                { v: "30 mins", l: "Team walkthrough" },
              ].map((st) => (
                <div key={st.l} className={styles.statItem}>
                  <div className={styles.statNum}>{st.v}</div>
                  <div className={styles.statLabel}>{st.l}</div>
                </div>
              ))}
            </div>

            <div className={styles.proofTrust}>
              Running now on a residential project in Hyderabad.
            </div>
          </div>
        </div>

        <div className={styles.contactDividerInner} />

        <div className={styles.contactBottom}>
          <h2 className={styles.contactBottomTitle}>
            Try it on one tower first.<br /><em>Book a pilot.</em>
          </h2>
          <div className={styles.contactBottomBtns}>
            <Link
              href="/contact"
              className={`button ${styles.contactBottomPrimary}`}
              onMouseMove={onBtnMove}
            >
              Book a pilot →
            </Link>
            <Link
              href="/product#how-it-works"
              className="button buttonGhost"
              onMouseMove={onBtnMove}
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Root ───────────────────────────────────────────── */
export default function HomeExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections on scroll
    const sections = document.querySelectorAll(`section[id='why'], section[id='contact'], .${styles.differSection}`);
    sections.forEach(sec => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          }
        }
      );
    });

    // Stagger highlight cards
    gsap.fromTo(`.${styles.hlCard}`,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.hlGrid}`,
          start: "top 85%",
        }
      }
    );

    // Stagger differentiator cards
    gsap.fromTo(`.${styles.differCard}`,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.differWrap}`,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <ContactSection />
    </>
  );
}
