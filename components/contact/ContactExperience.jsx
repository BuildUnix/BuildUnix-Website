"use client";

import DemoForm from "@/components/DemoForm";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import styles from "@/app/contact/contact.module.css";
import { contactReasons, companyEmail } from "@/lib/site-content";

export default function ContactExperience() {
  return (
    <section className={styles.section}>
      <div className="containerWide">
        {/* Unified Header */}
        <div className={styles.header}>
          <span className="sectionLabel">
            <span className="eyebrowRule" aria-hidden="true" />
            Book a Pilot
          </span>
          <SplitTextReveal as="h1" className={styles.title} type="words">
            See BuildUNIX on a real site.
          </SplitTextReveal>
          <p className={styles.body}>
            Tell us a little about your project. We&apos;ll set it up for one tower and walk your team through live stage approvals — no pressure, no upfront overhaul.
          </p>
        </div>

        {/* 2-Column Pilot Form + Expectations */}
        <div className={styles.grid}>
          <Reveal className={styles.formShell} x={-30} y={20}>
            <div className={styles.formHeader}>
              <span className={styles.formKicker}>Walkthrough Request</span>
              <h2 className={styles.formTitle}>Schedule your project pilot</h2>
              <p className={styles.formSubtitle}>
                Fill out the details below. Our team prepares a tailored site demo for your specific structure.
              </p>
            </div>
            <DemoForm className="" />
          </Reveal>

          <Reveal className={styles.sidebarSticky} x={30} y={20} delay={0.06}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Why teams start with a pilot</h2>
              <div className={styles.reasonList}>
                {contactReasons.map((reason, index) => (
                  <article key={reason.title} className={styles.reasonCard}>
                    <span className={styles.reasonNum}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.contactDirectCard}>
              <strong>Direct site inquiry</strong>
              <p>
                Prefer email or a direct conversation? Write to Raghav at{" "}
                <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
              </p>
              <p>We review every site request and respond within 24 hours.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
