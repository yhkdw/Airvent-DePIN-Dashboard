import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const server = createServer(app);
const wss = new WebSocketServer({ server });

// 연결된 클라이언트 (대시보드)
const clients = new Set();

// 최근 노드 데이터 저장
let latestNodeData = {
  connected: false,
  nodeId: null,
  wifi: { ssid: '', signal: 0, connected: false },
  airQuality: { pm25: 0, pm10: 0, aqi: 0, co2: 0, humidity: 0, temp: 0 },
  history: [],
  miningRate: 0,
  lastUpdate: null,
};

// AQI 계산 (PM2.5 기준)
function calcAQI(pm25) {
  const breaks = [0, 12, 35.5, 55.5, 150.5, 250.5, 500.5];
  const aqiBreaks = [0, 50, 100, 150, 200, 300, 500];
  let i = 0;
  while (i < breaks.length - 1 && pm25 > breaks[i + 1]) i++;
  const low = breaks[i];
  const high = breaks[i + 1];
  const aqiLow = aqiBreaks[i];
  const aqiHigh = aqiBreaks[i + 1];
  return Math.round(((aqiHigh - aqiLow) / (high - low)) * (pm25 - low) + aqiLow);
}

// 노드 데이터 수신 API (시뮬레이터용)
app.post('/api/node/upload', (req, res) => {
  const { nodeId, wifi, pm25, pm10, co2, humidity, temp } = req.body;
  
  const aqi = calcAQI(pm25 ?? 0);
  const data = {
    connected: true,
    nodeId: nodeId || 'AVT-NODE-001',
    wifi: wifi || { ssid: 'Airvent_Home', signal: -45, connected: true },
    airQuality: {
      pm25: pm25 ?? Math.floor(Math.random() * 50) + 10,
      pm10: pm10 ?? 0,
      aqi,
      co2: co2 ?? 400,
      humidity: humidity ?? 45,
      temp: temp ?? 22,
    },
    miningRate: 0.004 + Math.random() * 0.002,
    lastUpdate: new Date().toISOString(),
  };

  latestNodeData = {
    ...latestNodeData,
    ...data,
    history: [
      ...(latestNodeData.history || []).slice(-59),
      { time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }), pm25: data.airQuality.pm25, aqi: data.airQuality.aqi },
    ],
  };

  // WebSocket으로 모든 클라이언트에 브로드캐스트
  const msg = JSON.stringify({ type: 'node_data', data: latestNodeData });
  clients.forEach((client) => {
    if (client.readyState === 1) client.send(msg);
  });

  res.json({ ok: true });
});

// 초기 데이터 API
app.get('/api/node/status', (req, res) => {
  res.json(latestNodeData);
});

// WebSocket 연결
wss.on('connection', (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify({ type: 'node_data', data: latestNodeData }));

  ws.on('close', () => clients.delete(ws));
  ws.on('error', () => clients.delete(ws));
});

server.listen(PORT, () => {
  console.log(`Airvent Backend: http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
});
