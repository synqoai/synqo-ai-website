"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function AboutPage() {
  return (
    <main className="about-page">
      <InteractiveBackground />

      <nav className="inner-navbar">
        <Link href="/" className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-text">
            SYNQO <strong>AI</strong>
          </span>
        </Link>

        <Link href="/" className="inner-back-link">
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </nav>

      <section className="about-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">
            <span className="eyebrow-icon">
              <Sparkles size={16} />
            </span>
            ABOUT SYNQO AI
          </div>

          <h1>
            Building practical AI
            <span> for everyone.</span>
          </h1>

          <p>
            Synqo AI is a Canadian startup focused on building modern AI
            software, SaaS products and automation tools that save time,
            simplify work and help businesses grow.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div whileHover={{ y: -8 }} className="about-card">
            <h3>Mission</h3>

            <p>
              Make artificial intelligence simple, affordable and useful for
              businesses of every size.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="about-card">
            <h3>Vision</h3>

            <p>
              Build an ecosystem of AI products that improve everyday work and
              productivity.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="about-card">
            <h3>What We Build</h3>

            <p>
              AI assistants, business software, automation tools and SaaS
              platforms.
            </p>
          </motion.div>
        </div>

        <Link href="/products" className="primary-button">
          Explore Products
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
