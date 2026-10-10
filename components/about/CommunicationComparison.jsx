"use client";

import styles from "./CommunicationComparison.module.css";
import Reveal from "@/components/Reveal";

export default function CommunicationComparison() {
  return (
    <section className={styles.section}>
      <div className="containerWide">
        <div className={styles.head}>
          <span className="sectionLabel">
            <span className="eyebrowRule" aria-hidden="true" />
            Field Communication
          </span>
          <h2 className={styles.headTitle}>
            Construction communication shouldn&apos;t live in WhatsApp.
          </h2>
          <p className={styles.headBody}>
            When site approvals, drawings, and pour photos stay scattered across group chats, disputes are inevitable. BuildUNIX gives every stakeholder structured, signed-off proof.
          </p>
        </div>

        <Reveal className={styles.comparisonWrapper} y={30}>
          {/* Status Quo Side */}
          <div className={`${styles.side} ${styles.sideStatusQuo}`}>
            <div className={styles.sideHeader}>
              <span className={styles.sideLabel}>The Status Quo</span>
              <span className={styles.sideBadgeDanger}>Unverified &amp; Scattered</span>
            </div>

            <div className={styles.chatStack}>
              <div className={styles.chatBubble}>
                &ldquo;Bhaiya column reinforcement ka photo bhejo jaldi, RMC truck aa gaya.&rdquo;
              </div>
              <div className={styles.chatBubble}>
                &ldquo;Kab se wait kar rahe hain slab clearance ka? Site par koi nahi hai.&rdquo;
              </div>
              <div className={styles.missedCall}>
                ✕ 1 missed call • 2:14 AM
              </div>
              <div className={styles.chatBubble}>
                &ldquo;Drawing revision kahan hai? Purana drawing se steel baandh diya.&rdquo;
              </div>
            </div>

            <div className={styles.sideConclusion}>
              <strong>Risk:</strong> No verifiable audit trail, verbal sign-offs, and painful rework when discrepancies arise weeks later.
            </div>
          </div>

          {/* BuildUNIX Side */}
          <div className={`${styles.side} ${styles.sideBuildunix}`}>
            <div className={styles.sideHeader}>
              <span className={styles.sideLabel}>The BuildUNIX Way</span>
              <span className={styles.sideBadgeSuccess}>Time-Stamped Audit Trail</span>
            </div>

            <div className={styles.statusStack}>
              <div className={styles.statusCard}>
                <div className={styles.statusCardHeader}>
                  <span className={styles.statusTitle}>Tower A • Column RCC Steel</span>
                  <span className={styles.statusBadge}>APPROVED</span>
                </div>
                <div className={styles.statusMeta}>Verified 1:20 PM • 6 Geo-tagged Photos Attached</div>
                <div className={styles.statusAssignee}>
                  <span>✓</span> Signed off by Jatin (PMC Structural Lead)
                </div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusCardHeader}>
                  <span className={styles.statusTitle}>Tower A • L-14 Slab Pour Checklist</span>
                  <span className={`${styles.statusBadge} ${styles.badgePending}`}>AWAITING SIGN-OFF</span>
                </div>
                <div className={styles.statusMeta}>Evidence Uploaded 11:45 AM • Shuttering &amp; Cover Blocks</div>
                <div className={styles.statusAssignee}>
                  <span>→</span> Pending Contractor Quality Head Check
                </div>
              </div>
            </div>

            <div className={styles.sideConclusion}>
              <strong>Result:</strong> Clear gatekeeper stages. Pour cannot begin without signed PMC checklist and photo evidence.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
