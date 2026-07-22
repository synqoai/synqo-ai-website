"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  function updateField(field: keyof FormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (status.type !== "idle") {
      setStatus({
        type: "idle",
        message: "",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email and message.",
      });
      return;
    }

    if (message.length < 10) {
      setStatus({
        type: "error",
        message: "Your message must be at least 10 characters.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({
      type: "idle",
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Your message could not be sent.");
      }

      setForm(initialForm);

      setStatus({
        type: "success",
        message: result.message || "Your message has been sent successfully.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
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

      <section className="contact-page-wrapper">
        <motion.div
          className="contact-details"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="eyebrow">
            <span className="eyebrow-icon">
              <MessageSquare size={16} />
            </span>
            CONTACT SYNQO AI
          </div>

          <h1>
            Let&apos;s build something
            <span> intelligent.</span>
          </h1>

          <p className="contact-description">
            Have a product idea, automation requirement or business problem?
            Send us the details and the Synqo AI team will get back to you.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-icon">
                <Mail size={20} />
              </span>

              <div>
                <p>Email</p>
                <a href="mailto:hello.synqoai@yahoo.com">
                  hello.synqoai@yahoo.com
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon">
                <Building2 size={20} />
              </span>

              <div>
                <p>Company</p>
                <strong>Synqo AI</strong>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-card"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="contact-form-heading">
            <h2>Send a message</h2>
            <p>Tell us what you are planning to build.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="name">Your name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your full name"
                  maxLength={100}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  maxLength={254}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="company">
                Company
                <span>Optional</span>
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                placeholder="Company or brand name"
                maxLength={150}
                autoComplete="organization"
              />
            </div>

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="website">Website</label>

              <input
                id="website"
                name="website"
                type="text"
                value={form.website}
                onChange={(event) => updateField("website", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Project details</label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Tell us about your idea, requirements or business problem..."
                rows={7}
                minLength={10}
                maxLength={5000}
                required
              />

              <span className="contact-character-count">
                {form.message.length}/5000
              </span>
            </div>

            {status.type !== "idle" && (
              <motion.div
                className={`contact-form-status ${status.type}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.type === "success" && <CheckCircle2 size={19} />}

                <span>{status.message}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="contact-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="contact-spinner" size={19} />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
