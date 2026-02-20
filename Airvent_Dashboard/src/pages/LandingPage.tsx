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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold mt-2 leading-tight">
                  공기질 데이터를 <span className="text-emerald-300">보상</span>과{" "}
                  <span className="text-sky-300">AI 검증</span>으로 연결하는 DePIN
                </h1>
                <p className="text-slate-300 mt-4">
                  AirVent는 센서 데이터를 네트워크에 제공하고, 검증된 데이터에 대해 보상이 쌓이는
                  사용자 경험을 제공합니다. (현재 버전은 데모 UI이며, 실제 연동 시 MQTT/서버/API로
                  확장 가능합니다.)
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
                    대시보드 보기
                  </Link>
                  <a
                    href="https://airvent.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-slate-100 hover:bg-slate-900"
                  >
                    공식 사이트
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="text-xs text-slate-400">KEY FEATURES</div>
                <div className="text-lg font-semibold mt-1">AirVent Dashboard</div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold">실시간 공기질 KPI</div>
                    <div className="text-xs text-slate-400 mt-1">
                      PM2.5/PM10/CO2/VOC/온습도 등 핵심 지표를 한 화면에 표시
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold">시계열 트렌드 차트</div>
                    <div className="text-xs text-slate-400 mt-1">
                      최근 24시간 추이를 빠르게 파악하고 이상 구간을 확인
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold">AI 데이터 검증 & 리워드(데모)</div>
                    <div className="text-xs text-slate-400 mt-1">
                      검증 완료(PASS) 이벤트가 발생하면 자동으로 리워드가 적립되는 흐름을 시각화
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-[11px] text-slate-500">
                  * 심사위원용 테스트 계정은 로그인 화면에서 확인할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
