import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Sparkles,
  Award,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";

const SectionTitle = ({ icon: Icon, title, kicker }) => (
  <div className="mb-8 flex items-end justify-between">
    <div>
      <div className="mb-2 text-xs uppercase tracking-widest text-white/60">{kicker}</div>
      <h2 className="text-2xl md:text-4xl font-semibold leading-tight flex items-center gap-3">
        {Icon && <Icon className="h-6 w-6 md:h-8 md:w-8" />} {title}
      </h2>
    </div>
  </div>
);

const GlowCard = ({ children }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fuchsia-500/40 via-cyan-400/40 to-amber-400/40 blur-2xl opacity-30" />
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        {children}
      </div>
    </div>
  );
};

export default function Portfolio() {
  const NAME = "坂口 拓海";
  const EN_NAME = "TAKUMI SAKAGUCHI";
  const TITLE = "ハードウェアエンジニア";
  const EMAIL = "saka.takumi0722@gmail.com";
  const INSTAGRAM = "https://www.instagram.com/neya_kosen";

  const [dark, setDark] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white selection:bg-fuchsia-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0b0b12]/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#home" className="group flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10 ring-1 ring-white/20 grid place-items-center">
              <Sparkles className="h-4 w-4 text-white/90 group-hover:rotate-12 transition" />
            </div>
            <div className="text-sm md:text-base font-semibold">{NAME}</div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-white/80 hover:text-white">About</a>
            <a href="#work" className="text-white/80 hover:text-white">経歴</a>
            <a href="#contact" className="text-white/80 hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
            >
              {dark ? "🌙 Dark" : "🌞 Light"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 md:pt-24 md:pb-36">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="mb-2 text-4xl leading-[1.1] md:text-6xl font-bold">{NAME}</h1>
              <div className="mb-4 text-lg text-white/70">{EN_NAME}</div>
              <span className="block mb-6 text-2xl bg-gradient-to-r from-fuchsia-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">{TITLE}</span>
              <p className="mb-6 max-w-xl text-white/80">
                ロボコン・無線従事者免許などの様々な視点から物事をクリエイトするのが好きです。<br />
                座右の銘は "物事の本質を見抜け"<br />
                私と共に世界にイノベーションを
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-[#0b0b12] px-5 py-2 font-semibold hover:opacity-90"
                >
                  経歴を見る <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-semibold hover:bg-white/10"
                >
                  一緒に作る <HeartHandshake className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  Instagram: neya_kosen
                </a>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  <Mail className="h-4 w-4" /> {EMAIL}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center text-white/70">
          <ChevronDown className="mr-2 h-5 w-5 animate-bounce" /> スクロール
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 pb-20">
        <SectionTitle icon={Award} title="About" kicker="自己紹介" />
        <GlowCard>
          <p className="leading-relaxed text-white/85">
            2007年東京都渋谷区に生まれる。<br />
            本好きな幼少期を過ごし、国立広島商船高等専門学校に入学。
          </p>
          <div className="mt-4 text-white/90">
            <h3 className="font-semibold mb-2">開発経験</h3>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
              <li>ハードウェア</li>
              <li>C / Arduino / Android App (Kotlin) / ROS2</li>
            </ul>
          </div>
        </GlowCard>
      </section>

      {/* Work / Experience */}
      <section id="work" className="mx-auto max-w-6xl px-5 pb-20">
        <SectionTitle icon={Award} title="経歴" kicker="これまでの活動" />
        <div className="grid gap-6 md:grid-cols-2">
          <GlowCard>
            <div className="text-sm text-white/60">2025</div>
            <div className="font-semibold text-lg">NEDO NEP FR採択</div>
            <p className="text-white/80">国立研究開発法人 新エネルギー・産業技術総合開発機構</p>
          </GlowCard>
          <GlowCard>
            <div className="text-sm text-white/60">2025</div>
            <div className="font-semibold text-lg">経済産業省 AKATSUKI プロジェクト</div>
            <p className="text-white/80">re-kosen に代表として採択</p>
          </GlowCard>
          <GlowCard>
            <div className="text-sm text-white/60">2023-2024</div>
            <div className="font-semibold text-lg">高専ロボコン</div>
            <p className="text-white/80">チームリーダーを担当</p>
          </GlowCard>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-24">
        <SectionTitle icon={HeartHandshake} title="Contact" kicker="ご相談はこちらから" />
        <GlowCard>
          <form onSubmit={(e)=>{e.preventDefault(); alert("ありがとうございます！メッセージを受け取りました。");}} className="grid gap-3">
            <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-fuchsia-400" placeholder="お名前" required />
            <input className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-fuchsia-400" placeholder="メール" type="email" required />
            <textarea className="min-h-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-fuchsia-400" placeholder="メッセージ" required />
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-[#0b0b12] hover:opacity-90" type="submit">
              送信 <ArrowRight className="h-4 w-4"/>
            </button>
          </form>
        </GlowCard>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 pb-16">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur md:flex-row">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4" />
            <span>© {new Date().getFullYear()} {NAME}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
            <a href="#home" className="hover:text-white">
              トップに戻る
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur hover:bg-white/20"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
