"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import styles from "@/app/about/about.module.css";
import {
  whyBuildUNIXIndia,
  whyBuildUNIXReasons,
} from "@/lib/site-content";

import CommunicationComparison from "@/components/about/CommunicationComparison";

export default function AboutExperience() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="sectionLabel">
            <span className="eyebrowRule" aria-hidden="true" />
            Why BuildUNIX
          </span>
          <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
            Why builders and PMCs use BuildUNIX
          </SplitTextReveal>
          <p className={styles.heroBody}>
            On most sites, work runs on calls, chats and Excel. BuildUNIX puts everyone in one app, so you can see what is done, what is late and who is responsible.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className="button buttonPrimary">
              Book a pilot on one tower →
            </Link>
            <Link href="/product" className="button buttonGhost">
              See how the app works
            </Link>
          </div>
          <p className={styles.heroNote}>
            No upfront overhaul. Run BuildUNIX on one tower alongside your current workflow.
          </p>
        </div>
      </section>

      {/* ── Section 2: Communication Comparison ── */}
      <CommunicationComparison />

      {/* ── Section 3: Three Reasons + Built for India ── */}
      <section className={`section ${styles.reasonsSection}`}>
        <div className="containerWide">
          <div className={styles.reasonsHead}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              What changes on site
            </span>
            <h2 className="sectionTitle">
              What changes when your site runs through BuildUNIX.
            </h2>
            <p className="sectionBody">
              Clear stages, photo proof, and instant approvals. No waiting for weekly meetings to find out what happened.
            </p>
          </div>

          <div className={styles.reasonCards}>
            {whyBuildUNIXReasons.map((reason, index) => (
              <Reveal
                key={reason.title}
                as="article"
                className={styles.reasonCard}
                delay={index * 0.06}
                y={24}
              >
                <span className={styles.reasonNum}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </Reveal>
            ))}

            {/* Built for India Card */}
            <Reveal
              as="article"
              className={`${styles.reasonCard} ${styles.reasonCardIndia}`}
              delay={0.24}
              y={24}
            >
              <span className={styles.reasonNum}>04</span>
              <h3>{whyBuildUNIXIndia.title}</h3>
              <p>{whyBuildUNIXIndia.body}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
