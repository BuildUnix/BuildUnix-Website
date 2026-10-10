"use client";

import BrandText from "@/components/BrandText";
import DemoForm from "@/components/DemoForm";
import Reveal from "@/components/Reveal";
import styles from "@/app/contact/contact.module.css";
import { contactReasons, companyEmail } from "@/lib/site-content";

export default function ContactExperience() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`containerWide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="sectionLabel" data-invert="true">
              <span className="eyebrowRule" aria-hidden="true" />
              Book a Pilot
            </span>
            <h1 className={`${styles.heroTitle} ${styles.fadeInUp}`}>
              See BuildUNIX on a real site.
            </h1>
            <p className={styles.heroBody}>
              Book a pilot. We will set it up for one tower and show you how it works. No pressure.
            </p>
          </div>

          <Reveal className={styles.heroShowcase} x={70} y={20}>
            <div className={styles.heroSignal}>
              <span>Walkthrough format</span>
              <strong>See the app on a live project, your role&apos;s view, and real stage approvals.</strong>
              <p>Built for owners, PMCs, engineers, and contractors.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.contentSection}`}>
        <div className={`containerWide ${styles.grid}`}>
          <Reveal className={styles.formColumn} x={-60} y={30}>
            <div className={styles.formShell}>
              <span className={styles.formKicker}>Request a walkthrough</span>
              <h2 className={styles.formTitle}>
                <BrandText text="Book a Pilot" />
              </h2>
              <p className={styles.formBody}>
                Tell us a little about your project. We&apos;ll set it up for one tower and show you how it works.
              </p>
              <DemoForm className="" />
            </div>
          </Reveal>

          <Reveal className={styles.sidebar} x={70} y={30} delay={0.08}>
            <div className={styles.sidebarSticky}>
              <h2 className={styles.sidebarTitle}>Why book a pilot?</h2>
              <div className={styles.reasonList}>
                {contactReasons.map((reason, index) => (
                  <article key={reason.title} className={styles.reasonCard}>
                    <span>0{index + 1}</span>
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </article>
                ))}
              </div>
              <div className={styles.emailCard}>
                <p>
                  Prefer email? Reach us at{" "}
                  <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
                </p>
                <p>We respond within 24 hours.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
