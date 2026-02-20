import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import KpiCards from "../components/KpiCards";
import Alerts from "../components/Alerts";
import RawTable from "../components/RawTable";
import AiVerificationPanel from "../components/AiVerificationPanel";
import { GasChart, PmChart } from "../components/Charts";
import { getMockAirQualitySeries, downsampleByMinutes } from "../mock/airquality";
import { logout } from "../auth";

export default function DashboardPage() {
  const nav = useNavigate();
  const series = useMemo(() => getMockAirQualitySeries(), []);
  const chartData = useMemo(() => downsampleByMinutes(series, 5), [series]);
  const latest = series[series.length - 1];
  const last60 = series.slice(-60);

  const [balance, setBalance] = useState(12.34);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <Container>
          <div className="py-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400">AirVent DePIN</div>
              <div className="text-lg font-semibold">Operations Dashboard</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <div className="text-xs text-slate-400">Wallet (Demo)</div>
                <div className="text-sm font-semibold">{balance.toFixed(2)} AiVT</div>
              </div>
              <button
                onClick={() => {
                  logout();
                  nav("/login");
                }}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="py-6 space-y-4">
            <KpiCards latest={latest} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <PmChart data={chartData} />
                <GasChart data={chartData} />
              </div>

              <div className="lg:col-span-1 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="text-xs text-slate-400">REWARDS</div>
                  <div className="text-lg font-semibold">Mining Rewards (Demo)</div>

                  <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <div className="text-xs text-slate-400">Current Balance</div>
                    <div className="text-3xl font-bold mt-1">{balance.toFixed(2)} AiVT</div>
                    <div className="text-xs text-slate-500 mt-1">
                      AI 검증 완료(PASS) 이벤트 발생 시 자동 적립
                    </div>
                  </div>
                </div>

                <AiVerificationPanel
                  onReward={(amt) => setBalance((b) => Math.round((b + amt) * 100) / 100)}
                />

                <Alerts recent={last60} />
              </div>
            </div>

            <RawTable recent={last60} />
          </div>
        </Container>
      </main>
    </div>
  );
}
