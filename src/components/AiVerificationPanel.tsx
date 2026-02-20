import { useEffect, useMemo, useState } from "react";
import Badge from "./Badge";

type AiEvent = {
  ts: string;
  message: string;
  badge: "INFO" | "WARN" | "PASS";
};

type Step = {
  badge: AiEvent["badge"];
  message: string;
};

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function AiVerificationPanel({
  onReward,
}: {
  onReward: (amount: number) => void;
}) {
  const steps: Step[] = useMemo(
    () => [
      { badge: "INFO", message: "데이터 정상 수집 중..." },
      { badge: "INFO", message: "OpenAI 에이전트가 패턴을 요약 중입니다..." },
      { badge: "WARN", message: "어뷰징/조작 가능성 스캔 중..." },
      { badge: "PASS", message: "검증 완료: 보상 지급 트리거" },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const [confidence, setConfidence] = useState(92);
  const [anomaly, setAnomaly] = useState(7);
  const [events, setEvents] = useState<AiEvent[]>([
    { ts: nowTime(), badge: "INFO", message: "AI 검증 파이프라인 준비 완료" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      const next = (idx + 1) % steps.length;
      setIdx(next);

      // 숫자도 계속 흔들어 “라이브” 느낌
      const c = 88 + Math.floor(Math.random() * 12); // 88~99
      const a = Math.floor(Math.random() * 15); // 0~14
      setConfidence(c);
      setAnomaly(a);

      const step = steps[next];

      // PASS일 때 리워드 지급 (Demo)
      if (step.badge === "PASS") {
        const amt = Math.round((0.03 + Math.random() * 0.05) * 100) / 100; // 0.03~0.08
        onReward(amt);
        step.message = `검증 완료: 보상 +${amt} AiVT 지급`;
      }

      setEvents((prev) => [
        { ts: nowTime(), badge: step.badge, message: step.message },
        ...prev,
      ].slice(0, 6));
    }, 2500);

    return () => clearInterval(t);
  }, [idx, steps, onReward]);

  const cur = steps[idx];

  const badgeTone =
    cur.badge === "PASS" ? "ok" : cur.badge === "WARN" ? "warn" : "info";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">AI DATA VERIFICATION</div>
          <div className="text-lg font-semibold">OpenAI 검증 패널</div>
        </div>
        <Badge tone={badgeTone}>{cur.badge}</Badge>
      </div>

      <div className="mt-3 text-sm text-slate-200">{cur.message}</div>

      {/* 로딩바 애니메이션 느낌 */}
      <div className="mt-3 h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full w-1/2 bg-slate-200/40 animate-pulse" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
          <div className="text-xs text-slate-400">신뢰도(Confidence)</div>
          <div className="text-xl font-semibold">{confidence}%</div>
        </div>
        <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
          <div className="text-xs text-slate-400">어뷰징 스코어(Anomaly)</div>
          <div className="text-xl font-semibold">{anomaly}/100</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-slate-400 mb-2">최근 이벤트</div>
        <div className="space-y-2">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 rounded-xl bg-slate-950/40 border border-slate-800 px-3 py-2"
            >
              <div className="text-sm text-slate-200">
                <span className="text-slate-400 mr-2">{e.ts}</span>
                {e.message}
              </div>
              <div className="text-xs text-slate-400">{e.badge}</div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
