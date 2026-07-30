"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Provider } from "@supabase/supabase-js";
import LoginModal, { FacebookIcon, GoogleIcon, PROVIDER_ICON_CLASS, ProviderButton } from "./LoginModal";
import Q3DCanvas from "./Q3DCanvas";
import {
  createSupabaseBrowserClient,
  describeMissingSupabaseEnvVars,
  getMissingSupabaseEnvVars,
  isSupabaseConfigured,
} from "@/lib/supabase";
import {
  Zap,
  Layout,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Check,
  ChevronDown,
  X,
  Apple,
  Github as GitHubIcon,
  Mail,
  Phone,
  Twitter,
  Slack,
} from "lucide-react";

function useReveal() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, active] as const;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, active] = useReveal();
  return <div ref={ref} className={`reveal-element ${active ? "active" : ""} ${className}`}>{children}</div>;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas = canvasEl;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    let animationId = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x = 0;
      y = 0;
      size = 0;
      speedY = 0;
      speedX = 0;
      opacity = 0;
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.2 + 0.05);
        this.speedX = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(142, 240, 138, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" className="fixed inset-0 pointer-events-none z-[2] opacity-40" />;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll('button, a, input, select, textarea, .cursor-pointer');
    const onEnter = () => {
      cursor.style.width = "35px";
      cursor.style.height = "35px";
      cursor.style.borderColor = "#8EF08A";
      cursor.style.backgroundColor = "rgba(142, 240, 138, 0.1)";
    };
    const onLeave = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderColor = "rgba(255, 255, 255, 0.3)";
      cursor.style.backgroundColor = "transparent";
    };

    targets.forEach((t) => {
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} id="custom-cursor" />;
}

const FEATURES = [
  { icon: Zap, title: "AI Full Stack Generation", desc: "Generate user-interfaces, structural databases, route endpoints, third-party authentication protocols, and edge APIs dynamically from one single baseline prompt.", tag: "Autonomous Architecture" },
  { icon: Layout, title: "Frontend Engine", desc: "Beautiful layouts compiled using Next.js 15, Tailwind, and React 19. Perfectly customized components natively designed to match standard screen resolutions dynamically.", tag: "Next.js 15 & React 19" },
  { icon: Server, title: "Sovereign Backend", desc: "Engineered Node.js, Express, and Serverless API structures. Type-safe routing controls, absolute payload validations, dynamic load balancing, and secure headers.", tag: "Type-safe endpoints" },
  { icon: Database, title: "Database Integration", desc: "Structured SQL/NoSQL schema schemas automatically constructed. Deep-link models to Supabase, Postgres, Firebase, or complex remote Vector Databases.", tag: "PostgreSQL & Supabase" },
  { icon: ShieldCheck, title: "Enterprise Authentication", desc: "Out-of-the-box user management. Integrate secure multi-factor MFA, JSON Web Tokens (JWT), biometric passkeys, NextAuth setups, or OAuth profiles seamlessly.", tag: "Zero-trust security" },
  { icon: Cpu, title: "AI Agents & Workflows", desc: "Embed complex autonomous systems into your software application. Orchestrate background processors, webhooks, Vector memory searches, and Stripe-enabled actions.", tag: "Autonomous workflows" },
];

const TECH_TAGS = ["React", "Next.js", "Flutter", "Stripe", "PostgreSQL", "Vector Databases", "GitHub Integration", "One Click Deploy"];
const SHOW_SUPABASE_CONFIG_WARNING =
  !isSupabaseConfigured &&
  (process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_SHOW_SUPABASE_CONFIG_WARNING === "true");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function getSupabaseUnavailableMessage(missingVars: string[]) {
  if (!IS_PRODUCTION) {
    const missingVarsSegment = missingVars.length ? ` Missing: ${missingVars.join(", ")}.` : "";
    return `Authentication is currently unavailable because Supabase environment configuration is incomplete.${missingVarsSegment} Update .env.local (or deployment env vars) and restart/redeploy.`;
  }

  return "Authentication is currently unavailable because deployment environment configuration is incomplete. Please ask support to verify Supabase environment variables and redeploy.";
}

function getSupabaseClientCreationFailureMessage(error: unknown) {
  const message =
    "Authentication is currently unavailable. Please verify Supabase environment configuration and try again later or contact support.";

  if (IS_PRODUCTION || !(error instanceof Error) || !error.message) {
    return message;
  }

  return `${message} Technical details: ${error.message}`;
}

const PRICING_TIERS = [
  {
    name: "Free",
    description: "A simple starting point to explore QuickStart.Ai and validate your first product ideas.",
    price: "$0",
    ctaLabel: "Get Started",
    icon: Zap,
    highlight: false,
    features: [
      "Core product building workflows",
      "Foundational generation and preview tools",
      "A starter path to explore the platform",
    ],
  },
  {
    name: "Pro",
    description: "The most balanced plan for serious builders shipping polished web and mobile experiences.",
    price: "$15",
    ctaLabel: "Try QuickStart.Ai",
    icon: Layout,
    highlight: true,
    features: [
      "Everything in Free, plus:",
      "Expanded workflows for production-ready app building",
      "Additional collaboration and automation capabilities",
    ],
  },
  {
    name: "Premium",
    description: "A high-touch tier for advanced teams orchestrating larger systems and more complex launches.",
    price: "$150",
    ctaLabel: "Get Started",
    icon: Cpu,
    highlight: false,
    features: [
      "Everything in Pro, plus:",
      "Advanced platform access for larger delivery needs",
      "Priority-ready infrastructure and workflow coverage",
    ],
  },
] as const;

const FOOTER_LINK_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Get Started", href: "#signup" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
] as const;

const HERO_SECONDARY_ACTION_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 py-4 px-5 bg-brandSurface hover:bg-brandSurfaceAccent border border-brandBorder rounded-pill text-sm font-semibold transition-all duration-300 hover:scale-[1.01] hover:border-brandGreen/40 focus:outline-none focus:ring-1 focus:ring-brandGreen/40";

export default function LandingPage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialStep, setAuthModalInitialStep] = useState<"options" | "email" | "phone" | "signin">("options");
  const [showGetStartedButton, setShowGetStartedButton] = useState(false);
  const heroAuthButtonsRowRef = useRef<HTMLDivElement | null>(null);

  // Redirect already-authenticated users straight to the dashboard.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/dashboard");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    const heroAuthButtonsRow = heroAuthButtonsRowRef.current;
    if (!heroAuthButtonsRow) return;

    const updateGetStartedVisibility = () => {
      setShowGetStartedButton(heroAuthButtonsRow.getBoundingClientRect().bottom <= 0);
    };

    updateGetStartedVisibility();
    window.addEventListener("scroll", updateGetStartedVisibility, { passive: true });
    window.addEventListener("resize", updateGetStartedVisibility);

    return () => {
      window.removeEventListener("scroll", updateGetStartedVisibility);
      window.removeEventListener("resize", updateGetStartedVisibility);
    };
  }, []);

  function openAuthModal(step: "options" | "email" | "phone" | "signin" = "options") {
    setAuthModalInitialStep(step);
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
  }

  /** Returns a configured Supabase client, or null with an alert if env vars are missing. */
  function getSupabaseOrWarn() {
    if (!isSupabaseConfigured) {
      const missingVars = getMissingSupabaseEnvVars();
      // eslint-disable-next-line no-console
      console.error(describeMissingSupabaseEnvVars());
      alert(getSupabaseUnavailableMessage(missingVars));
      return null;
    }
    try {
      return createSupabaseBrowserClient();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to create Supabase browser client:", error);
      alert(getSupabaseClientCreationFailureMessage(error));
      return null;
    }
  }

  async function handleProviderAuth(provider: string) {
    const supabase = getSupabaseOrWarn();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as Provider,
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Supabase OAuth sign-in error:", error);
        alert(error.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error during OAuth sign-in:", error);
      alert(
        "Authentication is currently unavailable. Please verify Supabase environment configuration and try again later or contact support.",
      );
    }
  }

  async function handleEmailSignUp(payload: { name: string; email: string; password: string }) {
    const supabase = getSupabaseOrWarn();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: { data: { full_name: payload.name } },
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Supabase sign-up error:", error);
        alert(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error during sign-up:", error);
      alert(
        "Authentication is currently unavailable. Please verify Supabase environment configuration and try again later or contact support.",
      );
    }
  }

  async function handleEmailSignIn(payload: { email: string; password: string }) {
    const supabase = getSupabaseOrWarn();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Supabase sign-in error:", error);
        alert(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error during sign-in:", error);
      alert(
        "Authentication is currently unavailable. Please verify Supabase environment configuration and try again later or contact support.",
      );
    }
  }

  async function handlePhoneContinue(payload: { name: string; dialCode: string; phone: string }) {
    const supabase = getSupabaseOrWarn();
    if (!supabase) return;
    const dialCode = payload.dialCode.trim();
    const localNumber = payload.phone.replace(/\D/g, "");
    if (!dialCode || !localNumber) {
      alert("Please enter a valid dial code and phone number.");
      return;
    }
    const phone = `${dialCode}${localNumber}`;
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Supabase phone sign-in error:", error);
        alert(error.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error during phone sign-in:", error);
      alert(
        "Authentication is currently unavailable. Please verify Supabase environment configuration and try again later or contact support.",
      );
    }
  }

  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-brandBg text-white antialiased font-sans overflow-x-hidden selection:bg-brandGreen selection:text-black relative pt-[env(safe-area-inset-top)] pb-[max(16px,env(safe-area-inset-bottom))] px-[12px] md:px-[24px]">
      <CustomCursor />
      <div className="noise-bg" />
      <div className="radial-vignette" />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      <ParticleCanvas />

      <header className="fixed top-0 left-0 w-full z-50 border-b border-brandBorder bg-brandBg/60 backdrop-blur-xl">
        <div className="w-full max-w-[900px] md:max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brandGreen/40 rounded-full px-2" aria-label="QuickStart.Ai Homepage">
            <div className="w-10 h-10 relative overflow-hidden flex items-center justify-center"><Q3DCanvas scale={0.85} className="w-10 h-10 absolute pointer-events-none" /></div>
            <span className="text-xl font-bold tracking-tight"><span className="wordmark-quickstart metal-shimmer">QuickStart</span><span className="wordmark-ai">.Ai</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brandTextSec">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors duration-200">Workflow</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
          </nav>
          {showGetStartedButton && (
            <button onClick={() => openAuthModal()} className="inline-flex items-center justify-center bg-white text-black px-6 py-2.5 rounded-pill text-sm font-semibold hover:bg-brandGreen transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brandGreen/40 shadow-sm">Get Started</button>
          )}
        </div>
      </header>

      <main className="relative z-10 pt-20 w-full max-w-[900px] min-w-[320px] mx-auto flex flex-col items-center justify-center">
        {SHOW_SUPABASE_CONFIG_WARNING && (
          <section className="mx-auto mt-6 max-w-5xl px-6 w-full">
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Authentication is disabled because Supabase environment variables are not configured for this deployment.
              Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.
            </div>
          </section>
        )}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden pb-16 w-full">
          {/* 3D logo with oval spotlight backdrop */}
          <div
            className="relative mt-4 mb-20 flex items-center justify-center overflow-visible"
            style={{ width: 144, height: 144 }}
          >
            <div
              className="absolute q-logo-backdrop pointer-events-none"
              style={{ inset: "-42%", zIndex: 0 }}
            />
            <div className="relative z-10 flex h-full w-full items-center justify-center overflow-visible">
              <Q3DCanvas scale={1.5} className="w-full h-full" withBackdrop />
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-4xl text-center mx-auto mb-4 z-20 reveal-element active">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white">
              <span className="metal-shimmer">Build Full-Stack</span>
              <br />
              <span style={{ color: "#70F39B" }}>Web &amp; Mobile Apps in Minutes</span>
            </h1>
          </div>

          {/* Auth area — ref on this div so sticky header CTA appears once it scrolls out of view */}
          <div id="signup" ref={heroAuthButtonsRowRef} className="w-full max-w-md mx-auto z-20 reveal-element active">
            <div className="space-y-6">
              <ProviderButton loadingLabel="Authorization Pending..." onProviderAuth={handleProviderAuth} provider="Google" className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-4 px-6 rounded-pill text-base font-semibold transition-all duration-300 hover:bg-brandGreen hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-brandGreen/40 shadow-lg group">
                <GoogleIcon className={PROVIDER_ICON_CLASS} />
                <span>Continue with Google</span>
              </ProviderButton>
              <div className="grid grid-cols-3 gap-3">
                <ProviderButton loadingLabel="Authorization Pending..." onProviderAuth={handleProviderAuth} provider="GitHub" className="inline-flex items-center justify-center gap-2 py-3.5 px-3 bg-brandSurface hover:bg-brandSurfaceAccent border border-brandBorder rounded-pill text-sm font-medium transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-white/20"><GitHubIcon className={`${PROVIDER_ICON_CLASS} text-brandGreen`} /><span>GitHub</span></ProviderButton>
                <ProviderButton loadingLabel="Authorization Pending..." onProviderAuth={handleProviderAuth} provider="Apple" className="inline-flex items-center justify-center gap-2 py-3.5 px-3 bg-brandSurface hover:bg-brandSurfaceAccent border border-brandBorder rounded-pill text-sm font-medium transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-white/20"><Apple className={`${PROVIDER_ICON_CLASS} text-white`} /><span>Apple</span></ProviderButton>
                <ProviderButton loadingLabel="Authorization Pending..." onProviderAuth={handleProviderAuth} provider="Facebook" className="inline-flex items-center justify-center gap-2 py-3.5 px-3 bg-brandSurface hover:bg-brandSurfaceAccent border border-brandBorder rounded-pill text-sm font-medium transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-1 focus:ring-white/20"><FacebookIcon className={PROVIDER_ICON_CLASS} /><span>Facebook</span></ProviderButton>
              </div>
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/15" />
                <span className="text-white/45 text-xs sm:text-sm font-medium tracking-widest">OR</span>
                <div className="flex-1 h-px bg-white/15" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => openAuthModal("email")} className={HERO_SECONDARY_ACTION_BUTTON_CLASS}><Mail className={`${PROVIDER_ICON_CLASS} text-white/80`} /><span>Continue with Email</span></button>
                <button type="button" onClick={() => openAuthModal("phone")} className={HERO_SECONDARY_ACTION_BUTTON_CLASS}><Phone className={`${PROVIDER_ICON_CLASS} text-white/80`} /><span>Continue with Phone</span></button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-24 w-full">
          <div className="max-w-7xl mx-auto space-y-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brandGreen">What is QuickStart.Ai</p>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                QuickStart.Ai helps teams <span className="text-brandGreen">Build Full-Stack Web &amp; Mobile Apps in Minutes</span>.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-brandTextSec">
                Instantly generate native mobile applications, progressive web apps, production APIs, schema-perfect databases, authentication architectures, AI agents, secure cloud storage, and fully automated deployment configurations using simple natural language.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap gap-3">
                {TECH_TAGS.map((tag) => (
                  <span key={tag} className="rounded-pill border border-brandBorder bg-brandSurface px-4 py-2 text-sm font-medium text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Reveal key={feature.title}>
                    <article className="glass-card rounded-premium h-full p-6 sm:p-7">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brandBorder bg-brandSurfaceAccent text-brandGreen">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandGreen/80">{feature.tag}</p>
                          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                          <p className="text-sm leading-relaxed text-brandTextSec">{feature.desc}</p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-24 w-full">
          <div className="max-w-7xl mx-auto space-y-10">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brandGreen">Pricing</p>
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Choose the plan that fits your build velocity.
                </h2>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-brandTextSec">
                  Dark, cinematic, and built to scale with the same QuickStart.Ai product experience you see above.
                </p>
              </div>

              <div className="inline-flex items-center rounded-pill border border-brandBorder bg-brandSurface p-1 text-sm">
                <button type="button" className="rounded-pill bg-white px-4 py-2 font-semibold text-black">
                  Monthly
                </button>
                <button type="button" disabled className="rounded-pill px-4 py-2 font-semibold text-white/45">
                  Annual Soon
                </button>
              </div>
            </Reveal>

            <div className="grid gap-6 xl:grid-cols-3">
              {PRICING_TIERS.map((tier) => {
                const Icon = tier.icon;

                return (
                  <Reveal key={tier.name} className="h-full">
                    <article
                      className={`glass-card rounded-premium relative flex h-full flex-col p-6 sm:p-8 ${tier.highlight ? "pro-glow-border border border-brandGreen/40 bg-brandSurfaceAccent shadow-[0_25px_80px_-40px_rgba(142,240,138,0.55)] xl:-translate-y-3" : ""}`}
                    >
                      {tier.highlight && (
                        <span className="mb-6 inline-flex w-fit rounded-pill border border-brandGreen/30 bg-brandGreen/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brandGreen">
                          Most Popular
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-brandTextSec">{tier.description}</p>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brandBorder bg-brandSurface text-brandGreen">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="mt-8 flex items-end gap-2">
                        <span className="text-5xl font-bold tracking-tight text-white">{tier.price}</span>
                        <span className="pb-1 text-sm font-medium text-brandGreen">/ month</span>
                      </div>

                      <div className="mt-8 flex-1">
                        <ul className="space-y-4 text-sm text-brandTextSec">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brandGreen/10 text-brandGreen">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => openAuthModal()}
                        className={`mt-8 inline-flex w-full items-center justify-center rounded-pill px-5 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brandGreen/40 ${tier.highlight ? "bg-brandGreen text-black hover:bg-white" : "border border-brandBorder bg-brandSurface text-white hover:border-brandGreen/40 hover:bg-brandSurfaceAccent"}`}
                      >
                        {tier.ctaLabel}
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-brandBorder px-6 py-14 w-full">
        <div className="max-w-[900px] md:max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <Reveal className="max-w-sm">
            <a href="#" className="inline-flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-brandGreen/40" aria-label="QuickStart.Ai Homepage">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden">
                <Q3DCanvas scale={0.8} className="absolute h-10 w-10 pointer-events-none" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="wordmark-quickstart">QuickStart</span><span className="wordmark-ai">.Ai</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-brandTextSec">
              Build Full-Stack <span className="text-brandGreen">Web &amp; Mobile Apps in Minutes</span> with one cohesive platform for product generation, infrastructure, and launch-ready workflows.
            </p>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_LINK_COLUMNS.map((column) => (
              <Reveal key={column.title}>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">{column.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="text-sm text-brandTextSec transition-colors duration-200 hover:text-brandGreen">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Social</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    { label: "GitHub", icon: GitHubIcon },
                    { label: "X", icon: X },
                    { label: "Twitter", icon: Twitter },
                    { label: "Slack", icon: Slack },
                  ].map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brandBorder bg-brandSurface text-white/70 transition-all duration-300 hover:border-brandGreen/40 hover:text-brandGreen"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        onProviderAuth={handleProviderAuth}
        onEmailSignUp={handleEmailSignUp}
        onEmailSignIn={handleEmailSignIn}
        onPhoneContinue={handlePhoneContinue}
        initialStep={authModalInitialStep}
      />

      <style>{`
        .noise-bg { position: fixed; top: -50%; left: -50%; right: -50%; bottom: -50%; width: 200%; height: 200%; opacity: 0.8; pointer-events: none; z-index: 999; animation: noise-anim 0.2s infinite; }
        @keyframes noise-anim { 0% { transform: translate(0,0) } 10% { transform: translate(-1%,-1%) } 20% { transform: translate(-2%,1%) } 30% { transform: translate(1%,-2%) } 40% { transform: translate(-1%,3%) } 50% { transform: translate(-1%,1%) } 60% { transform: translate(3%,-1%) } 70% { transform: translate(2%,1%) } 80% { transform: translate(-2%,-1%) } 90% { transform: translate(1%,3%) } 100% { transform: translate(1%,-2%) } }
        .radial-vignette { position: fixed; inset: 0; background: radial-gradient(circle at center, transparent 30%, rgba(9, 9, 9, 0.9) 100%); pointer-events: none; z-index: 10; }
        .ambient-glow-1 { position: absolute; top: 15%; left: 20%; width: 45vw; height: 45vw; background: radial-gradient(circle, rgba(142, 240, 138, 0.03) 0%, transparent 70%); pointer-events: none; filter: blur(80px); z-index: 1; animation: slow-drift-1 25s infinite alternate ease-in-out; }
        .ambient-glow-2 { position: absolute; bottom: 20%; right: 15%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 75%); pointer-events: none; filter: blur(100px); z-index: 1; animation: slow-drift-2 30s infinite alternate ease-in-out; }
        @keyframes slow-drift-1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, -40px) scale(1.1); } }
        @keyframes slow-drift-2 { 0% { transform: translate(0, 0) scale(1.1); } 100% { transform: translate(-60px, 50px) scale(0.9); } }
        .reveal-element { opacity: 0; transform: translateY(30px) scale(0.97); filter: blur(8px); transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-element.active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        .glass-card { background: rgba(16, 16, 16, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.06); }
        #custom-cursor { width: 20px; height: 20px; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 10000; transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s; display: none; }
        @media (hover: hover) { #custom-cursor { display: block; } }
      `}</style>
    </div>
  );
}
