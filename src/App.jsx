import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Activity, Wallet, Cpu, Menu, Bell, Check, Shield, Zap, Info, ChevronRight, LogOut, LayoutDashboard } from 'lucide-react';

// --- [컴포넌트 1] 대시보드 화면 (로그인 후) ---
const DashboardView = ({ onLogout }) => {
  const [tokenBalance, setTokenBalance] = useState(1240.50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 차트 더미 데이터
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    pm25: Math.floor(Math.random() * 50) + 10,
  }));

  // 채굴 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => setTokenBalance(prev => prev + 0.01), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full min-h-[100dvh] bg-slate-900 text-white font-sans overflow-hidden relative">
      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 사이드바 (모바일: 드로어 / 데스크톱: 항상 숨김 - 모바일 전용) */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-800 flex flex-col border-r border-slate-700 z-50
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-700">
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Wind /> Airvent <span className="text-white text-sm bg-emerald-600 px-2 py-1 rounded">DePIN</span>
          </div>
          <div className="mt-3 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
            <span className="text-emerald-400 font-semibold text-sm">AIVT</span>
            <span className="text-slate-400 text-xs ml-1">네이티브 토큰</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <div className="p-3 rounded-lg bg-slate-700 text-emerald-400 flex items-center gap-3 cursor-pointer">
            <LayoutDashboard size={20}/> 대시보드
          </div>
          {['내 기기 관리', '지갑 / 보상', '데이터 맵', '설정'].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg cursor-pointer text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
              {item}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-white w-full p-2">
            <LogOut size={18} /> 로그아웃 (홈으로)
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-700 text-slate-400"
            aria-label="메뉴"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-base font-semibold truncate flex-1 text-center px-2">마이닝 현황</h1>
          <div className="flex items-center gap-2 min-w-0">
            <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[11px] font-bold animate-pulse">
              ● Active
            </div>
            <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium text-xs flex items-center gap-1 shrink-0">
              <Wallet size={14} /> <span className="font-bold">{tokenBalance.toFixed(0)} AIVT</span>
            </button>
          </div>
        </header>

        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* 상태 카드 3개 */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex flex-col items-center text-center">
                <Wind className="text-emerald-400 mb-1" size={20} />
                <p className="text-slate-400 text-xs">AQI</p>
                <h3 className="text-sm font-bold">좋음 <span className="text-emerald-400">24</span></h3>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex flex-col items-center text-center">
                <Cpu className="text-blue-400 mb-1" size={20} />
                <p className="text-slate-400 text-xs">기기</p>
                <h3 className="text-sm font-bold">Online</h3>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex flex-col items-center text-center">
                <Activity className="text-yellow-400 mb-1" size={20} />
                <p className="text-slate-400 text-xs">수익</p>
                <h3 className="text-sm font-bold text-yellow-400">+12.5</h3>
              </div>
            </div>
          </div>

          {/* 차트 */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h3 className="text-sm font-semibold mb-4">데이터 채굴 현황</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} width={28} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                  <Line type="monotone" dataKey="pm25" stroke="#34d399" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- [컴포넌트 2] 랜딩 페이지 (로그인 전) ---
const LandingPage = ({ onStart }) => {
  const [billingMode, setBillingMode] = useState('rental');

  return (
    <div className="min-h-full h-full bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      <nav className="flex items-center justify-between px-4 py-4 border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Wind className="text-emerald-400" /> Airvent DePIN
          <span className="text-xs font-normal text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded">AIVT</span>
        </div>
        <button onClick={onStart} className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 rounded-full transition-all">
          대시보드 접속
        </button>
      </nav>

      <header className="pt-10 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6 border border-emerald-500/20">
          <Zap size={12} /> 2026년 1월 한정: 사전 예약 프로모션 중
        </div>
        <h1 className="text-3xl font-extrabold mb-6 leading-tight">
          숨쉴 때마다 쌓이는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">데이터 자산</span>
        </h1>
        <p className="text-slate-400 text-base mb-8">
          초기 비용 부담 없이 에어벤트 노드를 설치하세요.<br/>
          AIVT 토큰 보상으로 구독료를 0원으로 만듭니다.
        </p>
      </header>

      <section className="px-4 pb-10 flex-1 overflow-y-auto">
        {/* 토글 스위치 */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900 p-1 rounded-full border border-slate-800 flex relative">
            {['rental', 'purchase'].map((mode) => (
              <button
                key={mode}
                onClick={() => setBillingMode(mode)}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all ${billingMode === mode ? 'text-white' : 'text-slate-400'}`}
              >
                {mode === 'rental' ? '구독형 (Zero-Start)' : '소유형 (평생 무료)'}
              </button>
            ))}
            <div className={`absolute top-1 bottom-1 w-[50%] bg-emerald-600 rounded-full transition-all duration-300 ${billingMode === 'rental' ? 'left-1' : 'left-[49%]'}`}></div>
          </div>
        </div>

        {/* 가격 카드 */}
        <div className="space-y-6 bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Airvent Node V1</h3>
            <p className="text-slate-400">AIVT 토큰 보상으로 구독료를 회수</p>
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 mb-4">
               <div className="flex justify-between items-end">
                  <span className="text-slate-300">실질 체감 비용 (AIVT 보상 포함)</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {billingMode === 'rental' ? '+ ₩ 5,100 이익' : '+ ₩ 25,000 이익'}
                  </span>
                </div>
            </div>
          </div>
          <div className="text-center space-y-4">
             <div className="text-4xl font-bold">{billingMode === 'rental' ? '₩ 0' : '₩ 299,000'}</div>
             <p className="text-slate-500 text-sm">{billingMode === 'rental' ? '초기 비용 없음 / 월 1.9만 원' : '일시불 / 월 비용 없음'}</p>
             <button onClick={onStart} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-base flex items-center justify-center gap-2 group">
              지금 시작하기 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- [메인 앱] 화면 전환 관리 ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'dashboard'

  return (
    <div className="h-full">
      {currentPage === 'landing' ? (
        <LandingPage onStart={() => setCurrentPage('dashboard')} />
      ) : (
        <DashboardView onLogout={() => setCurrentPage('landing')} />
      )}
    </div>
  );
};

export default App;