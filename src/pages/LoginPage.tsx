import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, TEST_EMAIL } from "../auth";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState(TEST_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
        <div className="text-xs text-slate-400">PRIMER AI HACKATHON • Judge Access</div>
        <h1 className="text-2xl font-semibold mt-2">AirVent DePIN Dashboard</h1>
        <p className="text-sm text-slate-300 mt-2">
          심사위원 전용 테스트 계정으로 로그인하세요.
        </p>

        <div className="mt-5 space-y-3">
          <label className="block">
            <div className="text-sm text-slate-300 mb-1">Email</div>
            <input
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-slate-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="judge@primer.kr"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <div className="text-sm text-slate-300 mb-1">Password</div>
            <input
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-slate-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="airvent2026"
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="text-sm text-rose-300 bg-rose-950/40 border border-rose-900 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <button
            className="w-full rounded-xl bg-emerald-500 text-slate-950 font-semibold py-2 hover:bg-emerald-400 transition"
            onClick={() => {
              setError("");
              const ok = login(email, password);
              if (!ok) setError("테스트 계정 정보가 일치하지 않습니다.");
              else nav("/dashboard");
            }}
          >
            Login
          </button>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Test ID: <span className="text-slate-200">{TEST_EMAIL}</span>
            </span>
            <Link to="/" className="hover:text-slate-200">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
