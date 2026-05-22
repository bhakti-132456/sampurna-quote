import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Printer, 
  ChevronRight, 
  Palette, 
  DollarSign, 
  Compass, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('cover');
  const [expandedPillar, setExpandedPillar] = useState(null);

  const { scrollYProgress } = useScroll();

  // Refs for scroll locking / navigation mapping
  const coverRef = useRef(null);
  const strategyRef = useRef(null);
  const commitmentsRef = useRef(null);
  const pricingRef = useRef(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Scroll to a specific ref
  const scrollToRef = (ref, tabId) => {
    setActiveTab(tabId);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer to sync scroll with active nav items
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === coverRef.current) setActiveTab('cover');
          if (entry.target === strategyRef.current) setActiveTab('strategy');
          if (entry.target === commitmentsRef.current) setActiveTab('commitments');
          if (entry.target === pricingRef.current) setActiveTab('pricing');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    
    if (coverRef.current) observer.observe(coverRef.current);
    if (strategyRef.current) observer.observe(strategyRef.current);
    if (commitmentsRef.current) observer.observe(commitmentsRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  const scaleVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 } 
    }
  };

  // Pricing
  const essentialPrice = 40000;
  const premiumPrice = 60000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      {/* Scroll Progress Bar (Top) */}
      <motion.div 
        className="scroll-progress" 
        style={{ 
          scaleX: scrollYProgress, 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: 'var(--color-accent)',
          transformOrigin: '0%',
          zIndex: 1000
        }} 
      />

      <div className="proposal-card">
        
        {/* ================= HEADER ACTIONS ================= */}
        <header className="header-actions">
          <motion.button 
            className="theme-btn" 
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            whileHover={{ rotate: 15 }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          <div className="action-buttons">
            <motion.button 
              className="btn-premium btn-secondary"
              onClick={handlePrint}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Printer size={15} />
              <span>Print</span>
            </motion.button>
          </div>
        </header>

        {/* ================= NAVIGATION BAR ================= */}
        <nav className="navigation-bar">
          {[
            { id: 'cover', label: 'Cover', ref: coverRef },
            { id: 'strategy', label: 'Strategy', ref: strategyRef },
            { id: 'commitments', label: 'Commitments', ref: commitmentsRef },
            { id: 'pricing', label: 'Investment', ref: pricingRef }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => scrollToRef(tab.ref, tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  className="nav-indicator" 
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* ================= COVER PAGE / HERO ================= */}
        <div ref={coverRef}>
          <motion.section 
            className="hero-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <div className="hero-border"></div>

            <div className="logos-wrapper">
              <motion.div className="logo-block" variants={itemVariants}>
                <span className="logo-sub">Presented by</span>
                <img src={theme === 'dark' ? '/techvedyaa_logo_dark.png' : '/techvedyaa_logo_light.png'} alt="TechVedyaa Logo" className="techvedyaa-img" />
              </motion.div>

              <motion.div className="logo-block" variants={itemVariants}>
                <span className="logo-sub">Prepared for</span>
                <img src="/sampurna_bliss_logo.png" alt="Sampurna Bliss Logo" className="sampurna-img" />
              </motion.div>
            </div>

            <div className="hero-middle">
              <motion.span className="hero-badge" variants={itemVariants}>
                Brochure Design & Brand Strategy
              </motion.span>
              <motion.h1 className="hero-title" variants={itemVariants}>
                Bespoke Editorial <br />& Brand Architecture
              </motion.h1>
              <motion.div className="hero-divider" variants={itemVariants}></motion.div>
              <motion.p className="hero-subtitle" variants={itemVariants}>
                A Strategic Approach to Premium Narrative Design
              </motion.p>
            </div>

            <div className="hero-footer">
              <motion.div className="hero-meta" variants={itemVariants}>
                <div className="meta-box">
                  <span className="meta-sub">Project Scope</span>
                  <span className="meta-val">Design Up To 40 Pages</span>
                </div>
                <div className="meta-box">
                  <span className="meta-sub">Target Audience</span>
                  <span className="meta-val">High-Net-Worth Clients</span>
                </div>
                <div className="meta-box">
                  <span className="meta-sub">Date of Issue</span>
                  <span className="meta-val">May 2026</span>
                </div>
                <div className="meta-box">
                  <span className="meta-sub">Proposal ID</span>
                  <span className="meta-val">TV-2026-SB04</span>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* ================= PAGE 2: CREATIVE STRATEGY ================= */}
        <div ref={strategyRef}>
          <motion.section 
            className="section-body"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div className="sec-header" variants={itemVariants}>
              <span className="sec-subtitle">Section 01</span>
              <h3 className="sec-title">Research-Backed Strategy</h3>
            </motion.div>

            <motion.p className="lead-paragraph" variants={itemVariants}>
              A brochure for a luxury brand is not just a collection of pages - it is a visual embodiment of prestige.
            </motion.p>

            <motion.p className="strategy-body-text" variants={itemVariants}>
              Our design philosophy for <strong>Sampurna Bliss</strong> is built on the integration of high-end editorial layouts and cognitive science. To engage the modern, discerning buyer, every layout, font pair, and negative space margin is intentionally chosen to project serenity, security, and exclusive social standing.
            </motion.p>

            <motion.div className="design-approach-visual" variants={scaleVariants}>
              <img src="/design_approach.png" alt="Premium print craft — gilded edges and gold foil embossing" />
              <div className="design-approach-overlay">
                <span>Gilded Edges · Gold Foil · Spot UV</span>
              </div>
            </motion.div>

            <div className="psychology-pillars">
              {[
                {
                  id: 'color',
                  icon: <Palette size={22} />,
                  title: 'Color Psychology',
                  desc: 'Utilizing rich HSL-tuned forest greens to instill peace, paired with antique brushed golds to signal refinement, history, and premium quality.'
                },
                {
                  id: 'market',
                  icon: <Compass size={22} />,
                  title: 'Market Perception',
                  desc: 'Positioning Sampurna Bliss as an elite enclave. Layouts use expansive negative space (white space) to convey confidence, breathing room, and sophisticated luxury.'
                },
                {
                  id: 'price',
                  icon: <DollarSign size={22} />,
                  title: 'Price Perception',
                  desc: 'Data shows that clean editorial grids and high contrast structural hierarchies reduce cognitive load, directly correlating with a higher perceived price and value.'
                }
              ].map((pillar) => (
                <motion.div 
                  key={pillar.id}
                  className="pillar-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, borderColor: 'var(--color-accent)' }}
                  onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                  layout
                >
                  <div className="pillar-icon-box">
                    {pillar.icon}
                  </div>
                  <div className="pillar-details">
                    <motion.h5 layout="position">{pillar.title}</motion.h5>
                    <motion.p layout="position">{pillar.desc}</motion.p>
                    
                    <AnimatePresence>
                      {expandedPillar === pillar.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '0.8rem' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="expanded-pillar-info"
                        >
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                            Design Execution
                          </span>
                          <p style={{ fontSize: '0.8rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                            Our team implements exact HSL mapping to maintain identical contrast levels across physical print inks and organic digital displays. This ensures your brand integrity remains pristine.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ================= PAGE 3: CORE COMMITMENTS ================= */}
        <div ref={commitmentsRef}>
          <motion.section 
            className="section-body"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div className="sec-header" variants={itemVariants}>
              <span className="sec-subtitle">Section 02</span>
              <h3 className="sec-title">The TechVedyaa Commitments</h3>
            </motion.div>

            <div className="commitments-list">
              {[
                {
                  num: '01',
                  title: 'Uncompromising Aesthetic Quality',
                  desc: 'No templates. Every single page of the brochure is designed from scratch. We build bespoke grids, custom typography hierarchies, and vector ornaments specifically for Sampurna Bliss, ensuring a layout as unique as your real estate.'
                },
                {
                  num: '02',
                  title: 'Research-Backed Layout Architecture',
                  desc: 'We apply modern eye-tracking patterns (F and Z reading flows) and visual hierarchy guidelines. Every heading placement, paragraph width, and full-bleed image spread is engineered to guide potential buyers through a logical, emotionally compelling narrative.'
                },
                {
                  num: '03',
                  title: 'End-to-End Printer Coordination & Gilded Finishing',
                  desc: 'A beautiful digital design can fail if printed poorly. We don\'t just hand off a PDF. We coordinate directly with the printing press to oversee material choice — including premium textured paper, matte coats, spot UV varnish placements, gold foil embossing on the cover, and gold gilded page edges for a signature luxury feel. We perform prepress checks and color profile verifications to guarantee the final physical product matches the luxury vision.'
                }
              ].map((commit, idx) => (
                <motion.div 
                  key={idx}
                  className="commitment-card"
                  variants={itemVariants}
                  whileInView={{ x: [ -10, 0 ], opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="commit-num">{commit.num}</div>
                  <h4>{commit.title}</h4>
                  <p>{commit.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Pagination Blueprint Preview */}
            <motion.div className="blueprint-card" variants={scaleVariants}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
                <h4 style={{ margin: 0 }}>Design Blueprint Architecture</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                Systematic page mapping designed to maximize narrative engagement and client response.
              </p>
              
              <div className="blueprint-list">
                {[
                  { range: 'Pages 1-8', label: 'Cover & Brand Story', pct: '20%', width: '20%' },
                  { range: 'Pages 9-24', label: 'Amenity Profiles & Secure Living', pct: '40%', width: '40%' },
                  { range: 'Pages 25-36', label: 'Architectural Blueprints & Serene Escapes', pct: '30%', width: '30%' },
                  { range: 'Pages 37-40', label: 'Community & Core Team Backing', pct: '10%', width: '10%' }
                ].map((bp, idx) => (
                  <div key={idx} className="blueprint-bar">
                    <div className="bp-info">
                      <span>{bp.label} <span style={{ color: 'var(--color-text-light)', fontWeight: 300 }}>({bp.range})</span></span>
                      <span>{bp.pct}</span>
                    </div>
                    <div className="bp-bar-track">
                      <motion.div 
                        className="bp-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: bp.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        </div>

        {/* ================= DESIGN DIRECTION COLLAGE ================= */}
        <motion.section
          className="collage-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div className="collage-header" variants={itemVariants}>
            <span className="collage-label">Design Direction</span>
            <p className="collage-caption">A glimpse into the brand language, typography & editorial craft we'll bring to life.</p>
          </motion.div>

          {/* Row 1 — wider landscape shots */}
          <motion.div className="collage-row" variants={containerVariants}>
            {[
              { src: '/collage/pages.png', alt: 'Editorial page spreads', rotate: -2.5, z: 3, offsetY: 0, wide: true },
              { src: '/collage/spread.png', alt: 'Brochure interior spread', rotate: 1.8, z: 5, offsetY: 6, wide: true },
              { src: '/collage/lifestyle.png', alt: 'Lifestyle photography layout', rotate: -1.5, z: 4, offsetY: -3, wide: true },
            ].map((img, idx) => (
              <motion.div
                key={`r1-${idx}`}
                className={`collage-item ${img.wide ? 'collage-wide' : ''}`}
                variants={itemVariants}
                style={{
                  '--rotate': `${img.rotate}deg`,
                  '--z': img.z,
                  '--offset-y': `${img.offsetY}px`,
                }}
                whileHover={{ 
                  scale: 1.06, 
                  zIndex: 10, 
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 200, damping: 18 }
                }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2 — book cover & brand identity */}
          <motion.div className="collage-row collage-row-offset" variants={containerVariants}>
            {[
              { src: '/collage/cover.png', alt: 'Premium book cover', rotate: 2, z: 3, offsetY: 4, wide: false },
              { src: '/collage/brand.png', alt: 'Brand identity system', rotate: -2.2, z: 2, offsetY: -2, wide: true },
            ].map((img, idx) => (
              <motion.div
                key={`r2-${idx}`}
                className={`collage-item ${img.wide ? 'collage-wide' : ''}`}
                variants={itemVariants}
                style={{
                  '--rotate': `${img.rotate}deg`,
                  '--z': img.z,
                  '--offset-y': `${img.offsetY}px`,
                }}
                whileHover={{ 
                  scale: 1.06, 
                  zIndex: 10, 
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 200, damping: 18 }
                }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ================= PAGE 4: INVESTMENT & TERMS ================= */}
        <div ref={pricingRef}>
          <motion.section 
            className="section-body"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div className="sec-header" variants={itemVariants}>
              <span className="sec-subtitle">Section 03</span>
              <h3 className="sec-title">The Investment Proposal</h3>
            </motion.div>

            <div className="investment-container">
              {/* Tier 1: Essential — 20 Pages */}
              <motion.div className="premium-price-box tier-essential" variants={scaleVariants}>
                <div className="price-card-badge">Essential Package</div>
                <div className="price-card-header">
                  <h4>Brochure Design — Up to 20 Pages</h4>
                  <p>Covers, bespoke layout design, graphics, prepress color-profiling, and printer coordination</p>
                </div>
                
                <div className="pricing-row">
                  <div className="pricing-block">
                    <span className="price-box-label">Standard Value</span>
                    <span className="old-price-val">INR 50,000</span>
                  </div>
                  <div className="arrow-icon-col">
                    <ChevronRight size={24} />
                  </div>
                  <div className="pricing-block">
                    <span className="price-box-label">Exclusive Proposal</span>
                    <span className="new-price-val">
                      INR {essentialPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="price-deliverables">
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Design up to 20 Pages:</strong> Bespoke layout for every page, front & back covers.</span>
                  </div>
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Color & Printer Calibration:</strong> Prepress setup and spot color optimization.</span>
                  </div>
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Production Supervision:</strong> Coordination with printer for GSM and paper finishes.</span>
                  </div>
                </div>
              </motion.div>

              {/* Tier 2: Premium — 40 Pages */}
              <motion.div className="premium-price-box tier-premium" variants={scaleVariants}>
                <div className="price-card-badge">Premium Package — Recommended</div>
                <div className="price-card-header">
                  <h4>Brochure Design — Up to 40 Pages</h4>
                  <p>Everything in Essential, plus extended page count, gilded edge finishing, gold foil embossing, and spot UV coordination</p>
                </div>
                
                <div className="pricing-row">
                  <div className="pricing-block">
                    <span className="price-box-label">Standard Value</span>
                    <span className="old-price-val">INR 70,000</span>
                  </div>
                  <div className="arrow-icon-col">
                    <ChevronRight size={24} />
                  </div>
                  <div className="pricing-block">
                    <span className="price-box-label">Exclusive Proposal</span>
                    <span className="new-price-val">
                      INR {premiumPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="price-deliverables">
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Design up to 40 Pages:</strong> Dedicated bespoke layout for every single page.</span>
                  </div>
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Gilded Edges & Gold Foil:</strong> Gold gilded page edges, foil embossing on cover, spot UV accents.</span>
                  </div>
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Color & Printer Calibration:</strong> Prepress setup and spot color optimization.</span>
                  </div>
                  <div className="deliv-item">
                    <CheckCircle size={15} />
                    <span><strong>Production Supervision:</strong> End-to-end printer coordination for premium paper finishes.</span>
                  </div>
                </div>
              </motion.div>


              {/* Billing Schedule / Milestones */}
              <div className="billing-schedule">
                <h4>Billing Schedule & Milestone Deliverables</h4>
                <div className="schedule-list">
                  <div className="schedule-step">
                    <div className="step-marker">
                      <div className="step-dot"></div>
                    </div>
                    <div className="step-content">
                      <span className="step-pct">50% Deposit</span>
                      <span className="step-title">Project Initiation & Strategy Alignment</span>
                      <p className="step-desc">To initiate visual research, grid architecture, font selections, and the layout conceptualization phase.</p>
                    </div>
                  </div>
                  
                  <div className="schedule-step">
                    <div className="step-marker">
                      <div className="step-dot"></div>
                    </div>
                    <div className="step-content">
                      <span className="step-pct">50% Balance</span>
                      <span className="step-title">Prepress Finalization & Printer Handoff</span>
                      <p className="step-desc">Upon approval of the brochure designs, final delivery of press-ready files, and successful printing press handoff.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="proposal-note">
              This proposal is valid for 30 days from the date of issue.
            </p>
          </motion.section>
        </div>

      </div>

      {/* Floating Bottom Quick Action Bar (Mobile Premium UX) */}
      <motion.div 
        className="floating-action-bar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingLeft: '0.5rem' }}>
          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--color-text-light)', letterSpacing: '0.05em' }}>Estimated Investment</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent)' }}>From INR {essentialPrice.toLocaleString('en-IN')}</span>
        </div>
        <motion.button 
          className="btn-premium btn-primary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePrint}
        >
          <Printer size={15} />
          <span>Save PDF</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
