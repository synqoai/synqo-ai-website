"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function TermsPage() {
  return (
    <main className="legal-page">
      <InteractiveBackground />

      <nav className="inner-navbar">
        <Link href="/" className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-text">
            SYNQO <strong>AI</strong>
          </span>
        </Link>

        <Link href="/" className="inner-back-link">
          <ArrowLeft size={16} />
          Home
        </Link>
      </nav>

      <div className="legal-container">
        <h1>Terms & Conditions</h1>

        <p>
          These Terms & Conditions govern your use of the Synqo AI website,
          products, and services.
        </p>

        <h2>Use of Services</h2>

        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these terms.
        </p>

        <h2>Intellectual Property</h2>

        <p>
          The Synqo AI name, branding, website content, software, and related
          materials are protected by applicable intellectual property laws.
        </p>

        <h2>Service Availability</h2>

        <p>
          We may update, modify, suspend, or discontinue features as our
          products and services develop.
        </p>

        <h2>Limitation of Liability</h2>

        <p>
          Synqo AI is not responsible for indirect losses resulting from the use
          or inability to use our website or services.
        </p>

        <h2>Changes to These Terms</h2>

        <p>
          We may revise these terms from time to time. Continued use of our
          services means you accept the updated terms.
        </p>

        <h2>Contact</h2>

        <p>Questions about these terms can be sent through our Contact page.</p>
      </div>
    </main>
  );
}
