"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { reload, sendEmailVerification, signOut } from "firebase/auth";

import { auth } from "../lib/firebase";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace("/login");
    }
  }, [router]);

  const checkVerification = async () => {
    setError("");
    setMessage("");
    setChecking(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        router.replace("/login");
        return;
      }

      await reload(user);

      if (user.emailVerified) {
        setMessage("Email verified successfully. Redirecting...");
        router.replace("/dashboard");
      } else {
        setError(
          "Email is not verified yet. Open the verification link sent to your inbox.",
        );
      }
    } catch (verificationError) {
      console.error("Verification check error:", verificationError);
      setError("Unable to check verification. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const resendVerificationEmail = async () => {
    setError("");
    setMessage("");
    setResending(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        router.replace("/login");
        return;
      }

      await sendEmailVerification(user);
      setMessage("A new verification email has been sent.");
    } catch (resendError) {
      console.error("Resend verification error:", resendError);
      setError(
        "Unable to resend right now. Please wait a moment and try again.",
      );
    } finally {
      setResending(false);
    }
  };

  const useDifferentAccount = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>S</div>

        <p style={styles.eyebrow}>ONE LAST STEP</p>

        <h1 style={styles.heading}>Verify your email</h1>

        <p style={styles.description}>
          We sent a verification link to{" "}
          <strong style={styles.email}>
            {auth.currentUser?.email ?? "your email address"}
          </strong>
          . Open the email and click the verification link.
        </p>

        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <button
          type="button"
          onClick={checkVerification}
          disabled={checking || resending}
          style={styles.primaryButton}
        >
          {checking ? "Checking..." : "I have verified my email"}
        </button>

        <button
          type="button"
          onClick={resendVerificationEmail}
          disabled={checking || resending}
          style={styles.secondaryButton}
        >
          {resending ? "Sending..." : "Resend verification email"}
        </button>

        <button
          type="button"
          onClick={useDifferentAccount}
          disabled={checking || resending}
          style={styles.linkButton}
        >
          Use a different account
        </button>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    color: "#ffffff",
    background:
      "radial-gradient(circle at top, #09244d 0%, #030916 48%, #01030a 100%)",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "42px 34px",
    border: "1px solid rgba(55, 145, 255, 0.3)",
    borderRadius: "26px",
    textAlign: "center",
    background: "rgba(3, 12, 29, 0.94)",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
  },

  logo: {
    width: "54px",
    height: "54px",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 28px",
    borderRadius: "16px",
    fontSize: "25px",
    fontWeight: 900,
    background: "linear-gradient(135deg, #168dff, #0054d8)",
    boxShadow: "0 0 30px rgba(0, 126, 255, 0.4)",
  },

  eyebrow: {
    margin: "0 0 10px",
    color: "#4da8ff",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.16em",
  },

  heading: {
    margin: 0,
    fontSize: "38px",
    letterSpacing: "-0.035em",
  },

  description: {
    margin: "18px 0 28px",
    color: "#9eacc3",
    fontSize: "15px",
    lineHeight: 1.7,
  },

  email: {
    color: "#ffffff",
  },

  error: {
    marginBottom: "18px",
    padding: "13px",
    border: "1px solid rgba(255, 96, 118, 0.35)",
    borderRadius: "12px",
    color: "#ffb5c0",
    background: "rgba(132, 16, 35, 0.25)",
  },

  success: {
    marginBottom: "18px",
    padding: "13px",
    border: "1px solid rgba(63, 226, 157, 0.32)",
    borderRadius: "12px",
    color: "#a7f5d0",
    background: "rgba(13, 107, 68, 0.23)",
  },

  primaryButton: {
    width: "100%",
    height: "52px",
    border: "1px solid #2194ff",
    borderRadius: "13px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #087fff, #0051d4)",
    fontSize: "15px",
    fontWeight: 750,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    height: "52px",
    marginTop: "13px",
    border: "1px solid rgba(106, 165, 236, 0.35)",
    borderRadius: "13px",
    color: "#dcecff",
    background: "rgba(255, 255, 255, 0.045)",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },

  linkButton: {
    marginTop: "22px",
    border: 0,
    color: "#49a8ff",
    background: "transparent",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};
