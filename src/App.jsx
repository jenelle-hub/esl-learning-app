import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import AuthModal from "./components/AuthModal";

/* =========================================================
   1) ICON AUTO-IMPORT (Vite) + LOOKUP MAP
   ========================================================= */
const iconFiles = import.meta.glob("./assets/icons/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const ICONS = {
  // Navbar (default)
  "nav-home": "nav-home.png",
  "nav-features": "nav-features.png",
  "nav-assessment": "nav-assessment.png",
  "nav-lessons": "nav-lessons.png",
  "nav-activities": "nav-activities.png",
  "nav-classes": "nav-classes.png",
  "nav-pricing": "nav-pricing.png",

  // Navbar (active state)
  "nav-home-active": "nav-home-active.png",
  "nav-features-active": "nav-features-active.png",
  "nav-assessment-active": "nav-assessment-active.png",
  "nav-lessons-active": "nav-lessons-active.png",
  "nav-activities-active": "nav-activities-active.png",
  "nav-classes-active": "nav-classes-active.png",
  "nav-pricing-active": "nav-pricing-active.png",

  // Hero stats
  "stat-users": "stat-users.png",
  "stat-lessons": "stat-lessons.png",
  "stat-star": "stat-star.png",
  "stat-ribbon": "stat-ribbon.png",

  // Feature section icons
  "feature-ribbon": "Fribbon-blue.png",
  "feature-book": "Fbook-blue.png",
  "feature-play": "Fplay-blue.png",
  "feature-users": "Fusers-blue.png",

  // Bullet / accents
  "check-green": "check-green.png",
  "target-green": "target-green.png",

  // Generic / blue set
  "clock-blue": "clock-blue.png",
  "calendar-blue": "calendar-blue.png",
  "dollar-green": "dollar-green.png",
  "book-blue": "book-blue.png",
  "users-blue": "users-blue.png",
  "target-blue": "target-blue.png",

  // --- CHALLENGES + STREAKS section icons ---
  "trophy-purple": "trophy-purple.png",

  // Activities
  "play-blue": "play-blue.png",
  "lightning-blue": "lightning-blue.png",
  "stopwatch": "stopwatch.png",

  // Assessment banner
  "ribbon-blue": "ribbon-blue.png",

  // --- ASSESSMENT CARD ICONS ---
  "assess-grammar": "assess-grammar-book.png",
  "assess-listening": "assess-listening-headset.png",
  "assess-reading": "assess-reading-book-small.png",
  "assess-writing": "assess-writing-plane.png",

  // small utility icons used in the meta row (time & questions)
  "meta-time": "Mstopwatch.png",
  "meta-questions": "Mquestions.png",

  // --- Activities tabs (monochrome) ---
  "tab-games": "tab-games.png",
  "tab-speaking": "tab-speaking.png",
  "tab-vocabulary": "tab-vocabulary.png",
  "tab-conversation": "tab-conversation.png",

  // --- Class Features (sidebar) ---
  "class-cam-blue": "class-cam-blue.png",
  "class-cam-green": "class-cam-green.png",
  "class-people-blue": "class-people-blue.png",
  "class-clock-orange": "class-clock-orange.png",
  "class-globe-purple": "class-globe-purple.png",

  // Footer contact + socials
  "contact-mail": "contact-mail.png",
  "contact-phone": "contact-phone.png",
  "contact-location": "contact-location.png",
  "social-facebook": "social-facebook.png",
  "social-twitter": "social-twitter.png",
  "social-instagram": "social-instagram.png",
  "social-youtube": "social-youtube.png",
};

// hero image
import studentPhoto from "./assets/student.png";

// --- instructor avatars + sidebar photo ---
import avatarSarah from "./assets/sarah.png";
import avatarDavid from "./assets/david.png";
import avatarMaria from "./assets/maria.png";
import promoSelfie from "./assets/selfie.png";

/* =========================================================
   2) HELPERS + BASE
   ========================================================= */
const PRIMARY = "#1d4ed8";
const HOVER = "#1b46c8";

const cx = (...a) => a.filter(Boolean).join(" ");
const ImgIcon = ({ name, alt, className = "w-5 h-5" }) => {
  const file = ICONS[name];
  const url = file ? iconFiles[`./assets/icons/${file}`] : null;
  if (!url) return null;
  return <img src={url} alt={alt || name} className={className} />;
};
const Container = ({ className, children }) => (
  <div className={cx("mx-auto max-w-[1200px] px-4", className)}>{children}</div>
);

/* Smooth anchor scroll */
const useSmoothScroll = () => {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
};

/* =========================================================
   2.5) Supabase user hook (for Nav)
   ========================================================= */
function useSupabaseUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return user;
}

/* =========================================================
   3) NAVBAR (active icon + session UI)
   ========================================================= */
const activeIconFor = {
  "nav-home": "nav-home-active",
  "nav-features": "nav-features-active",
  "nav-assessment": "nav-assessment-active",
  "nav-lessons": "nav-lessons-active",
  "nav-activities": "nav-activities-active",
  "nav-classes": "nav-classes-active",
  "nav-pricing": "nav-pricing-active",
};

const Nav = ({ onOpenAuth }) => {
  const [active, setActive] = useState(window.location.hash || "#home");
  const user = useSupabaseUser();

  useEffect(() => {
    const handleHashChange = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClick = (href) => {
    window.location.hash = href;
    setActive(href);
  };

  const Link = ({ href, icon, label }) => {
    const isActive = active === href;
    const iconName = isActive ? activeIconFor[icon] || icon : icon;
    return (
      <button
        onClick={() => handleClick(href)}
        className={cx(
          "inline-flex items-center gap-1 px-3 py-2 rounded-md text-[14px] font-medium transition-all duration-150",
          isActive ? "text-white shadow-sm" : "text-slate-800 hover:text-[#1d4ed8]"
        )}
        style={isActive ? { backgroundColor: PRIMARY } : undefined}
      >
        <ImgIcon name={iconName} className="w-[14px] h-[14px]" />
        <span className="hidden lg:inline">{label}</span>
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <Container className="flex h-[64px] items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-[28px] h-[28px]">
            <ImgIcon name="nav-features" className="w-full h-full" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-[16px] text-slate-900">BrightLingo</div>
            <div className="text-[12.5px] text-slate-500">Lighting the Way to Better English</div>
          </div>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="#home" icon="nav-home" label="Home" />
          <Link href="#features" icon="nav-features" label="Features" />
          <Link href="#assessment" icon="nav-assessment" label="Assessment" />
          <Link href="#lessons" icon="nav-lessons" label="Lessons" />
          <Link href="#activities" icon="nav-activities" label="Activities" />
          <Link href="#classes" icon="nav-classes" label="Online Classes" />
          <Link href="#pricing" icon="nav-pricing" label="Pricing" />
        </nav>

        {/* Right: Session */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="h-[36px] px-4 rounded-md border text-[14px]"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth("signin")}
                className="h-[36px] px-4 text-[14px] text-slate-700 font-medium hover:text-[#1d4ed8]"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="h-[36px] px-4 rounded-md text-white text-[14px] font-medium"
                style={{ backgroundColor: PRIMARY }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
          aria-label="Menu"
        >
          ☰
        </button>
      </Container>
    </header>
  );
};

/* =========================================================
   4) HERO
   ========================================================= */
const Stat = ({ icon, value, label }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
    <div className="mx-auto mb-2 w-8 h-8 grid place-items-center">
      <ImgIcon name={icon} className="w-6 h-6" />
    </div>
    <div className="text-xl font-extrabold">{value}</div>
    <div className="text-slate-500 text-sm">{label}</div>
  </div>
);

const Hero = () => (
  <section id="home" className="bg-gradient-to-b from-slate-50 to-amber-50/20">
    <Container className="grid lg:grid-cols-2 gap-12 items-center py-14">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Lighting the Way to <span className="text-[#1d4ed8]">Better English</span>
        </h1>
        <p className="text-slate-600 mt-5 max-w-2xl">
          Comprehensive ESL platform with personalized assessments, interactive
          lessons, and live online classes with certified instructors.
        </p>
        <div className="flex gap-3 mt-8">
          <a
            href="#assessment"
            className="rounded-lg text-white px-4 py-2.5"
            style={{ backgroundColor: PRIMARY }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
          >
            Start Free Assessment
          </a>
          <a
            href="#classes"
            className="rounded-lg border px-4 py-2.5 hover:bg-slate-100"
          >
            Book Online Class
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl">
          <Stat icon="stat-users" value="10,000+" label="Students" />
          <Stat icon="stat-lessons" value="500+" label="Lessons" />
          <Stat icon="stat-ribbon" value="95%" label="Success Rate" />
          <Stat icon="stat-star" value="4.9/5" label="Rating" />
        </div>
      </div>

      <div className="relative">
        <img
          src={studentPhoto}
          alt="Student using laptop"
          className="w-full rounded-2xl border border-slate-200 shadow-xl object-cover"
        />
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-[rgba(29,78,216,0.08)] blur" />
      </div>
    </Container>
  </section>
);

/* =========================================================
   5) FEATURES SUMMARY GRID
   ========================================================= */
const FeatureCard = ({ icon, title, description, points, cta }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 duration-200">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-[#eff4ff] border border-[#c7d2fe] grid place-items-center">
        <ImgIcon name={icon} className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>

    {description && (
      <p className="text-slate-600 text-sm mb-3 leading-relaxed">{description}</p>
    )}

    <ul className="mt-2 space-y-2 text-sm">
      {points.map((p, i) => (
        <li key={i} className="flex items-center gap-2 text-slate-700">
          <ImgIcon name="target-green" className="w-4 h-4" /> {p}
        </li>
      ))}
    </ul>

    <button className="mt-5 w-full rounded-lg bg-[#1d4ed8] text-white py-2.5 font-medium hover:brightness-110 transition">
      {cta}
    </button>
  </div>
);

const Features = () => (
  <section id="features" className="py-14 bg-white">
    <Container>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center">
        Comprehensive ESL Learning Platform
      </h2>
      <p className="text-slate-600 text-center mt-2">
        Brighten your English skills with our complete learning ecosystem.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <FeatureCard
          icon="feature-ribbon"
          title="Skill Assessment"
          description="Take comprehensive tests to evaluate your English proficiency level across reading, writing, listening, and speaking."
          points={[
            "Grammar & Vocabulary Tests",
            "Speaking Assessment",
            "Writing Evaluation",
            "Personalized Feedback",
          ]}
          cta="Take Assessment"
        />

        <FeatureCard
          icon="feature-book"
          title="Interactive Lessons"
          description="Access structured lessons designed for different proficiency levels with engaging multimedia content."
          points={[
            "Beginner to Advanced",
            "Video Lessons",
            "Interactive Exercises",
            "Progress Tracking",
          ]}
          cta="Browse Lessons"
        />

        <FeatureCard
          icon="feature-play"
          title="Practice Activities"
          description="Reinforce your learning with fun and interactive activities that make English learning enjoyable."
          points={[
            "Grammar Games",
            "Vocabulary Builder",
            "Pronunciation Practice",
            "Conversation Starters",
          ]}
          cta="Try Activities"
        />

        <FeatureCard
          icon="feature-users"
          title="Online Classes"
          description="Join live classes with certified ESL instructors for personalized guidance and real-time feedback."
          points={["1-on-1 Sessions", "Group Classes", "Flexible Scheduling", "$25/hour Rate"]}
          cta="Book Class"
        />
      </div>
    </Container>
  </section>
);

/* =========================================================
   6) ASSESSMENT SECTION
   ========================================================= */
const Assessment = () => {
  const items = [
    { key: "grammar", icon: "assess-grammar", title: "Grammar & Vocabulary", desc: "Test your understanding of English grammar rules and vocabulary.", badge: "All Levels", minutes: 20, qs: 25 },
    { key: "listening", icon: "assess-listening", title: "Listening Comprehension", desc: "Evaluate your ability to understand spoken English.", badge: "Intermediate+", minutes: 15, qs: 20 },
    { key: "reading", icon: "assess-reading", title: "Reading Comprehension", desc: "Assess your reading skills and text comprehension.", badge: "All Levels", minutes: 25, qs: 30 },
    { key: "writing", icon: "assess-writing", title: "Writing Skills", desc: "Demonstrate your written English communication skills.", badge: "Intermediate+", minutes: 30, qs: 5 },
  ];

  return (
    <section id="assessment" className="py-14 bg-white">
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-[#1d4ed8]/5 p-8 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <ImgIcon name="clock-blue" className="w-5 h-5" />
              <div className="font-semibold text-slate-900 text-[16px]">Flexible Learning Schedule</div>
            </div>
            <p className="text-slate-600 text-[14px] max-w-[740px] mx-auto leading-relaxed">
              Learn at your own pace with self-study materials, or book live classes that fit your schedule. Our certified instructors are available 7 days a week.
            </p>
            <a
              href="#classes"
              className="mt-4 inline-block rounded-md text-white px-5 py-2.5 font-medium text-[14px]"
              style={{ backgroundColor: PRIMARY }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Schedule Your First Class
            </a>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mt-10">
          English Proficiency Assessment
        </h2>
        <p className="text-slate-600 text-center mt-2">
          Personalized recommendations that light the way to your goals.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {items.map((a) => (
            <div key={a.key} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ff] border border-[#c7d2fe] grid place-items-center">
                    <ImgIcon name={a.icon} className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-semibold">{a.title}</div>
                </div>
                <span className="text-[12px] leading-5 px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                  {a.badge}
                </span>
              </div>

              <p className="text-slate-600 text-sm mt-3">{a.desc}</p>

              <div className="flex items-center gap-6 text-sm text-slate-600 mt-3">
                <span className="inline-flex items-center gap-1">
                  <ImgIcon name="meta-time" className="w-4 h-4" /> {a.minutes} minutes
                </span>
                <span className="inline-flex items-center gap-1">
                  <ImgIcon name="meta-questions" className="w-4 h-4" /> {a.qs} questions
                </span>
              </div>

              <button
                className="mt-4 w-full rounded-lg text-white py-2.5"
                style={{ backgroundColor: PRIMARY }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#1d4ed8]/5 p-6 mt-8 text-center shadow-sm">
          <div className="mx-auto w-12 h-12 grid place-items-center">
            <ImgIcon name="stat-ribbon" className="w-8 h-8" />
          </div>
          <div className="font-semibold mt-2">Complete Assessment Package</div>
          <p className="text-slate-600 text-sm mt-1">
            Get comprehensive evaluation + personalized recommendations.
          </p>
          <button
            className="mt-4 rounded-lg text-white px-4 py-2.5"
            style={{ backgroundColor: PRIMARY }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
          >
            Start Complete Assessment (60 minutes)
          </button>
        </div>
      </Container>
    </section>
  );
};

/* =========================================================
   7) LESSONS SECTION
   ========================================================= */
const LessonCard = ({ title, mins, rating, bullets, cta = "Start Lesson", locked = false }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-sm text-slate-600 mt-1">
      {mins} min • ⭐ {rating}
    </div>
    <div className="mt-3 text-sm text-slate-700">
      <div className="font-medium mb-1">What you'll learn:</div>
      <ul className="space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-2">
            <ImgIcon name="stat-lessons" className="w-4 h-4" /> {b}
          </li>
        ))}
      </ul>
    </div>
    <button
      className={cx(
        "mt-4 w-full rounded-lg py-2.5",
        locked ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "text-white"
      )}
      style={!locked ? { backgroundColor: PRIMARY } : undefined}
      disabled={locked}
      onMouseOver={(e) => !locked && (e.currentTarget.style.backgroundColor = HOVER)}
      onMouseOut={(e) => !locked && (e.currentTarget.style.backgroundColor = PRIMARY)}
    >
      {locked ? "Locked" : cta}
    </button>
  </div>
);

const Lessons = () => (
  <section id="lessons" className="py-14 bg-white">
    <Container>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center">
        Interactive English Lessons
      </h2>
      <p className="text-slate-600 text-center mt-2">
        Structured path with engaging videos, exercises, and practical practice.
      </p>

      <div className="rounded-2xl bg-slate-100 p-4 mt-8">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
        </div>
        <div className="mt-4 h-3 rounded-full bg-white border border-slate-200">
          <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: PRIMARY }} />
        </div>
        <div className="text-right text-xs text-slate-500 mt-1">50% Complete</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <LessonCard
          title="Introduction to English"
          mins={15}
          rating={4.8}
          bullets={["Alphabet", "Basic Greetings", "Numbers 1-20"]}
          cta="Review"
        />
        <LessonCard
          title="Family and Relationships"
          mins={20}
          rating={4.9}
          bullets={["Family Members", "Describing People", "Possessive Pronouns"]}
          cta="Review"
        />
        <LessonCard
          title="Daily Routines"
          mins={25}
          rating={4.7}
          bullets={["Time Expressions", "Daily Activities", "Present Simple"]}
          cta="Start Lesson"
        />
        <LessonCard
          title="Food and Dining"
          mins={30}
          rating={4.6}
          bullets={["Food Vocabulary", "Restaurant Language", "Countable/Uncountable"]}
          locked
        />
      </div>

      <div className="rounded-2xl bg-[#1d4ed8]/8 p-6 mt-8 text-center border border-slate-200">
        <div className="mx-auto w-12 h-12 grid place-items-center">
          <ImgIcon name="feature-book" className="w-15 h-15" />
        </div>
        <div className="font-semibold mt-2">Personalized Learning Path</div>
        <p className="text-slate-600 text-sm mt-1">
          AI-powered plan based on your results and progress.
        </p>
        <button
          className="mt-4 rounded-lg text-white px-4 py-2.5"
          style={{ backgroundColor: PRIMARY }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
        >
          Get My Learning Plan
        </button>
      </div>
    </Container>
  </section>
);

/* =========================================================
   8) ACTIVITIES SECTION
   ========================================================= */
const ActivityCard = ({ icon, title, badge, pts, mins, played, cta = "Start Activity" }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <ImgIcon name={icon} className="w-5 h-5" />
      <div className="text-lg font-semibold">{title}</div>
    </div>
    <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
      {badge && <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-green-700">{badge}</span>}
      {pts && (
        <span className="inline-block rounded bg-[#1d4ed8]/15 px-2 py-0.5 text-[color:#1d4ed8]">
          {pts} pts
        </span>
      )}
    </div>
    <div className="text-sm text-slate-600 mt-3 flex items-center gap-4">
      <span className="flex items-center gap-1">
        <ImgIcon name="stopwatch" className="w-4 h-4" /> {mins} min
      </span>
      {played && (
        <span className="flex items-center gap-1">
          <ImgIcon name="users-blue" className="w-4 h-4" /> {played} played today
        </span>
      )}
    </div>
    <button
      className="mt-4 w-full rounded-lg text-white py-2.5"
      style={{ backgroundColor: PRIMARY }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
    >
      {cta}
    </button>
  </div>
);

const Activities = () => {
  const [tab, setTab] = useState("games");

  const tabs = [
    ["games", "Games", "tab-games"],
    ["speaking", "Speaking", "tab-speaking"],
    ["vocabulary", "Vocabulary", "tab-vocabulary"],
    ["conversation", "Conversation", "tab-conversation"],
  ];

  return (
    <section id="activities" className="py-14 bg-white">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center">
          Interactive Learning Activities
        </h2>
        <p className="text-slate-600 text-center mt-2">
          Reinforce learning through games, speaking practice, vocabulary, and conversation exercises.
        </p>

        {/* Tabs */}
        <div className="mt-6 rounded-2xl bg-slate-100 p-2 grid grid-cols-4 gap-2">
          {tabs.map(([key, label, icon]) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={
                  "grid place-items-center gap-1 rounded-xl py-3 transition-all " +
                  (active ? "bg-white shadow font-medium text-slate-900" : "text-slate-600 hover:bg-slate-200/60")
                }
              >
                <ImgIcon name={icon} className={"w-6 h-6 " + (active ? "" : "opacity-80")} />
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Sample activity cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <ActivityCard
            icon="target-blue"
            title="Word Matching Game"
            badge="Beginner"
            pts={100}
            mins={10}
            played="1,245"
          />
          <ActivityCard
            icon="lightning-blue"
            title="Grammar Race"
            badge="Intermediate"
            pts={150}
            mins={15}
            played="892"
          />
          <ActivityCard
            icon="play-blue"
            title="Sentence Builder"
            badge="All Levels"
            pts={120}
            mins={12}
            played="567"
          />
        </div>

        {/* Weekly + Streaks */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Weekly Challenges */}
          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-8 text-center shadow-sm">
            <div className="flex flex-col items-center">
              <ImgIcon name="trophy-purple" className="w-10 h-10" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Weekly Challenges</h3>
              <p className="mt-2 text-slate-600 text-sm max-w-[460px]">
                Join our weekly challenges and compete with learners worldwide. Complete activities to
                earn badges and climb the leaderboard.
              </p>
              <button
                className="mt-4 rounded-md px-4 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#7e22ce" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6b21c9")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7e22ce")}
              >
                View Challenges
              </button>
            </div>
          </div>

          {/* Daily Streaks */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
            <div className="flex flex-col items-center">
              <ImgIcon name="target-green" className="w-10 h-10" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Daily Streaks</h3>
              <p className="mt-2 text-slate-600 text-sm max-w-[460px]">
                Build a habit with daily activities. Maintain your streak to unlock special rewards and bonus content.
              </p>
              <button
                className="mt-4 rounded-md px-4 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#16a34a" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
              >
                Start Streak
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* =========================================================
   9) ONLINE CLASSES SECTION
   ========================================================= */
const CFItem = ({ icon, children }) => (
  <li className="flex items-center gap-3 py-1.5">
    <ImgIcon name={icon} className="w-5 h-5" />
    <span className="text-slate-700">{children}</span>
  </li>
);

const ClassFeaturesCard = () => (
  <div className="rounded-2xl border bg-white p-4">
    <div className="flex items-center gap-2 mb-2">
      <ImgIcon name="class-cam-blue" className="w-5 h-5" />
      <span className="font-medium text-slate-900">Class Features</span>
    </div>
    <ul className="mt-1 text-sm">
      <CFItem icon="class-cam-green">HD Video Calling</CFItem>
      <CFItem icon="class-people-blue">Interactive Whiteboard</CFItem>
      <CFItem icon="class-clock-orange">Flexible Scheduling</CFItem>
      <CFItem icon="class-globe-purple">Available 24/7</CFItem>
    </ul>
  </div>
);

const Avatar = ({ src, name }) => (
  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden grid place-items-center text-slate-600 font-semibold">
    {src ? (
      <img src={src} alt={name} className="w-full h-full object-cover" />
    ) : (
      (name || "")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    )}
  </div>
);

const Instructor = ({ name, years, specs, langs, rate, rating, availability = "Available today", avatar }) => (
  <div className="rounded-2xl border bg-white p-5 flex items-start gap-4 shadow-sm">
    <Avatar src={avatar} name={name} />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{name}</div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-amber-600 text-sm">
            <ImgIcon name="stat-star" className="w-4 h-4" />
            {rating}
          </span>
          <span className="inline-block text-xs font-semibold rounded px-2 py-0.5 bg-amber-100 text-amber-800">
            ${rate}/hr
          </span>
        </div>
      </div>
      <div className="text-sm text-slate-600">{years} years experience</div>
      <div className="text-sm mt-1"><span className="font-medium">Specialties:</span> {specs}</div>
      <div className="text-sm"><span className="font-medium">Languages:</span> {langs}</div>
      <div className="inline-block mt-2 rounded bg-emerald-100 px-2 py-0.5 text-emerald-700 text-xs">
        {availability}
      </div>
    </div>
  </div>
);

const OnlineClasses = () => {
  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const times = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"];

  return (
    <section id="classes" className="py-14 bg-white">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Live Online Classes</h2>
        <p className="text-slate-600 text-center mt-2">
          Learn with certified ESL instructors through personalized 1-on-1 sessions or interactive group classes. Flexible scheduling with competitive hourly rates.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Booking form */}
          <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImgIcon name="calendar-blue" className="w-5 h-5" /> Book Your Class
            </div>

            <div className="space-y-4">
              <select className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[--ring]" style={{ ["--ring"]: PRIMARY }}>
                <option>Choose class type</option>
                <option>1-on-1 Session</option>
                <option>Group Class (2-4)</option>
                <option>Intensive Session (2 hours)</option>
              </select>

              <select className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[--ring]" style={{ ["--ring"]: PRIMARY }}>
                <option>Choose your instructor</option>
                <option>Sarah Johnson</option>
                <option>David Chen</option>
                <option>Maria Rodriguez</option>
              </select>

              {/* date + time grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Choose Date</div>
                    <div className="text-slate-500 text-sm">October 2025</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-sm">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="text-slate-500">{d}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDay(((i + 1) % 31) || 31)}
                        className={cx("aspect-square rounded-lg border hover:bg-slate-100", (((i + 1) % 31) || 31) === selectedDay && "text-white")}
                        style={(((i + 1) % 31) || 31) === selectedDay ? { backgroundColor: PRIMARY, borderColor: PRIMARY } : undefined}
                      >
                        {((i + 1) % 31) || 31}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="font-medium mb-2">Choose Time</div>
                  <div className="grid grid-cols-2 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100 text-sm"
                        style={selectedTime === t ? { backgroundColor: PRIMARY, color: "white", borderColor: PRIMARY } : undefined}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="w-full rounded-lg text-white py-2.5"
                style={{ backgroundColor: PRIMARY }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Book Class – $25/hour ( {selectedDay} • {selectedTime} )
              </button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4 h-fit">
            <ClassFeaturesCard />
            <div className="text-lg font-semibold">Pricing</div>
            <div className="rounded-xl border p-4">
              <div className="font-medium">1-on-1 Session</div>
              <div className="text-slate-600 text-sm">Personal attention</div>
              <div className="font-semibold mt-1">$25/hr</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-medium">Group Class (2-4 students)</div>
              <div className="text-slate-600 text-sm">Interactive learning</div>
              <div className="font-semibold mt-1">$15/hr</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-medium">Intensive Session (2 hours)</div>
              <div className="text-slate-600 text-sm">Deep dive learning</div>
              <div className="font-semibold mt-1">$45/hr</div>
            </div>
            <ul className="text-xs text-slate-500 list-disc pl-5">
              <li>No setup fees or subscriptions</li>
              <li>Cancel up to 24 hours before class</li>
              <li>All materials included • Recording available after class</li>
            </ul>
          </div>
        </div>

        {/* Instructors & promo */}
        <div className="mt-10">
          <div className="font-semibold mb-3">Meet Our Instructors</div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Instructor
                avatar={avatarSarah}
                name="Sarah Johnson"
                years="8"
                specs="Business English, IELTS Prep, Conversation"
                langs="English (Native), Spanish"
                rate="25"
                rating="4.9"
                availability="Available today"
              />
              <Instructor
                avatar={avatarDavid}
                name="David Chen"
                years="6"
                specs="Grammar, Pronunciation, Academic Writing"
                langs="English (Native), Mandarin"
                rate="23"
                rating="4.8"
                availability="Available tomorrow"
              />
              <Instructor
                avatar={avatarMaria}
                name="Maria Rodriguez"
                years="10"
                specs="Beginner English, Kids Classes, Travel English"
                langs="English (Native), Spanish, Portuguese"
                rate="27"
                rating="4.9"
                availability="Available now"
              />
            </div>

            <aside className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm h-fit">
              <img src={promoSelfie} alt="Online class selfie" className="w-full h-48 md:h-56 object-cover rounded-xl" />
              <div className="mt-4 text-lg font-semibold text-slate-900">Why Choose Our Online Classes?</div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Get personalized attention from certified ESL instructors with real-time feedback and interactive learning materials.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* =========================================================
   10) PRICING
   ========================================================= */
const Pricing = () => (
  <section id="pricing" className="py-14 bg-white">
    <Container>
      <div className="flex items-center justify-center gap-3">
        <ImgIcon name="nav-pricing" className="w-6 h-6" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Choose Your Learning Path</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-10">
        {/* Free */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">Self-Study</div>
          <div className="text-4xl font-extrabold mt-2">Free</div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {["Basic assessments","Limited lesson access","Practice activities","Community forums","Progress tracking"].map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <ImgIcon name="check-green" className="w-4 h-4" /> {t}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-lg border px-4 py-2.5 hover:bg-slate-100">Get Started</button>
        </div>

        {/* Premium */}
        <div className="rounded-2xl border-2 border-[color:#1d4ed8] bg-white p-6 shadow-sm">
          <div className="text-sm font-medium" style={{ color: PRIMARY }}>Most Popular</div>
          <div className="text-lg font-semibold mt-1">Premium Learning</div>
          <div className="text-4xl font-extrabold mt-2">
            $19<span className="text-base font-medium text-slate-500">/month</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {["Full assessment suite","All lessons & activities","AI conversation practice","Personalized learning path","Downloadable materials","Priority support","10% discount on classes"].map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <ImgIcon name="check-green" className="w-4 h-4" /> {t}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 w-full rounded-lg text-white py-2.5"
            style={{ backgroundColor: PRIMARY }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
          >
            Start Premium
          </button>
        </div>

        {/* Online Classes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold">Online Classes</div>
          <div className="text-4xl font-extrabold mt-2">
            $25<span className="text-base font-medium text-slate-500">/hour</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {["1-on-1 personal sessions","Flexible scheduling","HD video calling","Interactive whiteboard","Class recordings","Homework assignments","Progress reports"].map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <ImgIcon name="check-green" className="w-4 h-4" /> {t}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 w-full rounded-lg text-white py-2.5"
            style={{ backgroundColor: PRIMARY }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
          >
            Book Class
          </button>
        </div>
      </div>

      {/* CTA + Payment features */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="rounded-2xl border bg-[#1d4ed8]/8 p-6">
          <div className="flex items-center gap-3 font-semibold" style={{ color: PRIMARY }}>
            <ImgIcon name="clock-blue" className="w-6 h-6" /> Try Before You Commit
          </div>
          <p className="text-slate-600 mt-2 text-sm">
            Start with free assessments and basic lessons. Book a $15 trial live class when you’re ready.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#assessment"
              className="rounded-lg text-white px-4 py-2.5"
              style={{ backgroundColor: PRIMARY }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = HOVER)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Start Free Assessment
            </a>
            <a href="#classes" className="rounded-lg border px-4 py-2.5 hover:bg-slate-100">
              Book Trial Class - $15
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3 font-semibold" style={{ color: "#047857" }}>
            <ImgIcon name="dollar-green" className="w-6 h-6" /> Payment Features
          </div>
          <ul className="mt-3 space-y-2 text-sm text-emerald-800">
            {["Secure payment processing","Cancel anytime with 24hr notice","Money-back guarantee","Multiple payment methods accepted","No hidden fees or contracts"].map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <ImgIcon name="check-green" className="w-4 h-4" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </section>
);

/* =========================================================
   11) FOOTER
   ========================================================= */
const Footer = () => (
  <footer className="border-t bg-white">
    <Container className="py-10 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#1d4ed8]/10 grid place-items-center">
            <ImgIcon name="nav-features" className="w-5 h-5" />
          </div>
          <div className="font-semibold">BrightLingo</div>
        </div>
        <p className="text-slate-600 text-sm mt-3">
          Lighting the way to better English through assessments, lessons, and live classes.
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <ImgIcon name="contact-mail" className="w-4 h-4" /> hello@brightlingo.com
          </div>
          <div className="flex items-center gap-2">
            <ImgIcon name="contact-phone" className="w-4 h-4" /> +1 (555) 123-4567
          </div>
          <div className="flex items-center gap-2">
            <ImgIcon name="contact-location" className="w-4 h-4" /> San Francisco, CA
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {["social-facebook", "social-twitter", "social-instagram", "social-youtube"].map((n) => (
            <a key={n} className="opacity-80 hover:opacity-100 cursor-pointer">
              <ImgIcon name={n} className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold mb-3">Learn</div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li><a href="#assessment">Take Assessment</a></li>
          <li><a href="#lessons">Browse Lessons</a></li>
          <li><a href="#activities">Practice Activities</a></li>
          <li><a href="#classes">Online Classes</a></li>
        </ul>
      </div>

      <div>
        <div className="font-semibold mb-3">Support</div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Technical Support</li>
          <li>Community Forum</li>
        </ul>
      </div>

      <div>
        <div className="font-semibold mb-3">Company</div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>About Us</li>
          <li>Our Teachers</li>
          <li>Careers</li>
          <li>Press</li>
        </ul>
      </div>
    </Container>
    <div className="border-t">
      <Container className="py-4 text-xs text-slate-500 flex items-center justify-between">
        <div>© 2025 BrightLingo. All rights reserved.</div>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </Container>
    </div>
  </footer>
);

/* =========================================================
   12) APP
   ========================================================= */
export default function App() {
  useSmoothScroll();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("signin");
  const openAuth = (tab) => {
    setAuthTab(tab || "signin");
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav onOpenAuth={(tab) => openAuth(tab)} />
      <main>
        <Hero />
        <Features />
        <Assessment />
        <Lessons />
        <Activities />
        <OnlineClasses />
        <Pricing />
      </main>
      <Footer />
      <AuthModal
        open={authOpen}
        tab={authTab}
        onTab={(t) => setAuthTab(t)}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}
