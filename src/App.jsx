import { useState, useEffect } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

// ============ Mock Data ============
const MOCK_PM25_DATA = [
  { time: '00:00', pm25: 12, fullDate: '2025-02-09 00:00' },
  { time: '02:00', pm25: 15, fullDate: '2025-02-09 02:00' },
  { time: '04:00', pm25: 18, fullDate: '2025-02-09 04:00' },
  { time: '06:00', pm25: 35, fullDate: '2025-02-09 06:00' },
  { time: '08:00', pm25: 42, fullDate: '2025-02-09 08:00' },
  { time: '10:00', pm25: 28, fullDate: '2025-02-09 10:00' },
  { time: '12:00', pm25: 22, fullDate: '2025-02-09 12:00' },
  { time: '14:00', pm25: 19, fullDate: '2025-02-09 14:00' },
  { time: '16:00', pm25: 25, fullDate: '2025-02-09 16:00' },
  { time: '18:00', pm25: 38, fullDate: '2025-02-09 18:00' },
  { time: '20:00', pm25: 31, fullDate: '2025-02-09 20:00' },
  { time: '22:00', pm25: 20, fullDate: '2025-02-09 22:00' },
  { time: '24:00', pm25: 17, fullDate: '2025-02-09 24:00' },
]

const MOCK_TRANSACTIONS = [
  { id: 1, date: '2025-02-09', time: '14:32:18', reward: 12.5, txHash: '0x7a3f...9b2c' },
  { id: 2, date: '2025-02-09', time: '14:02:15', reward: 11.8, txHash: '0x4c2d...1a9e' },
  { id: 3, date: '2025-02-09', time: '13:32:12', reward: 12.1, txHash: '0x9e1b...7f3d' },
  { id: 4, date: '2025-02-09', time: '13:02:09', reward: 11.9, txHash: '0x2a8c...4b6e' },
  { id: 5, date: '2025-02-09', time: '12:32:06', reward: 12.3, txHash: '0x5d3e...8c1a' },
  { id: 6, date: '2025-02-09', time: '12:02:03', reward: 12.0, txHash: '0x1b7f...2e9d' },
  { id: 7, date: '2025-02-09', time: '11:32:00', reward: 11.7, txHash: '0x8a4c...5b3e' },
]

// ============ Components ============

/** 숫자가 올라가는 듯한 카운팅 애니메이션 */
function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime = null
    const startValue = target * 0.7

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (target - startValue) * easeOut)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(target)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

/** 좌측 사이드바 */
function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: '📊', label: '대시보드', active: true },
    { icon: '📱', label: '내 기기' },
    { icon: '💰', label: '보상 내역' },
    { icon: '📈', label: '데이터 분석' },
    { icon: '⚙️', label: '설정' },
  ]

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-depin-card border-r border-depin-border
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-depin-border">
            <h1 className="text-xl font-bold text-gradient">Airvent DePIN</h1>
            <p className="text-depin-muted text-sm mt-1">IoT 공기질 채굴 네트워크</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${item.active
                    ? 'bg-depin-neon-green/10 text-depin-neon-green border border-depin-neon-green/30'
                    : 'text-gray-400 hover:bg-depin-border/50 hover:text-white'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-depin-border">
            <div className="px-4 py-2 text-depin-muted text-sm">
              v1.0.0 MVP
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

/** 상단 헤더 */
function Header({ onMenuToggle }) {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-depin-dark/95 backdrop-blur-md border-b border-depin-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-depin-border/50 text-gray-400 hover:text-white"
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-depin-muted text-sm">
            <span className="w-2 h-2 rounded-full bg-depin-neon-green animate-pulse" />
            네트워크 연결됨
          </div>
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200
              ${isConnected
                ? 'bg-depin-neon-green/20 text-depin-neon-green border border-depin-neon-green/50'
                : 'bg-depin-neon-blue/20 text-depin-neon-blue border border-depin-neon-blue/50 hover:bg-depin-neon-blue/30'
              }
            `}
          >
            {isConnected ? '0x742d...3a9F' : '지갑 연결'}
          </button>
        </div>
      </div>
    </header>
  )
}

/** 상단 카드 - 현재 공기질 */
function AQICard({ aqi = 42 }) {
  const getStatus = (value) => {
    if (value <= 50) return { text: '좋음', color: 'text-depin-neon-green', bg: 'bg-depin-neon-green/20' }
    if (value <= 100) return { text: '보통', color: 'text-yellow-400', bg: 'bg-yellow-400/20' }
    return { text: '나쁨', color: 'text-red-400', bg: 'bg-red-400/20' }
  }
  const status = getStatus(aqi)

  return (
    <div className="bg-depin-card rounded-xl border border-depin-border p-6 hover:border-depin-neon-green/30 transition-colors">
      <p className="text-depin-muted text-sm font-medium mb-2">현재 공기질 (AQI)</p>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-4xl font-bold text-white">{aqi}</span>
          <span className={`ml-2 px-2 py-0.5 rounded text-sm font-medium ${status.bg} ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>
      <p className="text-depin-muted text-xs mt-2">WHO 권장 기준 이하</p>
    </div>
  )
}

/** 상단 카드 - 기기 상태 */
function DeviceStatusCard() {
  return (
    <div className="bg-depin-card rounded-xl border border-depin-border p-6 hover:border-depin-neon-green/30 transition-colors">
      <p className="text-depin-muted text-sm font-medium mb-2">내 기기 상태</p>
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-depin-neon-green opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-depin-neon-green shadow-lg shadow-depin-neon-green/50" />
        </span>
        <span className="text-lg font-semibold text-depin-neon-green">온라인 (Mining 중)</span>
      </div>
      <p className="text-depin-muted text-xs mt-2">Device ID: AVT-3847-2A</p>
    </div>
  )
}

/** 상단 카드 - 채굴된 토큰 */
function TokenCard({ amount = 1240 }) {
  return (
    <div className="bg-depin-card rounded-xl border border-depin-border p-6 hover:border-depin-neon-blue/30 transition-colors">
      <p className="text-depin-muted text-sm font-medium mb-2">채굴된 토큰</p>
      <div className="flex items-baseline gap-1">
        <AnimatedCounter target={amount} duration={2500} />
        <span className="text-xl font-bold text-depin-neon-blue">AVT</span>
      </div>
      <p className="text-depin-muted text-xs mt-2">+12.3 AVT (최근 1시간)</p>
    </div>
  )
}

/** PM2.5 차트 */
function PM25Chart({ data }) {
  return (
    <div className="bg-depin-card rounded-xl border border-depin-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">초미세먼지 (PM2.5) - 24시간</h3>
        <p className="text-depin-muted text-sm">단위: μg/m³</p>
      </div>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#00d4ff' }}
              formatter={(value) => [`${value} μg/m³`, 'PM2.5']}
              labelFormatter={(label, payload) => payload[0]?.payload?.fullDate || label}
            />
            <Area
              type="monotone"
              dataKey="pm25"
              stroke="#00ff88"
              strokeWidth={2}
              fill="url(#pm25Gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/** 최근 채굴 보상 트랜잭션 리스트 */
function TransactionList({ transactions }) {
  return (
    <div className="bg-depin-card rounded-xl border border-depin-border overflow-hidden">
      <div className="p-4 border-b border-depin-border">
        <h3 className="text-lg font-semibold text-white">최근 채굴 보상</h3>
        <p className="text-depin-muted text-sm">실시간 트랜잭션 내역</p>
      </div>
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-depin-dark/50 sticky top-0">
            <tr>
              <th className="text-left py-3 px-4 text-depin-muted text-sm font-medium">날짜</th>
              <th className="text-left py-3 px-4 text-depin-muted text-sm font-medium">시간</th>
              <th className="text-right py-3 px-4 text-depin-muted text-sm font-medium">보상</th>
              <th className="text-left py-3 px-4 text-depin-muted text-sm font-medium hidden sm:table-cell">TX</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-t border-depin-border hover:bg-depin-border/30 transition-colors"
              >
                <td className="py-3 px-4 text-white text-sm">{tx.date}</td>
                <td className="py-3 px-4 text-gray-400 text-sm font-mono">{tx.time}</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-depin-neon-green font-semibold">+{tx.reward} AVT</span>
                </td>
                <td className="py-3 px-4 text-depin-muted text-xs font-mono hidden sm:table-cell">{tx.txHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ Main App ============

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-depin-dark text-white">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* 상단 카드 3개 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AQICard aqi={42} />
                <DeviceStatusCard />
                <TokenCard amount={1240} />
              </div>

              {/* PM2.5 차트 */}
              <PM25Chart data={MOCK_PM25_DATA} />

              {/* 트랜잭션 리스트 */}
              <TransactionList transactions={MOCK_TRANSACTIONS} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
