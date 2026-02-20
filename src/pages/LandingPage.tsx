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
              Judge Login
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <div className="text-xs text-slate-400">PRIMER AI HACKATHON • DEMO</div>
                <h1 className="text-3xl md:text-4xl font-semibold mt-2 leading-tight">
                  공기질 데이터를 <span className="text-emerald-300">보상</span>과{" "}
                  <span className="text-sky-300">AI 검증</span>으로 연결하는 DePIN
                </h1>
                <p className="text-slate-300 mt-4">
                  기존 공기질 측정기는 비싸고, 데이터는 조작(어뷰징) 리스크가 있습니다.
                  AirVent는 **구독형(0원 시작)** + **AI 검증(데모)**으로 ‘신뢰도 있는 데이터’에만
                  보상을 지급하는 경험을 만듭니다.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setMode("subscription")}
                    className={`rounded-xl px-4 py-2 border ${
                      mode === "subscription"
                        ? "bg-slate-100 text-slate-950 border-slate-100"
                        : "bg-slate-950 border-slate-700 text-slate-200"
                    }`}
                  >
                    구독형
                  </button>
                  <button
                    onClick={() => setMode("ownership")}
                    className={`rounded-xl px-4 py-2 border ${
                      mode === "ownership"
                        ? "bg-slate-100 text-slate-950 border-slate-100"
                        : "bg-slate-950 border-slate-700 text-slate-200"
                    }`}
                  >
                    소유형
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="text-sm text-slate-400">{price.title}</div>
                  <div className="text-3xl font-bold mt-1">{price.primary}</div>
                  <div className="text-sm text-slate-300 mt-2">{price.desc}</div>
                  <div className="text-xs text-slate-500 mt-2">{price.secondary}</div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to="/login"
                    className="rounded-xl bg-emerald-500 text-slate-950 font-semibold px-4 py-2 hover:bg-emerald-400 transition"
                  >
                    대시보드 체험하기
                  </Link>
                  <a
                    href="https://airvent-team.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-slate-100 hover:bg-slate-900"
                  >
                    기존 버전 보기
                  </a>
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  Test ID: <span className="text-slate-200">judge@primer.kr</span> / PW:{" "}
                  <span className="text-slate-200">airvent2026</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="text-xs text-slate-400">WHAT YOU WILL SEE</div>
                <div className="text-lg font-semibold mt-1">3분 데모 핵심 화면</div>

                <ol className="mt-4 space-y-3 text-slate-200">
                  <li className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    1) 로그인 (심사위원 전용 계정)
                  </li>
                  <li className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    2) 실시간 공기질 KPI / 차트 (mock stream)
                  </li>
                  <li className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    3) OpenAI 데이터 검증 패널 (Demo) → 검증 완료 시 리워드 지급
                  </li>
                </ol>

                <div className="mt-6 text-[11px] text-slate-500">
                  * 이 프로젝트는 해커톤 제출용 “최종 버전” 데모이며, 실제 연동 시
                  MQTT/서버/API/OpenAI 검증 에이전트로 확장 가능합니다.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
