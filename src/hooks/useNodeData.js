import { useState, useEffect, useCallback } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || `ws://${window.location.hostname}:3001`;
const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`;

const initialData = {
  connected: false,
  nodeId: null,
  wifi: { ssid: '', signal: 0, connected: false },
  airQuality: { pm25: 0, pm10: 0, aqi: 0, co2: 0, humidity: 0, temp: 0 },
  history: [],
  miningRate: 0,
  lastUpdate: null,
};

export function useNodeData() {
  const [data, setData] = useState(initialData);
  const [wsConnected, setWsConnected] = useState(false);

  const fetchInitial = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/node/status`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.warn('백엔드 연결 없음. 시뮬레이터를 실행하세요.');
      setData((prev) => ({
        ...prev,
        connected: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchInitial();
    let ws;
    const connect = () => {
      ws = new WebSocket(WS_URL);
      ws.onopen = () => setWsConnected(true);
      ws.onclose = () => {
        setWsConnected(false);
        setTimeout(connect, 3000);
      };
      ws.onmessage = (ev) => {
        try {
          const { type, data: payload } = JSON.parse(ev.data);
          if (type === 'node_data') setData(payload);
        } catch (_) {}
      };
      ws.onerror = () => {};
    };
    connect();
    return () => ws?.close();
  }, [fetchInitial]);

  return { data, wsConnected, refetch: fetchInitial };
}
