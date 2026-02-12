import React, { useMemo, useState } from 'react';
import {
  Wind,
  MapPin,
  Newspaper,
  Gift,
  Cpu,
  ShieldCheck,
  ExternalLink,
  Wallet,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  PlayCircle,
} from 'lucide-react';

const tabs = [
  { key: 'home', label: '홈' },
  { key: 'news', label: '뉴스' },
  { key: 'nodes', label: '노드' },
  { key: 'rewards', label: '리워드' },
];

const demoTxs = [
  {
    sig: '4shA...x2P9',
    type: 'reward_mint',
    amount: '+12.40 AIVT',
    status: 'confirmed',
    ts: '2026-02-12 09:14',
  },
  {
    sig: '9BjK...n7Q3',
    type: 'claim_request',
    amount: '320 POINT',
    status: 'review',
    ts: '2026-02-11 22:40',
  },
  {
    sig: '6QmE...d8L1',
    type: 'penalty',
    amount: '-2.00 AIVT',
    status: 'risk_flag',
    ts: '2026-02-10 17:20',
  },
];

const chipStyle =
  'inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-300';

const StatusPill = ({ status }) => {
  if (status === 'confirmed') {
    return <span className="text-emerald-400 text-xs">확정</span>;
  }
  if (status === 'review') {
    return <span className="text-amber-400 text-xs">검토중</span>;
  }
  return <span className="text-rose-400 text-xs">리스크</span>;
};

const App = () => {
  const [tab, setTab] = useState('home');
  const [aqi] = useState(42);

  const aqiText = useMemo(() => {
    if (aqi <= 50) return '좋음';
    if (aqi <= 100) return '보통';
    if (aqi <= 150) return '민감군 주의';
    return '나쁨';
  }, [aqi]);

  return (
    <div className="min-h-[100dvh] bg-slate-900 text-white flex flex-col">
      <header className="px-4 pt-6 pb-4 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Wind className="text-emerald-400" size={20} /> AirVent Android Demo
          </div>
          <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            Solana Devnet
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
          <span className={chipStyle}><MapPin size={12} /> Seoul, KR</span>
          <span className={chipStyle}><Wallet size={12} /> 1,248.2 AIVT</span>
          <span className={chipStyle}><Clock3 size={12} /> live</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {tab === 'home' && (
          <>
            <section className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">실시간 대기질</p>
              <div className="flex items-end justify-between">
                <h1 className="text-3xl font-extrabold">AQI {aqi}</h1>
                <span className="text-emerald-400 font-semibold">{aqiText}</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">노드 실측 + 공공 API + 상용 API를 병합해 지역별 신뢰도 점수를 제공합니다.</p>
            </section>

            <section className="grid grid-cols-2 gap-3">
              <article className="bg-slate-800 border border-slate-700 rounded-xl p-3">
                <p className="text-xs text-slate-400">활성 노드</p>
                <p className="text-xl font-bold">1,024</p>
                <p className="text-[11px] text-emerald-400 mt-2">+3.2% (24h)</p>
              </article>
              <article className="bg-slate-800 border border-slate-700 rounded-xl p-3">
                <p className="text-xs text-slate-400">오늘 적립</p>
                <p className="text-xl font-bold">+18.6 AIVT</p>
                <p className="text-[11px] text-slate-400 mt-2">품질 점수 Q=0.92</p>
              </article>
            </section>

            <section className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h2 className="font-semibold mb-3">참조 리소스</h2>
              <div className="space-y-2 text-sm">
                <a className="flex items-center justify-between p-3 bg-slate-900 rounded-lg" href="https://youtu.be/Ga447YOjb10" target="_blank" rel="noreferrer">
                  <span className="flex items-center gap-2"><PlayCircle size={16} className="text-cyan-400" /> 데브넷 영상 보기</span>
                  <ExternalLink size={14} />
                </a>
                <a className="flex items-center justify-between p-3 bg-slate-900 rounded-lg" href="https://github.com/yhkdw/solana-contract" target="_blank" rel="noreferrer">
                  <span className="flex items-center gap-2"><ExternalLink size={16} className="text-cyan-400" /> Solana Contract Repo</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </section>
          </>
        )}

        {tab === 'news' && (
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2"><Newspaper size={16} /> 공기질 뉴스 허브</h2>
            <ul className="space-y-3 text-sm">
              <li className="bg-slate-900 p-3 rounded-lg">서울 초미세먼지 예보 개선: 실시간 경보 정확도 향상</li>
              <li className="bg-slate-900 p-3 rounded-lg">EU 도시권 AQI 표준 업데이트와 데이터 공개 범위 확대</li>
              <li className="bg-slate-900 p-3 rounded-lg">건강 민감군 맞춤 알림: 무료/유료 구독 기능 차별화</li>
            </ul>
          </section>
        )}

        {tab === 'nodes' && (
          <section className="space-y-3">
            <article className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h2 className="font-semibold mb-2 flex items-center gap-2"><Cpu size={16} /> 내 노드 상태</h2>
              <p className="text-sm text-slate-300">Node-KR-001 · Online · last seen 34s</p>
              <p className="text-xs text-slate-400 mt-2">Firmware 1.2.4 / Secure Boot / Signed OTA enabled</p>
            </article>
            <article className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2"><ShieldCheck size={16} /> 보안 체크리스트</h3>
              <ul className="text-sm space-y-1 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Secure Boot + Flash Encryption</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> OTA 서명 검증 및 롤백 보호</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 디바이스 키 기반 telemetry 서명 검증</li>
              </ul>
            </article>
          </section>
        )}

        {tab === 'rewards' && (
          <section className="space-y-3">
            <article className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h2 className="font-semibold mb-2 flex items-center gap-2"><Gift size={16} /> 리워드 / Devnet 트랜잭션</h2>
              <p className="text-xs text-slate-400">Phase1 포인트 원장 + Phase2 토큰 지급(Devnet 검증) 데모</p>
            </article>

            {demoTxs.map((tx) => (
              <article key={tx.sig} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{tx.type}</p>
                  <StatusPill status={tx.status} />
                </div>
                <p className="text-lg font-bold">{tx.amount}</p>
                <p className="text-xs text-slate-400 mt-1">sig: {tx.sig} · {tx.ts}</p>
              </article>
            ))}

            <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">
              Devnet Claim 시뮬레이션 실행
            </button>
            <p className="text-xs text-amber-300 flex items-start gap-2"><AlertTriangle size={14} className="mt-0.5" />
              본 화면은 데모입니다. 실제 온체인 전송 전 KYC/리스크 검증이 선행됩니다.
            </p>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 grid grid-cols-4 max-w-[420px] mx-auto">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`py-3 text-xs ${tab === item.key ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
