"use client";

import Link from "next/link";
import PhaseProofCard from "@/components/PhaseProofCard";
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
        <div className={`containerWide ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="sectionLabel" data-invert="true">
              <span className="eyebrowRule" aria-hidden="true" />
              Why BuildUNIX
            </span>
            <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
              Why builders and PMCs use BuildUNIX
            </SplitTextReveal>
            <p className={styles.heroBody}>
              On most sites, work runs on calls, chats and Excel. BuildUNIX puts everyone in one app, so you can see what is done, what is late and who is responsible.
            </p>
            <div style={{ marginTop: "1.75rem" }}>
              <Link href="/contact" className="button buttonPrimary">
                Book a pilot on one tower →
              </Link>
            </div>
          </div>

          <Reveal className={styles.heroShowcase} x={80} y={20}>
            <PhaseProofCard />
          </Reveal>
        </div>
      </section>

      {/* ── Section 2: Communication Comparison ── */}
      <CommunicationComparison />

      {/* ── Section 3: Three Reasons + Built for India ── */}
      <section className={`section ${styles.reasonsSection}`}>
        <div className={`containerWide ${styles.reasonsGrid}`}>
          <div className={styles.stickyIntro}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              Three Reasons
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
                className={`cardSurface ${styles.reasonCard}`}
                delay={index * 0.06}
                x={index % 2 === 0 ? 46 : -46}
                y={34}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </Reveal>
            ))}

            {/* Built for India Card */}
            <Reveal
              as="article"
              className={`cardSurface ${styles.reasonCard}`}
              style={{
                borderColor: "rgba(61, 133, 232, 0.3)",
                background: "linear-gradient(180deg, rgba(61, 133, 232, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)"
              }}
              delay={0.24}
              x={46}
              y={34}
            >
              <span>04</span>
              <h3>{whyBuildUNIXIndia.title}</h3>
              <p>{whyBuildUNIXIndia.body}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
