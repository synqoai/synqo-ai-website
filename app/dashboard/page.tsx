"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { auth } from "../lib/firebase";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (!currentUser.emailVerified) {
        router.replace("/verify-email");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const logout = async () => {
    setLoggingOut(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loader} />
        <p style={styles.loadingText}>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <button
          type="button"
          onClick={() => router.push("/")}
          style={styles.brandButton}
        >
          <span style={styles.logo}>S</span>

          <span>
            <span style={styles.brandName}>Synqo AI</span>
            <span style={styles.brandTagline}>Intelligence in sync</span>
          </span>
        </button>

        <div style={styles.headerActions}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>
              {user?.displayName || "Synqo User"}
            </span>
            <span style={styles.userEmail}>{user?.email}</span>
          </div>

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            style={{
              ...styles.logoutButton,
              ...(loggingOut ? styles.disabledButton : {}),
            }}
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </header>

      <section style={styles.heroSection}>
        <p style={styles.eyebrow}>SYNQO AI DASHBOARD</p>

        <h1 style={styles.heading}>
          Welcome back,
          <span style={styles.highlight}>
            {" "}
            {user?.displayName?.split(" ")[0] || "Creator"}
          </span>
        </h1>

        <p style={styles.description}>
          Your Synqo AI workspace is ready. Manage your tools, projects and
          account from one place.
        </p>
      </section>

      <section style={styles.statsGrid}>
        <article style={styles.statCard}>
          <span style={styles.statIcon}>01</span>
          <p style={styles.statLabel}>Account status</p>
          <h2 style={styles.statValue}>Active</h2>
          <p style={styles.statDescription}>
            Your email is verified and your account is ready.
          </p>
        </article>

        <article style={styles.statCard}>
          <span style={styles.statIcon}>02</span>
          <p style={styles.statLabel}>AI tools</p>
          <h2 style={styles.statValue}>Coming soon</h2>
          <p style={styles.statDescription}>
            Synqo AI tools will appear here as they are launched.
          </p>
        </article>

        <article style={styles.statCard}>
          <span style={styles.statIcon}>03</span>
          <p style={styles.statLabel}>Workspace</p>
          <h2 style={styles.statValue}>Ready</h2>
          <p style={styles.statDescription}>
            Your personal dashboard is successfully connected.
          </p>
        </article>
      </section>

      <section style={styles.mainGrid}>
        <article style={styles.mainCard}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.cardEyebrow}>QUICK START</p>
              <h2 style={styles.cardTitle}>Explore Synqo AI</h2>
            </div>

            <span style={styles.statusBadge}>Live</span>
          </div>

          <p style={styles.cardDescription}>
            This is the first version of your authenticated dashboard. Next we
            can connect real AI products, usage data, subscriptions and account
            settings.
          </p>

          <div style={styles.buttonRow}>
            <button
              type="button"
              onClick={() => router.push("/")}
              style={styles.primaryButton}
            >
              Visit website
            </button>

            <button
              type="button"
              onClick={() => alert("Synqo AI tools are coming soon.")}
              style={styles.secondaryButton}
            >
              View AI tools
            </button>
          </div>
        </article>

        <aside style={styles.profileCard}>
          <p style={styles.cardEyebrow}>YOUR PROFILE</p>

          <div style={styles.avatar}>
            {(user?.displayName || user?.email || "S").charAt(0).toUpperCase()}
          </div>

          <h2 style={styles.profileName}>
            {user?.displayName || "Synqo User"}
          </h2>

          <p style={styles.profileEmail}>{user?.email}</p>

          <div style={styles.verifiedRow}>
            <span style={styles.verifiedDot} />
            Email verified
          </div>
        </aside>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  loadingPage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: "16px",
    color: "#ffffff",
    background:
      "radial-gradient(circle at top, #08295b 0%, #030b1d 46%, #01030a 100%)",
  },

  loader: {
    width: "42px",
    height: "42px",
    border: "4px solid rgba(69, 164, 255, 0.2)",
    borderTopColor: "#2a9cff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  loadingText: {
    color: "#8fa4c0",
    fontSize: "14px",
  },

  page: {
    minHeight: "100vh",
    padding: "0 28px 50px",
    color: "#ffffff",
    background:
      "radial-gradient(circle at top left, #08295b 0%, #030b1d 40%, #01030a 100%)",
  },

  header: {
    maxWidth: "1220px",
    minHeight: "88px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    margin: "0 auto",
    borderBottom: "1px solid rgba(89, 151, 226, 0.17)",
  },

  brandButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: 0,
    border: 0,
    color: "#ffffff",
    background: "transparent",
    cursor: "pointer",
  },

  logo: {
    width: "45px",
    height: "45px",
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #1597ff, #004bd2)",
    boxShadow: "0 0 25px rgba(0, 132, 255, 0.38)",
    fontSize: "22px",
    fontWeight: 900,
  },

  brandName: {
    display: "block",
    textAlign: "left",
    fontSize: "17px",
    fontWeight: 850,
  },

  brandTagline: {
    display: "block",
    marginTop: "2px",
    color: "#6f89aa",
    textAlign: "left",
    fontSize: "10px",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  userName: {
    color: "#e8f3ff",
    fontSize: "13px",
    fontWeight: 750,
  },

  userEmail: {
    marginTop: "3px",
    color: "#7186a4",
    fontSize: "11px",
  },

  logoutButton: {
    height: "42px",
    padding: "0 18px",
    border: "1px solid rgba(87, 157, 237, 0.3)",
    borderRadius: "11px",
    color: "#dcecff",
    background: "rgba(255, 255, 255, 0.045)",
    fontSize: "13px",
    fontWeight: 750,
    cursor: "pointer",
  },

  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  heroSection: {
    maxWidth: "1220px",
    margin: "0 auto",
    padding: "80px 0 54px",
  },

  eyebrow: {
    margin: "0 0 14px",
    color: "#48a9ff",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.18em",
  },

  heading: {
    maxWidth: "820px",
    margin: 0,
    fontSize: "clamp(38px, 6vw, 72px)",
    lineHeight: 1.03,
    letterSpacing: "-0.055em",
  },

  highlight: {
    color: "#42a8ff",
    textShadow: "0 0 35px rgba(32, 144, 255, 0.35)",
  },

  description: {
    maxWidth: "650px",
    margin: "20px 0 0",
    color: "#91a4bf",
    fontSize: "16px",
    lineHeight: 1.7,
  },

  statsGrid: {
    maxWidth: "1220px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
    margin: "0 auto 18px",
  },

  statCard: {
    padding: "25px",
    border: "1px solid rgba(73, 148, 236, 0.2)",
    borderRadius: "20px",
    background: "rgba(4, 14, 34, 0.82)",
    boxShadow: "0 18px 50px rgba(0, 0, 0, 0.22)",
  },

  statIcon: {
    display: "inline-grid",
    placeItems: "center",
    width: "35px",
    height: "35px",
    borderRadius: "10px",
    color: "#5eb6ff",
    background: "rgba(22, 132, 255, 0.11)",
    fontSize: "11px",
    fontWeight: 850,
  },

  statLabel: {
    margin: "19px 0 7px",
    color: "#778da9",
    fontSize: "11px",
    fontWeight: 750,
    textTransform: "uppercase",
    letterSpacing: "0.09em",
  },

  statValue: {
    margin: 0,
    fontSize: "25px",
    letterSpacing: "-0.03em",
  },

  statDescription: {
    margin: "11px 0 0",
    color: "#71839d",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  mainGrid: {
    maxWidth: "1220px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(280px, 0.8fr)",
    gap: "18px",
    margin: "0 auto",
  },

  mainCard: {
    minHeight: "280px",
    padding: "30px",
    border: "1px solid rgba(73, 148, 236, 0.2)",
    borderRadius: "22px",
    background:
      "linear-gradient(145deg, rgba(5, 18, 43, 0.94), rgba(2, 9, 23, 0.92))",
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "20px",
  },

  cardEyebrow: {
    margin: "0 0 9px",
    color: "#48a9ff",
    fontSize: "10px",
    fontWeight: 850,
    letterSpacing: "0.14em",
  },

  cardTitle: {
    margin: 0,
    fontSize: "29px",
    letterSpacing: "-0.035em",
  },

  statusBadge: {
    padding: "7px 11px",
    border: "1px solid rgba(69, 223, 156, 0.28)",
    borderRadius: "999px",
    color: "#98efc5",
    background: "rgba(25, 139, 91, 0.15)",
    fontSize: "10px",
    fontWeight: 800,
  },

  cardDescription: {
    maxWidth: "700px",
    margin: "24px 0 0",
    color: "#8497b2",
    fontSize: "14px",
    lineHeight: 1.75,
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "32px",
  },

  primaryButton: {
    minWidth: "145px",
    height: "47px",
    padding: "0 18px",
    border: "1px solid #2194ff",
    borderRadius: "12px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #0a86ff, #0049cf)",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  secondaryButton: {
    minWidth: "145px",
    height: "47px",
    padding: "0 18px",
    border: "1px solid rgba(101, 166, 241, 0.3)",
    borderRadius: "12px",
    color: "#dcecff",
    background: "rgba(255, 255, 255, 0.045)",
    fontSize: "13px",
    fontWeight: 750,
    cursor: "pointer",
  },

  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    border: "1px solid rgba(73, 148, 236, 0.2)",
    borderRadius: "22px",
    textAlign: "center",
    background: "rgba(4, 14, 34, 0.86)",
  },

  avatar: {
    width: "78px",
    height: "78px",
    display: "grid",
    placeItems: "center",
    marginTop: "15px",
    border: "1px solid rgba(69, 158, 255, 0.5)",
    borderRadius: "24px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #168dff, #0054d8)",
    boxShadow: "0 0 30px rgba(0, 126, 255, 0.26)",
    fontSize: "31px",
    fontWeight: 900,
  },

  profileName: {
    margin: "18px 0 5px",
    fontSize: "22px",
  },

  profileEmail: {
    margin: 0,
    color: "#7186a4",
    fontSize: "12px",
  },

  verifiedRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "22px",
    color: "#9deac5",
    fontSize: "12px",
    fontWeight: 700,
  },

  verifiedDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#43d995",
    boxShadow: "0 0 12px rgba(67, 217, 149, 0.8)",
  },
};
