import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Sparkles,
  Award,
  HeartHandshake,
  ChevronDown,
  Copy,
  Check,
  Languages,
} from "lucide-react";

// ---------------- Motion helpers ----------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const hoverLift = { whileHover: { y: -4, scale: 1.01 }, whileTap: { scale: 0.99 } };

const SectionTitle = ({ icon: Icon, title, kicker }) => (
  <motion.div variants={fadeUp} className="mb-8 flex items-end justify-between">
    <div>
      <div className="mb-2 text-xs uppercase tracking-widest text-zinc-600 dark:text-white/60">{kicker}</div>
      <h2 className="text-2xl md:text-4xl font-semibold leading-tight flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 md:h-8 md:w-8" />} {title}
      </h2>
    </div>
  </motion.div>
);

const GlowCard = ({ children, i = 0 }) => (
  <motion.div variants={fadeUp} custom={i} className="relative group will-change-transform" {...hoverLift}>
    <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-zinc-900/10 dark:bg-white/10 opacity-0 group-hover:opacity-10 transition" />
    <div className="relative rounded-2xl border border-zinc-900/10 dark:border-white/10 bg-zinc-900/5 dark:bg-white/5 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {children}
    </div>
  </motion.div>
);

export default function Portfolio() {
  const NAME = "坂口 拓海";
  const EN_NAME = "TAKUMI SAKAGUCHI";
  const TITLE_JA = "ハードウェアエンジニア";
  const TITLE_EN = "Hardware Engineer";
  const EMAIL = "saka.takumi0722@gmail.com";
  const INSTAGRAM = "https://www.instagram.com/neya_kosen";

  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("ja"); // 'ja' | 'en'
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = {
    ja: {
      navAbout: "About",
      navWork: "経歴",
      navContact: "Contact",
      heroLine1:
        "ロボコン・無線従事者免許などの様々な視点から物事をクリエイトするのが好きです。",
      heroLine2: "座右の銘は \"物事の本質を見抜け\"",
      heroLine3: "私と共に世界にイノベーションを",
      ctaWork: "経歴を見る",
      ctaContact: "一緒に作る",
      scroll: "スクロール",
      aboutTitle: "About",
      aboutKicker: "自己紹介",
      aboutP1: "2007年東京都渋谷区に生まれる。",
      aboutP2: "本好きな幼少期を過ごし、国立広島商船高等専門学校に入学。",
      skillsTitle: "開発経験",
      skills1: "ハードウェア",
      skills2: "C / Arduino / Android App (Kotlin) / ROS2",
      skills3: "資格",
      skills4: "第一級陸上特殊無線",
      workTitle: "経歴",
      workKicker: "これまでの活動",
      item1y: "2025",
      item1t: "NEDO NEP",
      item1d: "チームメンバーのFRとして採択",
      item2y: "2025",
      item2t: "経済産業省 AKATSUKI プロジェクト",
      item2d: "re-kosen GORO代表として採択",
      item3y: "2023-2025",
      item3t: "高専ロボコン",
      item3d: "チームリーダーを担当",
      item4y: "2022",
      item4t: "#地球塾2050",
      item4d: "第3回Bチーム",
      contactTitle: "Contact",
      contactKicker: "ご相談はこちらから",
      emailMe: "メールで連絡",
      ig: "Instagram: neya_kosen",
      copyEmail: "メールをコピー",
      copied: "コピーしました",
      backToTop: "トップに戻る",
      themeDark: "🌙 Dark",
      themeLight: "🌞 Light",
      langJA: "日本語",
      langEN: "EN",
    },
    en: {
      navAbout: "About",
      navWork: "Experience",
      navContact: "Contact",
      heroLine1:
        "I love creating from multiple angles—RoboCon, hardware, and my licensed wireless background.",
      heroLine2: "Motto: \"See the essence of things.\"",
      heroLine3: "Let's drive innovation together.",
      ctaWork: "View Experience",
      ctaContact: "Let's Build",
      scroll: "Scroll",
      aboutTitle: "About",
      aboutKicker: "Profile",
      aboutP1: "Born in 2007, Shibuya, Tokyo.",
      aboutP2: "Grew up loving books and entered NIT (KOSEN), Hiroshima College.",
      skillsTitle: "Engineering",
      skills1: "Hardware",
      skills2: "C / Arduino / Android App (Kotlin) / ROS2",
      skills3: "Licenses",
      skills4: "First-class Land Special Radio Operator (JP)",
      workTitle: "Experience",
      workKicker: "Track Record",
      item1y: "2025",
      item1t: "NEDO NEP",
      item1d: "Selected as FR team member",
      item2y: "2025",
      item2t: "METI AKATSUKI Project",
      item2d: "Selected as representative (re-kosen, GORO)",
      item3y: "2023–2025",
      item3t: "KOSEN RoboCon",
      item3d: "Team leader",
      item4y: "2022",
      item4t: "#EarthJuku 2050",
      item4d: "Round 3, Team B",
      contactTitle: "Contact",
      contactKicker: "Get in touch",
      emailMe: "Email me",
      ig: "Instagram: neya_kosen",
      copyEmail: "Copy email",
      copied: "Copied",
      backToTop: "Back to top",
      themeDark: "🌙 Dark",
      themeLight: "🌞 Light",
      langJA: "JA",
      langEN: "EN",
    },
  };
  const s = copy[lang];

  // Programmatic anchor scrolling that accounts for sticky header height
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector('header');
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 16); // +16px breathing room
    window.scrollTo({ top: y, behavior: 'smooth' });
    try { history.replaceState(null, '', `#${id}`); } catch (_) {}
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      window.prompt(lang === 'ja' ? "メールアドレスをコピーしてください" : "Copy this email", EMAIL);
    }
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    // On load, if a hash is present, scroll accounting for header
    const hash = decodeURIComponent(window.location.hash || '').replace('#','');
    if (hash) {
      requestAnimationFrame(() => scrollToId(hash));
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Parallax header glow
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, -120]);
  const glowBlurMV = useTransform(scrollY, [0, 600], [40, 12]); // MotionValue<number>
  const glowOpacity = useTransform(scrollY, [0, 600], [0.35, 0.1]);
  const glowFilter = useMotionTemplate`blur(${glowBlurMV}px)`; // MotionValue<string>

  // Sanity checks (visible in Console)
  useEffect(() => {
    console.groupCollapsed("✅ Sanity tests");
    console.assert(typeof Sparkles !== "undefined", "Sparkles icon must be imported from lucide-react");
    console.assert(typeof Mail !== "undefined", "Mail icon must be available");
    console.assert(typeof EMAIL === "string" && EMAIL.includes("@"), "EMAIL must look like an email address");
    const isMV = (mv) => mv && typeof mv.get === "function" && typeof mv.set === "function";
    console.assert(isMV(glowY) && isMV(glowOpacity) && isMV(glowBlurMV), "MotionValues should exist");
    console.assert(typeof glowFilter !== "undefined", "glowFilter template should exist");
    ['about','work','contact','home'].forEach(id=>{ const el = document.getElementById(id); console.assert(!!el, `#${id} exists`);});
    console.assert(copy.ja && copy.en && Object.keys(copy.ja).length === Object.keys(copy.en).length, 'i18n keys parity');
    console.assert(typeof s.navAbout === 'string' && typeof s.emailMe === 'string', 'dictionary provides strings');
    console.assert(document.documentElement.classList.contains('dark') === dark, 'dark class reflects state');
    console.groupEnd();
  }, [dark, lang]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#05050a] dark:text-white selection:bg-fuchsia-500 selection:text-white">
      {/* Animated ambient background (hidden in light, shown in dark) */}
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-0 dark:opacity-100" style={{ opacity: glowOpacity }}>
        <motion.div
          className="absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(at_top_left,_#7c3aed_10%,_#22c55e_30%,_#06b6d4_50%,_#f59e0b_70%,_#db2777_90%)]"
          style={{ y: glowY, filter: glowFilter }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050a]/40 to-[#05050a]" />

        {/* floating particles */}
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/30"
              style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
              animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/60 dark:bg-[#05050a]/60 border-b border-zinc-900/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#home" onClick={(e)=>{e.preventDefault(); scrollToId('home');}} className="group flex items-center gap-3">
            <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="h-8 w-8 rounded-lg bg-zinc-900/10 dark:bg-white/10 grid place-items-center">
              <Sparkles className="h-4 w-4 text-zinc-900 dark:text-white/90" />
            </motion.div>
            <div className="text-sm md:text-base font-bold tracking-wide">{lang === 'ja' ? NAME : EN_NAME}</div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" onClick={(e)=>{e.preventDefault(); scrollToId('about');}} className="text-zinc-600 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white transition">{s.navAbout}</a>
            <a href="#work" onClick={(e)=>{e.preventDefault(); scrollToId('work');}} className="text-zinc-600 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white transition">{s.navWork}</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); scrollToId('contact');}} className="text-zinc-600 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white transition">{s.navContact}</a>
          </nav>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center rounded-full border border-zinc-900/10 dark:border-white/15 bg-white/60 dark:bg-white/5 overflow-hidden text-xs">
              <button onClick={()=>setLang('ja')} className={`px-2.5 py-1 ${lang==='ja' ? 'font-semibold bg-zinc-900 text-white dark:bg-white dark:text-[#0b0b12]' : 'text-zinc-700 dark:text-white/80'}`}><Languages className="inline-block h-3.5 w-3.5 mr-1"/>{s.langJA}</button>
              <button onClick={()=>setLang('en')} className={`px-2.5 py-1 ${lang==='en' ? 'font-semibold bg-zinc-900 text-white dark:bg-white dark:text-[#0b0b12]' : 'text-zinc-700 dark:text-white/80'}`}>{s.langEN}</button>
            </div>
            {/* Theme toggle */}
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => setDark((v) => !v)} className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 dark:border-white/15 bg-white/60 dark:bg-white/5 px-3 py-1.5 text-xs text-zinc-700 dark:text-white/80 hover:bg-white/80 dark:hover:bg-white/10">
              {dark ? s.themeDark : s.themeLight}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative mx-auto max-w-6xl px-5 pt-20 pb-32 md:pt-28 md:pb-40 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
          <motion.h1 variants={fadeUp} className="mb-2 text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/90 dark:to-white/60 bg-clip-text text-transparent">
            {lang === 'ja' ? NAME : EN_NAME}
          </motion.h1>
          <motion.div variants={fadeUp} className="mb-6 text-lg md:text-2xl text-zinc-600 dark:text-white/70 tracking-wide">
            {lang === 'ja' ? EN_NAME : NAME}
          </motion.div>
          <motion.span variants={fadeUp} className="block mb-8 text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white/90 font-mono tracking-tight">
            {lang === 'ja' ? TITLE_JA : TITLE_EN}
          </motion.span>
          <motion.p variants={fadeUp} className="mb-10 max-w-2xl mx-auto text-zinc-700 dark:text-white/80 leading-relaxed">
            {s.heroLine1}<br />
            {s.heroLine2}<br />
            {s.heroLine3}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <motion.a {...hoverLift} href="#work" onClick={(e)=>{e.preventDefault(); scrollToId('work');}} className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-[#05050a] px-6 py-3 font-bold">
              {s.ctaWork} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a {...hoverLift} href="#contact" onClick={(e)=>{e.preventDefault(); scrollToId('contact');}} className="inline-flex items-center gap-2 rounded-full border border-zinc-900/20 dark:border-white/20 bg-zinc-900/5 dark:bg-white/5 px-6 py-3 font-semibold">
              {s.ctaContact} <HeartHandshake className="h-5 w-5" />
            </motion.a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-zinc-600 dark:text-white/70">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition">{s.ig}</a>
            <button onClick={copyEmail} className="hover:text-zinc-900 dark:hover:text-white transition inline-flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? s.copied : EMAIL}
            </button>
          </motion.div>
        </motion.div>
        <motion.div className="mt-20 flex items-center justify-center text-zinc-500 dark:text-white/50" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown className="mr-2 h-5 w-5" /> {s.scroll}
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 pb-28 scroll-mt-24 md:scroll-mt-32">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <SectionTitle icon={Award} title={s.aboutTitle} kicker={s.aboutKicker} />
          <GlowCard>
            <p className="leading-relaxed text-zinc-700 dark:text-white/85">
              {s.aboutP1}<br />
              {s.aboutP2}
            </p>
            <div className="mt-4 text-zinc-900 dark:text-white/90">
              <h3 className="font-semibold mb-2">{s.skillsTitle}</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-white/80">
                <li>{s.skills1}</li>
                <li>{s.skills2}</li>
                <li>{s.skills3}</li>
                <li>{s.skills4}</li>
              </ul>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      {/* Work / Experience */}
      <section id="work" className="mx-auto max-w-6xl px-5 pb-28 scroll-mt-24 md:scroll-mt-32">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <SectionTitle icon={Award} title={s.workTitle} kicker={s.workKicker} />
          <div className="grid gap-8 md:grid-cols-2">
            <GlowCard i={0}>
              <div className="text-sm text-zinc-500 dark:text-white/60">{s.item1y}</div>
              <div className="font-semibold text-xl">{s.item1t}</div>
              <p className="text-zinc-700 dark:text-white/80">{s.item1d}</p>
            </GlowCard>
            <GlowCard i={1}>
              <div className="text-sm text-zinc-500 dark:text-white/60">{s.item2y}</div>
              <div className="font-semibold text-xl">{s.item2t}</div>
              <p className="text-zinc-700 dark:text-white/80">{s.item2d}</p>
            </GlowCard>
            <GlowCard i={2}>
              <div className="text-sm text-zinc-500 dark:text-white/60">{s.item3y}</div>
              <div className="font-semibold text-xl">{s.item3t}</div>
              <p className="text-zinc-700 dark:text-white/80">{s.item3d}</p>
            </GlowCard>
            <GlowCard i={3}>
              <div className="text-sm text-zinc-500 dark:text-white/60">{s.item4y}</div>
              <div className="font-semibold text-xl">{s.item4t}</div>
              <p className="text-zinc-700 dark:text-white/80">{s.item4d}</p>
            </GlowCard>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-28 scroll-mt-24 md:scroll-mt-32">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <SectionTitle icon={HeartHandshake} title={s.contactTitle} kicker={s.contactKicker} />
          <GlowCard>
            <div className="flex flex-wrap items-center gap-3">
              <motion.a {...hoverLift} href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white dark:bg-white px-5 py-2 font-semibold dark:text-[#05050a]">
                <Mail className="h-4 w-4" /> {s.emailMe}
              </motion.a>
              <motion.a {...hoverLift} href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-900/15 dark:border-white/15 bg-zinc-900/5 dark:bg-white/5 px-5 py-2 font-semibold">
                {s.ig}
              </motion.a>
              <motion.button {...hoverLift} onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border border-zinc-900/15 dark:border-white/15 bg-zinc-900/5 dark:bg-white/5 px-5 py-2 font-semibold">
                {copied ? (<><Check className="h-4 w-4"/> {s.copied}</>) : (<><Copy className="h-4 w-4"/> {s.copyEmail}</>)}
              </motion.button>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-900/10 dark:border-white/10 bg-zinc-900/5 dark:bg-white/5 p-6 text-sm text-zinc-700 dark:text-white/70 backdrop-blur md:flex-row">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4" />
            <span>© {new Date().getFullYear()} {lang==='ja' ? NAME : EN_NAME}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
            <a href="#home" onClick={(e)=>{e.preventDefault(); scrollToId('home');}} className="hover:text-zinc-900 dark:hover:text-white">{s.backToTop}</a>
          </div>
        </div>
      </footer>

      {/* Extra global styles */}
      <style>{`
        html { color-scheme: light dark; scroll-behavior: smooth; }
      `}</style>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/15 dark:border-white/15 bg-zinc-900/5 dark:bg-white/10 backdrop-blur hover:bg-zinc-900/10 dark:hover:bg-white/20"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
