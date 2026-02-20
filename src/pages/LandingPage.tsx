import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function LandingPage() {
  const [mode, setMode] = useState<"subscription" | "ownership">("subscription");

  const price = useMemo(() => {
    if (mode === "subscription") {
      return {
        title: "구독형 (초기비용 0원)",
        desc: "데이터 제공 보상(AiVT)으로 월 구독료를 상쇄하는 구조",
        primary: "₩0 시작",
        secondary: "월 구독 + 리워드 상쇄",
      };
    }
    return {
      title: "소유형 (기기 구매)",
      desc: "기기를 소유하고 데이터 제공 시 추가 보상을 받는 구조",
      primary: "₩449,000~",
      secondary: "기기 구매 + 채굴 보상",
    };
  }, [mode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">AirVent DePIN</div>
              <div className="text-lg font-semibold">Hyperlocal Air Quality Network</div>
            </div>
            <Link
              to="/login"
              className="rounded-xl bg-emerald-500 text-slate-950 font-semibold px-4 py-2 hover:bg-emerald-400 transition"
            >
              Login
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="py-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-xs text-emerald-400 font-semibold tracking-wider mb-2">DEPIN AIR QUALITY NETWORK</div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                공기질 데이터를 <span className="text-emerald-400">보상</span>과{" "}
                <span className="text-sky-400">AI 검증</span>으로 연결하는 미래
              </h1>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                기존 공기질 측정기는 비싸고 데이터 신뢰성이 부족합니다.
                AirVent는 **구독형(0원 시작)** 모델과 **AI 검증** 기술로 누구나 쉽게 참여하고 보상받는 생태계를 만듭니다.
              </p>

              <div className="flex justify-center gap-4 mb-12">
                <button
                  onClick={() => setMode("subscription")}
                  className={`rounded-xl px-6 py-3 font-medium transition-all ${mode === "subscription"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
                    : "bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                >
                  구독형
                </button>
                <button
                  onClick={() => setMode("ownership")}
                  className={`rounded-xl px-6 py-3 font-medium transition-all ${mode === "ownership"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
                    : "bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                >
                  소유형
                </button>
              </div>

              <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur mb-10">
                <div className="text-sm text-slate-400">{price.title}</div>
                <div className="text-4xl font-bold mt-2 text-slate-100">{price.primary}</div>
                <div className="text-base text-slate-300 mt-3">{price.desc}</div>
                <div className="text-sm text-slate-500 mt-2">{price.secondary}</div>
              </div>

              <div className="flex justify-center gap-4">
                <Link
                  to="/login"
                  className="rounded-xl bg-emerald-500 text-slate-950 font-bold px-8 py-4 text-lg hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5"
                >
                  대시보드 시작하기
                </Link>
                <a
                  href="https://airvent-team.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 text-slate-100 font-medium hover:bg-slate-800 transition"
                >
                  소개 페이지
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
