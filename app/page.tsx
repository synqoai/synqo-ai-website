"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Cloud,
  Menu,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import InteractiveBackground from "@/components/InteractiveBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import LoadingScreen from "@/components/LoadingScreen";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";

const features = [
  {
    number: "01",
    icon: Bot,
    title: "AI-Powered Software",
    description:
      "Modern AI products designed to reduce repetitive work and improve everyday business operations.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Automate routine processes so your team can focus on customers, decisions, and growth.",
  },
  {
    number: "03",
    icon: Cloud,
    title: "Scalable SaaS Products",
    description:
      "Reliable cloud-based tools designed to grow alongside your business.",
  },
];

const products = [
  "AI Reminder Assistant",
  "AI Business Assistant",
  "AI Resume Builder",
  "AI Email Writer",
  "AI Content Generator",
  "Invoice & Quotation Tools",
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <>
      <LoadingScreen />
      <InteractiveBackground />
      <BackToTop />
      <main>
        <motion.div
          style={{ scaleX: progress }}
          className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-blue-500"
        />

        <div className="site-background" aria-hidden="true">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <div className="grid-overlay" />

          <motion.div
            animate={{
              x: [0, 90, 0],
              y: [0, -55, 0],
              opacity: [0.18, 0.34, 0.18],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[8%] top-[15%] h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]"
          />

          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[15%] left-[5%] h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px]"
          />
        </div>

        <header className="navbar">
          <a className="brand" href="#home" aria-label="Synqo AI home">
            <motion.span
              whileHover={{ rotate: -6, scale: 1.06 }}
              className="brand-mark"
            >
              S
            </motion.span>

            <span className="brand-text">
              SYNQO <strong>AI</strong>
            </span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nav-button hidden sm:inline-flex" href="#contact">
            Get Started
            <ArrowRight size={17} />
          </a>

          <button
            type="button"
            aria-label="Open mobile menu"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-100 sm:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute left-3 right-3 top-[78px] rounded-2xl border border-blue-400/20 bg-[#040b16]/95 p-4 shadow-2xl backdrop-blur-2xl sm:hidden"
            >
              {["Products", "Solutions", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-semibold text-slate-200 hover:bg-blue-500/10"
                >
                  {item}
                  <ChevronRight size={16} className="text-blue-400" />
                </a>
              ))}
            </motion.div>
          )}
        </header>

        <section className="hero" id="home">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="hero-content"
          >
            <motion.div variants={reveal} className="eyebrow">
              <span className="eyebrow-icon">
                <Sparkles size={18} />
              </span>
              Building practical AI for modern businesses
            </motion.div>

            <motion.h1 variants={reveal}>
              Build smarter.
              <br />
              <span>Automate faster.</span>
              <br />
              Grow with AI.
            </motion.h1>

            <motion.p variants={reveal} className="hero-description">
              Synqo AI creates intelligent software, SaaS products and
              automation tools that simplify work and help businesses scale.
            </motion.p>

            <motion.div variants={reveal} className="hero-actions">
              <a className="primary-button" href="#products">
                Explore Products
                <ArrowRight size={18} />
              </a>

              <a className="secondary-button" href="#about">
                Building in Public
              </a>
            </motion.div>

            <motion.div variants={reveal} className="hero-meta">
              <div>
                <span className="status-dot" />
                Currently building
              </div>
              <strong>Synqo AI Product Ecosystem</strong>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="hero-visual"
            aria-label="Synqo AI platform preview"
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="dashboard-card"
            >
              <div className="dashboard-topbar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="dashboard-label">SYNQO AI</span>
              </div>

              <div className="dashboard-body">
                <aside className="dashboard-sidebar">
                  <div className="sidebar-logo">S</div>
                  <span className="sidebar-item active" />
                  <span className="sidebar-item" />
                  <span className="sidebar-item" />
                  <span className="sidebar-item" />
                </aside>

                <div className="dashboard-main">
                  <div className="dashboard-heading">
                    <div>
                      <span>AI Business Dashboard</span>
                      <h3>Welcome back</h3>
                    </div>

                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(20,140,255,0)",
                          "0 0 24px rgba(20,140,255,.45)",
                          "0 0 0 rgba(20,140,255,0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mini-avatar"
                    >
                      AI
                    </motion.div>
                  </div>

                  <div className="stat-grid">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="stat-card"
                    >
                      <span>Tasks automated</span>
                      <strong>
                        <AnimatedCounter value={1284} />
                      </strong>
                      <small>+18.4%</small>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="stat-card"
                    >
                      <span>Hours saved</span>
                      <strong>
                        <AnimatedCounter value={320} />
                      </strong>
                      <small>+24.1%</small>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="stat-card"
                    >
                      <span>Growth</span>
                      <strong>
                        <AnimatedCounter value={65} suffix="%" />
                      </strong>
                      <small>This month</small>
                    </motion.div>
                  </div>

                  <div className="chart-card">
                    <div className="chart-header">
                      <span>Automation performance</span>
                      <small>Last 30 days</small>
                    </div>

                    <div className="chart-bars">
                      {[42, 58, 48, 68, 62, 80, 74, 92, 86, 100].map(
                        (height, index) => (
                          <motion.span
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.7,
                              delay: 0.7 + index * 0.07,
                              ease: "easeOut",
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="activity-row">
                    <span className="activity-icon">
                      <Sparkles size={16} />
                    </span>

                    <div>
                      <strong>AI workflow completed</strong>
                      <small>Customer follow-up automation</small>
                    </div>

                    <span className="complete-pill">
                      <Check size={10} />
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="floating-card floating-one">
              <span className="floating-icon">
                <Sparkles size={17} />
              </span>
              <div>
                <strong>AI Assistant</strong>
                <small>Online and ready</small>
              </div>
            </div>

            <div className="floating-card floating-two">
              <span className="growth-arrow">
                <TrendingUp size={17} />
              </span>
              <div>
                <strong>+34%</strong>
                <small>Efficiency growth</small>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="trust-strip">
          <span>AI SOFTWARE</span>
          <span className="divider-dot" />
          <span>SAAS PRODUCTS</span>
          <span className="divider-dot" />
          <span>BUSINESS AUTOMATION</span>
          <span className="divider-dot" />
          <span>BUILT IN CANADA</span>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="section"
          id="solutions"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">WHAT WE BUILD</span>
              <h2>Technology that works for your business.</h2>
            </div>

            <p>
              We combine artificial intelligence, clean software design and
              automation to create practical products that solve real problems.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  whileHover={{ y: -9 }}
                  className="feature-card"
                >
                  <span className="feature-number">{feature.number}</span>

                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <a href="#contact">
                    Learn more
                    <ArrowRight size={16} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7 }}
          className="section products-section"
          id="products"
        >
          <div className="product-panel">
            <div className="product-copy">
              <span className="section-label">SYNQO AI ECOSYSTEM</span>
              <h2>One brand. Multiple intelligent products.</h2>

              <p>
                We are building a connected suite of AI tools for productivity,
                business operations, communication, content and automation.
              </p>

              <a className="primary-button" href="#contact">
                Follow Our Journey
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="product-list">
              {products.map((product, index) => (
                <motion.div
                  key={product}
                  whileHover={{
                    x: 10,
                    scale: 1.02,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="product-item premium-product-item"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{product}</strong>
                  <ArrowRight size={17} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="section about-section"
          id="about"
        >
          <div className="about-card">
            <span className="section-label">BUILDING IN PUBLIC</span>
            <h2>Follow Synqo AI from the first line of code.</h2>

            <p>
              We are sharing the real journey of building AI products, launching
              SaaS tools, learning from users and growing a technology company
              from Canada.
            </p>

            <a className="secondary-button" href="https://synqoai.com">
              Visit synqoai.com
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cta-section"
          id="contact"
        >
          <div className="cta-glow" />

          <span className="section-label">LET&apos;S BUILD THE FUTURE</span>
          <h2>Ready to grow with intelligent software?</h2>

          <p>
            Follow the Synqo AI journey and be the first to discover our
            upcoming products.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="mailto:hello.synqoai@gmail.com">
              Contact Synqo AI
              <ArrowRight size={18} />
            </a>

            <a className="secondary-button" href="https://synqoai.com">
              Visit Website
            </a>
          </div>
        </motion.section>

        <footer>
          <a className="brand" href="#home">
            <span className="brand-mark">S</span>
            <span className="brand-text">
              SYNQO <strong>AI</strong>
            </span>
          </a>

          <p>Building the future with AI.</p>

          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <small>© 2026 Synqo AI. All rights reserved.</small>
        </footer>
      </main>
    </>
  );
}
