/**
 * Airvent 공기질 노드 시뮬레이터
 * WiFi 연동 시뮬레이션 + 공기질 측정 데이터 전송
 */

const API_URL = process.env.API_URL || 'http://localhost:3001';

const NODE_ID = 'AVT-NODE-3847';
let wifiConnected = false;
let basePM25 = 15;

async function connectWifi() {
  console.log('[WiFi] 연결 시도...');
  await sleep(2000);
  wifiConnected = true;
  console.log('[WiFi] ✓ 연결됨 - Airvent_Home (-45 dBm)');
}

async function measureAirQuality() {
  const variation = (Math.random() - 0.5) * 10;
  const pm25 = Math.max(5, Math.min(80, Math.round(basePM25 + variation)));
  const pm10 = Math.round(pm25 * 1.2 + Math.random() * 10);
  const co2 = 380 + Math.floor(Math.random() * 100);
  const humidity = 40 + Math.floor(Math.random() * 25);
  const temp = 20 + (Math.random() * 6);
  
  return {
    pm25,
    pm10,
    co2,
    humidity: Math.round(humidity),
    temp: Math.round(temp * 10) / 10,
  };
}

async function sendToBackend(airData) {
  try {
    const res = await fetch(`${API_URL}/api/node/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nodeId: NODE_ID,
        wifi: {
          ssid: 'Airvent_Home',
          signal: -45 - Math.floor(Math.random() * 10),
          connected: wifiConnected,
        },
        ...airData,
      }),
    });
    if (res.ok) {
      const t = new Date().toLocaleTimeString('ko-KR');
      console.log(`[${t}] 전송 완료 | PM2.5: ${airData.pm25} μg/m³ | AQI: ${calcAQI(airData.pm25)}`);
    }
  } catch (err) {
    console.error('[오류] 백엔드 연결 실패. backend 서버를 실행했는지 확인하세요.');
    console.error('  → cd backend && npm start');
  }
}

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log('========================================');
  console.log('  Airvent 공기질 노드 시뮬레이터');
  console.log('  WiFi + 공기질 측정 → 백엔드 전송');
  console.log('========================================\n');

  await connectWifi();

  console.log('\n[채굴 시작] 30초마다 데이터 전송...\n');

  while (true) {
    const airData = await measureAirQuality();
    await sendToBackend(airData);
    basePM25 = airData.pm25;
    await sleep(30000);
  }
}

run();
