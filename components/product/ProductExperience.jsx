"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SplitTextReveal from "@/components/SplitTextReveal";
import BrandText from "@/components/BrandText";
import {
  featureCards,
  howItWorksSteps,
  roles,
  statBarItems,
  phaseNames,
  faqs,
} from "@/lib/site-content";
import styles from "@/app/product/product.module.css";

/* ── Icons ──────────────────────────────────────────── */
const iconMap = {
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="5" rx="1" /><rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="9.5" y="16" width="5" height="5" rx="1" />
      <path d="M5.5 8v3a1 1 0 001 1h9a1 1 0 001-1V8" /><line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  snag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  heatmap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="4" height="4" rx="0.5" /><rect x="10" y="3" width="4" height="4" rx="0.5" />
      <rect x="17" y="3" width="4" height="4" rx="0.5" /><rect x="3" y="10" width="4" height="4" rx="0.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" /><rect x="17" y="10" width="4" height="4" rx="0.5" />
      <rect x="3" y="17" width="4" height="4" rx="0.5" /><rect x="10" y="17" width="4" height="4" rx="0.5" />
      <rect x="17" y="17" width="4" height="4" rx="0.5" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  offline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" /><path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0122.56 9" /><path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
      <path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
};

const STATUS_CONFIG = {
  locked:    { color: "#6b7e95", label: "Not started" },
  uploading: { color: "#F0A020", label: "Work in progress" },
  awaiting:  { color: "#3D85E8", label: "Waiting for approval" },
  approved:  { color: "#0DAF72", label: "Approved" },
  snag:      { color: "#E53535", label: "Issue open" },
};

/* ── Interactive Colour-Coded Site View ──────────────── */
const INITIAL_GRID = [
  ["approved","approved","approved"],
  ["approved","approved","awaiting"],
  ["approved","uploading","locked"],
  ["approved","awaiting","locked"],
  ["awaiting","locked","locked"],
  ["snag","locked","locked"],
  ["locked","locked","locked"],
  ["locked","locked","locked"],
];
const TOWERS = ["Tower A", "Tower B", "Tower C"];
const STATUS_CYCLE = ["locked","uploading","awaiting","approved","snag"];

function InteractiveHeatmap() {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [tooltip, setTooltip] = useState(null);

  const cycleStatus = (pi, ci) => {
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      const current = next[pi][ci];
      const idx = STATUS_CYCLE.indexOf(current);
      next[pi][ci] = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return next;
    });
  };

  return (
    <div className={styles.heatmapCard}>
      <div className={styles.heatmapHeader}>
        <div className={styles.heatmapTitle}>
          <span className={styles.heatmapDot} />
          Colour-coded site view
        </div>
        <div className={styles.heatmapCols}>
          {TOWERS.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div className={styles.heatmapGrid}>
        {phaseNames.slice(0, 8).map((phase, pi) => (
          <div key={phase} className={styles.heatmapRow}>
            <span className={styles.heatmapPhase}>{phase}</span>
            <div className={styles.heatmapCells}>
              {grid[pi].map((status, ci) => (
                <button
                  key={ci}
                  className={styles.heatmapCell}
                  style={{ background: STATUS_CONFIG[status].color }}
                  title={`${phase} · ${TOWERS[ci]} · ${STATUS_CONFIG[status].label}`}
                  onClick={() => cycleStatus(pi, ci)}
                  onMouseEnter={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const cr = e.currentTarget.closest(`.${styles.heatmapCard}`).getBoundingClientRect();
                    setTooltip({ pi, ci, phase, status, x: r.left - cr.left + r.width / 2, y: r.top - cr.top - 8 });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  aria-label={`${phase}, ${TOWERS[ci]}: ${STATUS_CONFIG[status].label}. Click to cycle status.`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className={styles.heatmapTooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span className={styles.heatmapTooltipDot} style={{ background: STATUS_CONFIG[tooltip.status].color }} />
          <div>
            <div className={styles.heatmapTooltipPhase}>{tooltip.phase}</div>
            <div className={styles.heatmapTooltipTower}>{TOWERS[tooltip.ci]} · {STATUS_CONFIG[tooltip.status].label}</div>
            <div className={styles.heatmapTooltipHint}>Click to cycle</div>
          </div>
        </div>
      )}

      <div className={styles.heatmapLegend}>
        {Object.entries(STATUS_CONFIG).map(([k, v]) => (
          <span key={k} className={styles.heatmapLegendItem}>
            <span style={{ background: v.color }} className={styles.heatmapLegendDot} />
            {v.label}
          </span>
        ))}
      </div>
      <p className={styles.heatmapHint}>Click any cell to cycle its status</p>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`containerWide ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <Reveal y={20}>
            <span className="sectionLabel">PRODUCT OVERVIEW</span>
          </Reveal>
          <SplitTextReveal as="h1" className={styles.heroTitle} type="words">
            Built for how construction sites actually run.
          </SplitTextReveal>
          <Reveal y={16} delay={0.18}>
            <p className={styles.heroBody}>
              <BrandText text="BuildUNIX is one app for owners, PMCs, engineers and contractors. Everyone updates work and uploads photos. Each stage is approved before the next one starts." />
            </p>
          </Reveal>
        </div>

        <Reveal className={styles.heroVisual} x={60} y={20} delay={0.1}>
          <InteractiveHeatmap />
        </Reveal>
      </div>

      <Reveal className={styles.heroStats} y={20} delay={0.3}>
        {statBarItems.map((s) => (
          <div key={s.label} className={styles.heroStat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ── Stages & Approvals ─────────────────────────────── */
function PhaseLockSection() {
  return (
    <section id="phase-lock" className={`section ${styles.phaseLockSection}`}>
      <div className="containerWide">
        <div className={styles.phaseLockGrid}>
          <Reveal className={styles.phaseLockCopy} x={-50} y={20}>
            <span className="sectionLabel">
              <span className="eyebrowRule" aria-hidden="true" />
              STAGES & APPROVALS
            </span>
            <h2 className="sectionTitle">
              Each stage is approved <em>before the next one starts</em>.
            </h2>
            <p className="sectionBody">
              A ready list of 14 construction stages, loaded in the right order. Contractors take photos, and the PMC engineer approves the work on the phone before the next stage opens.
            </p>
            <div className={styles.phaseLockStats}>
              <div className={styles.phaseLockStat}><strong>14</strong><span>Ready-made stages</span></div>
              <div className={styles.phaseLockStat}><strong>Flexible</strong><span>Custom order</span></div>
              <div className={styles.phaseLockStat}><strong>100%</strong><span>Photo proof</span></div>
            </div>
          </Reveal>

          <div className={styles.phaseListWrap}>
            {phaseNames.map((name, i) => (
              <Reveal key={name} className={styles.phaseItem} delay={i * 0.04} x={40}>
                <span className={styles.phaseNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.phaseName}>{name}</span>
                <span className={styles.phaseStatus}>
                  {i < 4 ? <span className={styles.phaseApproved}>✓ Approved</span>
                   : i === 4 ? <span className={styles.phaseAwaiting}>● Waiting for approval</span>
                   : i === 5 ? <span className={styles.phaseUploading}>↑ Uploading photos</span>
                   : <span className={styles.phaseLocked}>⊘ Not started</span>}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Live Ops & Photo Proof ─────────────────────────── */
function LiveOpsSection() {
  const pillars = [
    { num: "01", title: "Taken in the app", body: "Every photo is taken directly through the app camera on site. Picking old photos from the gallery is blocked." },
    { num: "02", title: "Date, time and place", body: "The app records the exact date, time and location when the photo is taken. Clear proof of when work happened." },
    { num: "03", title: "Before, during and after", body: "Contractors take photos across each step. PMC engineers check them on their phone before approving." },
    { num: "04", title: "Works without internet", body: "Take photos on site with no signal. They save on the phone and upload automatically once the connection is back." },
  ];

  return (
    <section id="ops" className={`section ${styles.opsSection}`}>
      <div className="containerWide">
        <Reveal className={styles.opsHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />PHOTO PROOF</span>
          <h2 className="sectionTitle">Site proof from the crew, <em>on the ground</em>.</h2>
          <p className="sectionBody">Every photo shows who took it, when and where. Reviewed in seconds from your phone.</p>
        </Reveal>
        <div className={styles.opsPillars}>
          {pillars.map((p, i) => (
            <Reveal key={p.num} className={styles.opsPillar} delay={i * 0.08} y={30}>
              <span className={styles.opsPillarNum}>{p.num}</span>
              <h3 className={styles.opsPillarTitle}>{p.title}</h3>
              <p className={styles.opsPillarBody}>{p.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.opsPhotoMock} y={30} delay={0.15}>
          <PhotoEvidenceMock />
        </Reveal>
      </div>
    </section>
  );
}

function PhotoEvidenceMock() {
  return (
    <div className={styles.photoCard}>
      <div className={styles.photoCardHeader}>
        <div className={styles.photoCardMeta}>
          <span className={styles.photoCardTag}>PHOTO PROOF</span>
          <span className={styles.photoCardPhase}>Slab Casting · Floor 3 · Flat A301</span>
        </div>
        <div className={styles.photoCardBadge}>✓ APPROVED BY PMC</div>
      </div>
      <div className={styles.photoSlots}>
        {["PRE", "DURING", "POST"].map((slot, i) => (
          <div key={slot} className={`${styles.photoSlot} ${i === 2 ? styles.photoSlotPending : styles.photoSlotDone}`}>
            <div className={styles.photoSlotLabel}>{slot}</div>
            {i < 2 ? (
              <>
                <div className={styles.photoSlotImg}><div className={styles.photoSlotImgInner} /></div>
                <div className={styles.photoSlotMeta}>
                  <span>Hyderabad Site · Tower A</span>
                  <span>Today · 11:45 AM</span>
                  <span className={styles.photoSlotHash}>Verified on site</span>
                </div>
              </>
            ) : (
              <div className={styles.photoSlotPendingMsg}>Awaiting capture</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── How It Works (4 Steps) ─────────────────────────── */
function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const step = howItWorksSteps[active];

  return (
    <section id="how-it-works" className={`section ${styles.howSection}`}>
      <div className="containerWide">
        <Reveal className={styles.howHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />HOW IT WORKS</span>
          <SplitTextReveal as="h2" className="sectionTitle" type="words">
            Four simple steps on site.
          </SplitTextReveal>
        </Reveal>
        <div className={styles.howLayout}>
          <div className={styles.howSteps}>
            {howItWorksSteps.map((s, i) => (
              <button key={s.id} className={`${styles.howStep} ${i === active ? styles.howStepActive : ""}`} onClick={() => setActive(i)}>
                <span className={styles.howStepNum}>{s.label}</span>
                <div className={styles.howStepContent}>
                  <span className={styles.howStepTitle}>{s.title}</span>
                  {i === active && <p className={styles.howStepBody}>{s.body}</p>}
                </div>
                <span className={styles.howStepArrow}>→</span>
              </button>
            ))}
          </div>
          <div className={styles.howPanel}>
            <div className={styles.howPanelNum}>{step.label}</div>
            <h3 className={styles.howPanelTitle}>{step.title}</h3>
            <p className={styles.howPanelBody}>{step.body}</p>
            <div className={styles.howPanelVisual}><StepVisual id={step.visual} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepVisual({ id }) {
  const statusColors = { locked:"#6b7e95", uploading:"#F0A020", awaiting:"#3D85E8", approved:"#0DAF72", snag:"#E53535" };
  const visuals = {
    structure: (
      <div className={styles.visualStructure}>
        {[["PROJECT","Hyderabad Residential Site"],["BLOCKS","Tower A · Tower B · Tower C"],["STAGES","14 construction stages ready"],["APPROVALS","PMC sign-off on each step ✓"]].map(([k,v]) => (
          <div key={k} className={styles.vsRow}><span className={styles.vsLabel}>{k}</span><span className={styles.vsVal}>{v}</span></div>
        ))}
      </div>
    ),
    upload: (
      <div className={styles.visualUpload}>
        {["PRE","DURING","POST"].map(s => (
          <div key={s} className={styles.vuSlot}><div className={styles.vuSlotIcon}>📷</div><span>{s}</span></div>
        ))}
      </div>
    ),
    verify: (
      <div className={styles.visualVerify}>
        <div className={styles.vvNotif}>
          <span className={styles.vvNotifDot} />
          <div><div className={styles.vvNotifTitle}>Approval requested</div><div className={styles.vvNotifSub}>Slab Casting · Floor 3 · Flat A301</div></div>
        </div>
        <div className={styles.vvActions}>
          <span className={styles.vvApprove}>✓ Approve</span>
          <span className={styles.vvSnag}>⚑ Raise issue (snag)</span>
        </div>
      </div>
    ),
    track: (
      <div className={styles.visualTrack}>
        <div className={styles.vtLegend}>
          {Object.entries(STATUS_CONFIG).map(([k,v]) => (
            <span key={k} className={styles.vtLegendItem}><span style={{background:v.color}} className={styles.vtDot} />{v.label}</span>
          ))}
        </div>
        <div className={styles.vtGrid}>
          {["approved","approved","uploading","awaiting","snag","locked","locked","locked"].map((s,i) => (
            <div key={i} className={styles.vtCell} style={{background:statusColors[s]}} />
          ))}
        </div>
      </div>
    ),
  };
  return visuals[id] ?? null;
}

/* ── Features (6 Cards + Coming Soon Callout) ────────── */
function FeaturesSection() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className="containerWide">
        <Reveal className={styles.featuresHead}>
          <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />FEATURES</span>
          <SplitTextReveal as="h2" className="sectionTitle" type="words">
            Everything your site team needs.
          </SplitTextReveal>
          <p className="sectionBody">Six key features to keep work moving, catch issues early, and give everyone the right view.</p>
        </Reveal>
        <div className={styles.featuresGrid}>
          {featureCards.map((f, i) => (
            <Reveal key={f.title} className={styles.featureCard} delay={i * 0.07} y={28}>
              <div className={styles.featureIcon}>{iconMap[f.icon]}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Daily Report Coming Soon */}
        <div style={{
          marginTop: "2.5rem",
          padding: "1.25rem 1.75rem",
          background: "rgba(61, 133, 232, 0.06)",
          border: "1px solid rgba(61, 133, 232, 0.2)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "var(--text-primary, #f1f5f9)"
        }}>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.25rem 0.6rem",
            borderRadius: "6px",
            background: "rgba(61, 133, 232, 0.2)",
            color: "#60a5fa"
          }}>
            Phase 2
          </span>
          <span style={{ fontSize: "0.9375rem" }}>
            <strong>Coming soon:</strong> a daily summary of the site, sent to your phone.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Roles Section ──────────────────────────────────── */
function RolesSection() {
  return (
    <section className="section" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
      <div className="containerWide">
        <div className="sectionLabel">ROLES</div>
        <h2 className="sectionTitle" style={{ marginBottom: "1rem" }}>
          The right view for <em>every person</em>.
        </h2>
        <p className="sectionBody" style={{ marginBottom: "2.5rem" }}>
          Each team member opens the app and sees exactly what their job needs.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem"
        }}>
          {roles.map((r) => (
            <div
              key={r.id}
              style={{
                padding: "1.25rem 1.5rem",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px"
              }}
            >
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-primary, #fff)" }}>
                {r.title}
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted, #94a3b8)", lineHeight: "1.5", margin: 0 }}>
                {r.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className={`section ${styles.faqSection}`}>
      <div className="containerWide">
        <div className={styles.faqLayout}>
          <Reveal className={styles.faqLeft} x={-40} y={20}>
            <span className="sectionLabel"><span className="eyebrowRule" aria-hidden="true" />FAQ</span>
            <h2 className={styles.faqTitle}>
              Frequently asked<br /><em>questions.</em>
            </h2>
            <p className={styles.faqSubtitle}>Have more questions? Contact our team for answers.</p>
          </Reveal>

          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <Reveal key={i} className={styles.faqItem} delay={i * 0.05} y={16}>
                <button
                  className={`${styles.faqQuestion} ${open === i ? styles.faqQuestionOpen : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqChevron} ${open === i ? styles.faqChevronOpen : ""}`}>+</span>
                </button>
                {open === i && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Root ───────────────────────────────────────────── */
export default function ProductExperience() {
  return (
    <>
      <HeroSection />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="containerWide">
          <div className="sectionLabel">BETA FEATURE</div>
          <h2 className="sectionTitle" style={{ marginBottom: "1.5rem" }}>3D Community <em>Visualization</em></h2>
          <p className="sectionBody" style={{ marginBottom: "2rem" }}>
            Explore your project in a fully interactive 3D environment. This beta feature allows PMs and clients to visualize construction progress, identify zones, and navigate the site layout with architectural precision.
          </p>
          <div style={{ marginBottom: "0" }}>
            <Link href="/demo-3d" className="button buttonPrimary">
              View 3D Demo <span className="buttonArrow">→</span>
            </Link>
          </div>
        </div>
      </section>
      <PhaseLockSection />
      <LiveOpsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RolesSection />
      <FAQSection />
    </>
  );
}
