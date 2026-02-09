import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Activity, Wallet, Cpu, Menu, Bell, Check, Shield, Zap, Info, ChevronRight, LogOut, LayoutDashboard } from 'lucide-react';

// --- [컴포넌트 1] 대시보드 화면 (로그인 후) ---
const DashboardView = ({ onLogout }) => {
  const [tokenBalance, setTokenBalance] = useState(1240.50);
  
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
    <div className="flex h-screen bg-slate-900 text-white font-sans overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-64 bg-slate-800 hidden md:flex flex-col border-r border-slate-700">
        <div className="p-6 text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <Wind /> Airvent <span className="text-white text-sm bg-emerald-600 px-2 py-1 rounded">DePIN</span>
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
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-lg font-semibold">실시간 마이닝 현황</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold animate-pulse">
              ● Mining Active
            </div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium text-sm flex items-center gap-2">
              <Wallet size={16} /> {tokenBalance.toFixed(2)} AVT
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* 상태 카드 3개 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <div className="flex justify-between">
                <div><p className="text-slate-400 text-sm">실내 공기질 (AQI)</p><h3 className="text-3xl font-bold mt-2">좋음 <span className="text-emerald-400 text-lg">(24)</span></h3></div>
                <div className="p-3 bg-emerald-900/30 rounded-lg text-emerald-400"><Wind /></div>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <div className="flex justify-between">
                <div><p className="text-slate-400 text-sm">기기 상태</p><h3 className="text-3xl font-bold mt-2">Online</h3></div>
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400"><Cpu /></div>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <div className="flex justify-between">
                <div><p className="text-slate-400 text-sm">예상 수익</p><h3 className="text-3xl font-bold mt-2 text-yellow-400">+12.5 AVT</h3></div>
                <div className="p-3 bg-yellow-900/30 rounded-lg text-yellow-400"><Activity /></div>
              </div>
            </div>
          </div>

          {/* 차트 */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="text-lg font-semibold mb-6">실시간 데이터 채굴 현황</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Wind className="text-emerald-400" /> Airvent DePIN
        </div>
        <button onClick={onStart} className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 rounded-full transition-all">
          대시보드 접속
        </button>
      </nav>

      <header className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6 border border-emerald-500/20">
          <Zap size={12} /> 2026년 1월 한정: 사전 예약 프로모션 중
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          숨쉴 때마다 쌓이는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">데이터 자산</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          초기 비용 부담 없이 에어벤트 노드를 설치하세요.<br/>
          DePIN 네트워크 보상으로 구독료를 0원으로 만듭니다.
        </p>
      </header>

      <section className="px-6 pb-24 max-w-5xl mx-auto">
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
        <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
          <div>
            <h3 className="text-2xl font-bold mb-2">Airvent Node V1</h3>
            <p className="text-slate-400 mb-6">구독료를 내고도 돈을 버는 구조</p>
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 mb-4">
               <div className="flex justify-between items-end">
                  <span className="text-slate-300">실질 체감 비용</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {billingMode === 'rental' ? '+ ₩ 5,100 이익' : '+ ₩ 25,000 이익'}
                  </span>
                </div>
            </div>
          </div>
          <div className="text-right">
             <div className="text-4xl font-bold mb-2">{billingMode === 'rental' ? '₩ 0' : '₩ 299,000'}</div>
             <p className="text-slate-500 text-sm mb-6">{billingMode === 'rental' ? '초기 비용 없음 / 월 1.9만 원' : '일시불 / 월 비용 없음'}</p>
             <button onClick={onStart} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group">
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
    <>
      {currentPage === 'landing' ? (
        <LandingPage onStart={() => setCurrentPage('dashboard')} />
      ) : (
        <DashboardView onLogout={() => setCurrentPage('landing')} />
      )}
    </>
  );
};

export default App;