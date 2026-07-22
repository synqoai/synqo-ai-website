"use client";

import InteractiveBackground from "@/components/InteractiveBackground";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Bot,
  FileText,
  Mail,
  Megaphone,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: BellRing,
    name: "AI Reminder Assistant",
    status: "In Development",
    description:
      "An intelligent reminder system designed to organize tasks, schedules and recurring activities.",
  },
  {
    icon: Bot,
    name: "AI Business Assistant",
    status: "Planned",
    description:
      "A practical AI assistant for small businesses, customer communication and daily operations.",
  },
  {
    icon: FileText,
    name: "AI Resume Builder",
    status: "Planned",
    description:
      "Create professional resumes with intelligent writing, formatting and role-specific suggestions.",
  },
  {
    icon: Mail,
    name: "AI Email Writer",
    status: "Planned",
    description:
      "Write clear, professional and personalized emails faster using artificial intelligence.",
  },
  {
    icon: Megaphone,
    name: "AI Content Generator",
    status: "Planned",
    description:
      "Generate content ideas, captions and marketing material for businesses and creators.",
  },
  {
    icon: ReceiptText,
    name: "Invoice & Quotation Tools",
    status: "Planned",
    description:
      "Create and manage professional invoices and quotations through a simple business workflow.",
  },
];

export default function ProductsPage() {
  return (
    <main className="products-page">
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
          Back to home
        </Link>
      </nav>

      <section className="products-page-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="products-page-heading"
        >
          <div className="eyebrow">
            <span className="eyebrow-icon">
              <Sparkles size={17} />
            </span>
            Synqo AI Product Ecosystem
          </div>

          <h1>
            Intelligent products built for
            <span> real-world work.</span>
          </h1>

          <p>
            Synqo AI is building a connected suite of practical AI tools for
            productivity, communication, business operations and automation.
          </p>
        </motion.div>

        <div className="products-page-grid">
          {products.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + index * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                }}
                className="product-detail-card"
              >
                <div className="product-detail-top">
                  <div className="product-detail-icon">
                    <Icon size={25} />
                  </div>

                  <span
                    className={
                      product.status === "In Development"
                        ? "product-status active"
                        : "product-status"
                    }
                  >
                    {product.status}
                  </span>
                </div>

                <span className="product-detail-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2>{product.name}</h2>
                <p>{product.description}</p>

                <Link href="/contact">
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
