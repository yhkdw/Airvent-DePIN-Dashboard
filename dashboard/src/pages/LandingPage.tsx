import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const isLocal: boolean =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

/* ─────────────── i18n ─────────────── */
const t = {
  ko: {
    nav: { howItWorks: "작동 원리", news: "네트워크 소식", node: "노드 구매" },
    login: "로그인",
    heroEyebrow: "DEPIN AIR QUALITY NETWORK",
    heroTitle: "숨쉬는 공기를\n수익으로 바꾸세요",
    heroSub:
      "Airvent 노드를 설치하면 실시간 공기질 데이터가 AI로 검증되어 AIVT 토큰으로 보상됩니다. 누구나, 어디서나.",
    heroCta: "노드 구매하기",
    heroCtaSec: "대시보드 둘러보기",
    statsLabel: ["설치된 노드", "측정 도시", "네트워크 참여자", "지급된 AIVT"],
    statsVal: ["1,200+", "48개", "3,400+", "2.1M+"],
    howItWorksTitle: "Airvent-AI 작동 방식",
    steps: [
      { icon: "🔧", step: "STEP 01", title: "노드 설치", desc: "초정밀 Airvent 노드를 설치해 AI 기반 대기질 모니터링 네트워크에 참여합니다." },
      { icon: "📡", step: "STEP 02", title: "실시간 데이터 수집", desc: "매 분마다 하이퍼로컬 대기질 데이터를 수집해 Solana 네트워크로 전송합니다." },
      { icon: "🛡️", step: "STEP 03", title: "AI 검증", desc: "Airvent-AI가 ZK-Proof로 데이터 무결성을 실시간 감사·검증합니다." },
      { icon: "💎", step: "STEP 04", title: "AIVT 리워드 지급", desc: "검증된 데이터 기여분에 대해 Solana 체인에서 즉시 토큰 보상을 받습니다." },
    ],
    partnerLabel: "파트너 & 생태계",
    partners: ["Superteam Korea", "Solana Foundation", "Solana DePIN Hub", "Metaplex"],
    testimonialLabel: "노드 운영자 후기",
    testimonials: [
      { name: "김지훈 · 서울 마포구", handle: "@jhkim_depin", text: "설치 30분 만에 데이터가 올라왔고, 일주일 만에 첫 AIVT를 수령했습니다. 생각보다 훨씬 간단해요.", avatar: "J" },
      { name: "박소연 · 부산 해운대", handle: "@soyeon_air", text: "공기질 데이터가 실시간으로 보이는 게 신기하고, 리워드까지 받으니 설치 안 할 이유가 없네요.", avatar: "S" },
      { name: "이민준 · 경기 수원", handle: "@minjun_node", text: "슈퍼팀코리아 행사에서 처음 알았는데, 팀 지원도 빠르고 커뮤니티도 활발합니다.", avatar: "M" },
    ],
    pricingLabel: "가격 & 플랜",
    pricingTitle: "노드 구매 가격 (USD)",
    pricingDesc: "얼리버드 혜택은 물량 소진 시 종료됩니다. 구독 크레딧으로 최대 60% 할인.",
    pricing: [
      { name: "Early Bird", price: "$349", tag: "인기", pro: true },
      { name: "Standard", price: "$399", tag: "", pro: true },
      { name: "3대 세트", price: "$899", tag: "최대 절약", pro: false },
      { name: "정가", price: "$499", tag: "", pro: true },
    ],
    pricingCta: "노드 상세 보기 →",
    newsLabel: "네트워크 소식",
    newsTitle: "주요 업데이트",
    news: [
      { tag: "Partnership", date: "2026.02.24", title: "슈퍼팀코리아 파트너십", desc: "Solana 생태계 DePIN 솔루션 확장" },
      { tag: "Roadmap", date: "2026.02.20", title: "2026 메인넷 로드맵 공개", desc: "차세대 고밀도 센서 네트워크 프로토콜" },
      { tag: "Governance", date: "2026.02.15", title: "탈중앙화 거버넌스 예고", desc: "AIVT 홀더 투표 시스템 출시 예정" },
    ],
    footerTagline: "Hyperlocal Air Quality Network — Powered by Solana",
    footerLinks: { docs: "문서", github: "GitHub", blog: "블로그", privacy: "개인정보처리방침", terms: "이용약관" },
  },
  en: {
    nav: { howItWorks: "How it Works", news: "Network News", node: "Buy Node" },
    login: "Login",
    heroEyebrow: "DEPIN AIR QUALITY NETWORK",
    heroTitle: "Breathe Clean.\nEarn Rewards.",
    heroSub:
      "Install an Airvent node and turn real-time air quality data into AIVT token rewards — AI-verified, Solana-powered. Anyone, anywhere.",
    heroCta: "Buy a Node",
    heroCtaSec: "Explore Dashboard",
    statsLabel: ["Nodes Installed", "Cities Covered", "Network Participants", "AIVT Distributed"],
    statsVal: ["1,200+", "48", "3,400+", "2.1M+"],
    howItWorksTitle: "How Airvent-AI Works",
    steps: [
      { icon: "🔧", step: "STEP 01", title: "Install Node", desc: "Deploy a precision Airvent node and join the AI-driven air quality monitoring network." },
      { icon: "📡", step: "STEP 02", title: "Live Data Streaming", desc: "Hyperlocal air data is collected every minute and streamed to our Solana-secured network." },
      { icon: "🛡️", step: "STEP 03", title: "AI Audit", desc: "Airvent-AI uses ZK-Proofs to audit and verify data integrity in real-time." },
      { icon: "💎", step: "STEP 04", title: "Earn AIVT Rewards", desc: "Receive AIVT token rewards on Solana instantly for your verified data contributions." },
    ],
    partnerLabel: "PARTNERS & ECOSYSTEM",
    partners: ["Superteam Korea", "Solana Foundation", "Solana DePIN Hub", "Metaplex"],
    testimonialLabel: "NODE OPERATOR STORIES",
    testimonials: [
      { name: "Ji-hoon Kim · Seoul", handle: "@jhkim_depin", text: "Data was live within 30 minutes of setup, and I received my first AIVT within a week. Way simpler than expected.", avatar: "J" },
      { name: "So-yeon Park · Busan", handle: "@soyeon_air", text: "Watching real-time air quality data from my neighborhood is fascinating — and earning rewards on top of that is a bonus.", avatar: "S" },
      { name: "Min-jun Lee · Suwon", handle: "@minjun_node", text: "Found out at a Superteam Korea event. The team support is fast and the community is very active.", avatar: "M" },
    ],
    pricingLabel: "PRICING & PLANS",
    pricingTitle: "Node Pricing (USD)",
    pricingDesc: "Early Bird benefits end when stock runs out. Use subscription credits for up to 60% off.",
    pricing: [
      { name: "Early Bird", price: "$349", tag: "Popular", pro: true },
      { name: "Standard", price: "$399", tag: "", pro: true },
      { name: "Set of 3", price: "$899", tag: "Best Value", pro: false },
      { name: "List Price", price: "$499", tag: "", pro: true },
    ],
    pricingCta: "View Node Details →",
    newsLabel: "NETWORK NEWS",
    newsTitle: "Latest Updates",
    news: [
      { tag: "Partnership", date: "2026.02.24", title: "Superteam Korea Partnership", desc: "Expanding DePIN solutions in the Solana ecosystem" },
      { tag: "Roadmap", date: "2026.02.20", title: "2026 Mainnet Roadmap Released", desc: "Next-gen dense sensor network protocol announced" },
      { tag: "Governance", date: "2026.02.15", title: "Decentralized Governance Preview", desc: "AIVT holder voting system coming soon" },
    ],
    footerTagline: "Hyperlocal Air Quality Network — Powered by Solana",
    footerLinks: { docs: "Docs", github: "GitHub", blog: "Blog", privacy: "Privacy Policy", terms: "Terms of Service" },
  },
} as const;

type Lang = keyof typeof t;

/* ─────────────── Component ─────────────── */
export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("ko");
  const tx = t[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <Container>
          <div className="py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="h-12 flex items-center">
                <img src="/airvent-logo-v3.png" alt="Airvent" className="h-full w-auto object-contain" />
              </div>
              <div className="hidden sm:block border-l border-slate-700 pl-4">
                <div className="text-sm font-black uppercase tracking-widest text-slate-400">Airvent DePIN</div>
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{tx.nav.howItWorks}</a>
              <a href="#network-news" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{tx.nav.news}</a>
              <Link to="/node" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{tx.nav.node}</Link>
              {isLocal && (
                <Link to="/judge" className="text-[10px] font-black text-sky-400 hover:text-sky-300 border border-sky-400/20 bg-sky-400/5 px-2.5 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  AI Demo
                </Link>
              )}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1 bg-slate-900 rounded-full p-1 border border-slate-800">
                {(["ko", "en"] as Lang[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === l ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link to="/login" className="rounded-xl bg-emerald-500 text-slate-950 font-bold px-4 py-2 text-sm hover:bg-emerald-400 transition">
                {tx.login}
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <Container>
            <div className="relative py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 tracking-widest">{tx.heroEyebrow}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 whitespace-pre-line">
                  {tx.heroTitle}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-lg">
                  {tx.heroSub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/node"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 font-bold px-7 py-4 text-base hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 transform">
                    {tx.heroCta}
                    <span>→</span>
                  </Link>
                  <Link to="/login"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 text-slate-300 font-semibold px-7 py-4 text-base hover:border-slate-500 hover:text-white transition">
                    {tx.heroCtaSec}
                  </Link>
                </div>
              </div>

              {/* Product image */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl scale-110" />
                  <img
                    src="/airvent_titan.png"
                    alt="Airvent Node"
                    className="relative w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Network Stats Banner ── */}
        <section className="border-y border-slate-800 bg-slate-900/50">
          <Container>
            <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {tx.statsVal.map((val, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">{val}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{tx.statsLabel[i]}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="py-24 scroll-mt-20">
          <Container>
            <div className="text-center mb-16">
              <div className="text-xs text-emerald-400 font-bold tracking-widest uppercase mb-2">Technical Process</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{tx.howItWorksTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {tx.steps.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-full hover:border-emerald-500/40 hover:bg-slate-800/50 transition-all">
                    <div className="text-xs text-slate-600 font-bold mb-3 tracking-widest">{step.step}</div>
                    <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{step.icon}</div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-slate-700" />}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Partners ── */}
        <section className="py-16 border-t border-slate-800/60 bg-slate-900/30">
          <Container>
            <div className="text-center mb-10">
              <div className="text-xs text-slate-500 font-bold tracking-widest uppercase">{tx.partnerLabel}</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {tx.partners.map((p, i) => (
                <div key={i} className="px-5 py-2.5 rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors cursor-default">
                  {p}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 border-t border-slate-800/60">
          <Container>
            <div className="text-center mb-14">
              <div className="text-xs text-sky-400 font-bold tracking-widest uppercase mb-2">{tx.testimonialLabel}</div>
              <h2 className="text-3xl font-bold text-white">
                {lang === "ko" ? "직접 경험한 사람들의 이야기" : "Stories from the Community"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tx.testimonials.map((t, i) => (
                <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-all flex flex-col gap-5">
                  <p className="text-slate-300 leading-relaxed text-sm flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.handle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Pricing ── */}
        <section className="py-24 border-t border-slate-800/60 bg-slate-900/30">
          <Container>
            <div className="text-center mb-14">
              <div className="text-xs text-indigo-400 font-bold tracking-widest uppercase mb-2">{tx.pricingLabel}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tx.pricingTitle}</h2>
              <p className="text-slate-400 max-w-xl mx-auto">{tx.pricingDesc}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {tx.pricing.map((p, i) => (
                <div key={i} className={`relative rounded-2xl border p-5 transition-all hover:-translate-y-1 ${i === 0 ? "border-emerald-500/50 bg-emerald-500/5" : "border-slate-800 bg-slate-950/60"}`}>
                  {p.tag && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${i === 0 ? "bg-emerald-500 text-slate-950" : "bg-indigo-500 text-white"}`}>
                      {p.tag}
                    </div>
                  )}
                  <div className="text-sm font-bold text-slate-300 mb-2 mt-1">{p.name}</div>
                  <div className="text-2xl font-black text-white">{p.price}</div>
                  <div className="text-xs text-slate-600 mt-1">per unit</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/node" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors text-sm">
                {tx.pricingCta}
              </Link>
            </div>
          </Container>
        </section>

        {/* ── Network News ── */}
        <section id="network-news" className="py-24 border-t border-slate-800/60 scroll-mt-20">
          <Container>
            <div className="text-center mb-14">
              <div className="text-xs text-sky-400 font-bold tracking-widest uppercase mb-2">{tx.newsLabel}</div>
              <h2 className="text-3xl font-bold text-white">{tx.newsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tx.news.map((n, i) => (
                <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 hover:bg-slate-800/50 hover:border-slate-700 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 px-2 py-1 rounded uppercase tracking-widest">{n.tag}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{n.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">{n.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{n.desc}</p>
                  <div className="text-[10px] font-black text-slate-600 group-hover:text-white transition-colors uppercase tracking-tighter">
                    Read More →
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Final CTA Banner ── */}
        <section className="py-20 border-t border-slate-800/60">
          <Container>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/20 p-12 text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />
              <div className="absolute inset-0 bg-emerald-500/3 pointer-events-none" />
              <h2 className="relative text-3xl md:text-4xl font-black text-white mb-4">
                {lang === "ko" ? "지금 바로 시작하세요" : "Start Earning Today"}
              </h2>
              <p className="relative text-slate-300 max-w-xl mx-auto mb-10">
                {lang === "ko"
                  ? "Airvent 노드 하나로 공기질 데이터를 수집하고, AIVT 토큰으로 보상받으세요."
                  : "Deploy one Airvent node, collect hyperlocal air data, and earn AIVT rewards automatically."}
              </p>
              <div className="relative flex flex-wrap justify-center gap-4">
                <Link to="/node"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 font-bold px-8 py-4 text-base hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transform">
                  {lang === "ko" ? "노드 구매하기" : "Buy a Node"} →
                </Link>
                <Link to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 text-slate-300 font-semibold px-8 py-4 text-base hover:border-slate-400 hover:text-white transition">
                  {lang === "ko" ? "대시보드 시작" : "Open Dashboard"}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 bg-slate-950 py-14">
        <Container>
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="text-base font-black text-white mb-2">Airvent-AI</div>
              <p className="text-sm text-slate-500 leading-relaxed">{tx.footerTagline}</p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                {[
                  { label: "X", href: "https://x.com/airventdepin", icon: "𝕏" },
                  { label: "Discord", href: "https://discord.gg/airvent", icon: "💬" },
                  { label: "Telegram", href: "https://t.me/airventdepin", icon: "✈️" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all text-sm">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resources</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">{tx.footerLinks.docs}</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">{tx.footerLinks.github}</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">{tx.footerLinks.blog}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">{tx.footerLinks.privacy}</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">{tx.footerLinks.terms}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Product</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><Link to="/node" className="hover:text-emerald-400 transition-colors">{lang === "ko" ? "노드 구매" : "Buy Node"}</Link></li>
                  <li><Link to="/login" className="hover:text-emerald-400 transition-colors">{lang === "ko" ? "대시보드" : "Dashboard"}</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Airvent-AI. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-700 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Powered by Solana
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
