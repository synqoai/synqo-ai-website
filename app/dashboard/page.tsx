"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Settings,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import { auth } from "../lib/firebase";
import styles from "./dashboard.module.css";

const TRIAL_LENGTH_DAYS = 30;

type ProductCard = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  status: string;
};

const products: ProductCard[] = [
  {
    title: "Synqo Reminder",
    description:
      "Create smart reminders, organize your day and never miss an important task.",
    icon: BellRing,
    href: "/products",
    status: "Available",
  },
  {
    title: "Synqo AI Employee",
    description:
      "Automate repetitive work and run daily business tasks with intelligent assistance.",
    icon: Bot,
    href: "/products",
    status: "Coming soon",
  },
  {
    title: "Synqo Business OS",
    description:
      "Manage customers, operations, invoices and growth from one connected workspace.",
    icon: LayoutDashboard,
    href: "/products",
    status: "In development",
  },
];

function getFirstName(user: User | null) {
  if (!user) return "there";

  if (user.displayName?.trim()) {
    return user.displayName.trim().split(" ")[0];
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "there";
}

function getTrialInfo(user: User | null) {
  const createdAt = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).getTime()
    : Date.now();

  const elapsedDays = Math.floor(
    (Date.now() - createdAt) / (1000 * 60 * 60 * 24),
  );

  const remainingDays = Math.max(TRIAL_LENGTH_DAYS - elapsedDays, 0);
  const progress = Math.min(
    Math.max(
      ((TRIAL_LENGTH_DAYS - remainingDays) / TRIAL_LENGTH_DAYS) * 100,
      0,
    ),
    100,
  );

  return { remainingDays, progress };
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const firstName = useMemo(() => getFirstName(user), [user]);
  const trial = useMemo(() => getTrialInfo(user), [user]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch {
      setSigningOut(false);
    }
  }

  if (loading) {
    return (
      <main className={styles.loadingPage}>
        <Loader2 className={styles.spinner} size={36} />
        <p>Loading your Synqo AI workspace...</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />
      </div>

      <aside
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarTop}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark}>S</span>
            <span>
              SYNQO <strong>AI</strong>
            </span>
          </Link>

          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.activeNavItem} href="/dashboard">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link href="/products">
            <Sparkles size={18} />
            Products
          </Link>

          <Link href="/pricing">
            <Zap size={18} />
            Plans
          </Link>

          <Link href="/settings">
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userMiniCard}>
            <div className={styles.avatar}>
              {firstName.slice(0, 1).toUpperCase()}
            </div>

            <div>
              <strong>{user?.displayName || firstName}</strong>
              <span>{user?.email}</span>
            </div>
          </div>

          <button
            className={styles.logoutButton}
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? (
              <Loader2 className={styles.spinner} size={17} />
            ) : (
              <LogOut size={17} />
            )}
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className={styles.overlay}
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <section className={styles.content}>
        <header className={styles.topbar}>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div>
            <span className={styles.topbarLabel}>Synqo AI Workspace</span>
            <h1>Dashboard</h1>
          </div>

          <div className={styles.topbarActions}>
            <Link className={styles.settingsButton} href="/settings">
              <Settings size={18} />
              <span>Settings</span>
            </Link>

            <div className={styles.topbarAvatar}>
              {firstName.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <div className={styles.main}>
          <motion.section
            className={styles.hero}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                <Sparkles size={16} />
                Welcome to your workspace
              </div>

              <h2>
                Welcome back, <span>{firstName}</span>
              </h2>

              <p>
                Your Synqo AI account is ready. Start exploring tools designed
                to help you save time, stay organized and grow faster.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/products">
                  Explore products
                  <ArrowRight size={18} />
                </Link>

                <Link className={styles.secondaryButton} href="/pricing">
                  View plans
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.orbitOne} />
              <div className={styles.orbitTwo} />
              <div className={styles.aiCore}>
                <Sparkles size={42} />
              </div>
            </div>
          </motion.section>

          <section className={styles.statsGrid}>
            <article className={styles.statCard}>
              <div className={styles.statIcon}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span>Account status</span>
                <strong>Verified</strong>
              </div>
            </article>

            <article className={styles.statCard}>
              <div className={styles.statIcon}>
                <Clock3 size={20} />
              </div>
              <div>
                <span>Free trial</span>
                <strong>{trial.remainingDays} days left</strong>
              </div>
            </article>

            <article className={styles.statCard}>
              <div className={styles.statIcon}>
                <Zap size={20} />
              </div>
              <div>
                <span>Current plan</span>
                <strong>30-day trial</strong>
              </div>
            </article>
          </section>

          <section className={styles.dashboardGrid}>
            <div className={styles.productsSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.sectionLabel}>Your tools</span>
                  <h3>Synqo AI products</h3>
                </div>

                <Link href="/products">
                  View all
                  <ChevronRight size={17} />
                </Link>
              </div>

              <div className={styles.productGrid}>
                {products.map((product, index) => {
                  const Icon = product.icon;

                  return (
                    <motion.article
                      className={styles.productCard}
                      key={product.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <div className={styles.productTop}>
                        <div className={styles.productIcon}>
                          <Icon size={22} />
                        </div>

                        <span>{product.status}</span>
                      </div>

                      <h4>{product.title}</h4>
                      <p>{product.description}</p>

                      <Link href={product.href}>
                        Open product
                        <ArrowRight size={16} />
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <aside className={styles.rightColumn}>
              <article className={styles.trialCard}>
                <div className={styles.trialHeader}>
                  <div>
                    <span>Trial progress</span>
                    <strong>{trial.remainingDays} days remaining</strong>
                  </div>
                  <CalendarDays size={22} />
                </div>

                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${trial.progress}%` }}
                  />
                </div>

                <p>
                  All premium features are unlocked during your 30-day free
                  trial.
                </p>

                <Link href="/pricing">
                  Choose a plan
                  <ArrowRight size={16} />
                </Link>
              </article>

              <article className={styles.quickActions}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.sectionLabel}>Shortcuts</span>
                    <h3>Quick actions</h3>
                  </div>
                </div>

                <Link href="/products">
                  <span>
                    <BellRing size={18} />
                    Explore reminder app
                  </span>
                  <ChevronRight size={17} />
                </Link>

                <Link href="/settings">
                  <span>
                    <UserRound size={18} />
                    Update profile
                  </span>
                  <ChevronRight size={17} />
                </Link>

                <Link href="/contact">
                  <span>
                    <Mail size={18} />
                    Contact support
                  </span>
                  <ChevronRight size={17} />
                </Link>

                <Link href="/about">
                  <span>
                    <FileText size={18} />
                    Learn about Synqo AI
                  </span>
                  <ChevronRight size={17} />
                </Link>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
