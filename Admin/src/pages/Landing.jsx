import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const countersConfig = [
  { label: "Shipments Tracked", end: 12843 },
  { label: "Active Users", end: 876 },
  { label: "Avg. Delivery Rate", end: 98, suffix: "%" },
];

const FeatureCard = ({ icon, title, text }) => (
  <div className="relative p-6 overflow-hidden transition-all duration-300 border shadow-sm group rounded-2xl bg-white/80 backdrop-blur-sm border-slate-200/80 hover:shadow-lg hover:border-slate-300/80">
    <div className="absolute w-32 h-32 transition-all duration-500 rounded-full opacity-0 -top-10 -right-10 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl group-hover:opacity-100"></div>
    <div className="flex items-start gap-4 mb-3">
      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-transform duration-300 shadow-md rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:scale-105">{icon}</div>
      <div>
        <h3 className="mb-1 text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{text}</p>
      </div>
    </div>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const Landing = () => {
  // Animated counters
  const [counters, setCounters] = useState(countersConfig.map(() => 0));
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounters(countersConfig.map((cfg) => Math.round(cfg.end * progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 py-16">
      {/* Softer, lighter gradient backdrop */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(99,102,241,0.08),transparent_50%),linear-gradient(to_bottom_right,#ffffff,#f6f9ff)]" />
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-40 h-40 rounded-full top-1/3 left-10 bg-blue-200/20 blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-14 w-52 h-52 bg-indigo-200/20 rounded-full blur-2xl animate-pulse [animation-delay:400ms]" />
      </div>

      <div className="grid items-center w-full gap-12 max-w-7xl lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 shadow-lg rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">
              <span className="text-3xl font-bold text-white">F</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">FMS Admin</h1>
              <p className="text-sm font-medium text-blue-600 mt-0.5">Freights Management System</p>
            </div>
          </div>
          <h2 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl text-slate-900">Operate logistics with confidence & clarity</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600">A unified control center for shipments, user governance and performance analytics. Start by signing in or create a secure admin account to unlock the dashboard.</p>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {countersConfig.map((cfg, i) => (
              <div key={cfg.label} className="p-5 text-center transition-shadow border shadow-sm rounded-xl bg-white/90 backdrop-blur border-slate-200/60 hover:shadow-md">
                <p className="mb-1 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                  {counters[i]}{cfg.suffix || ''}
                </p>
                <p className="text-xs font-medium tracking-wide uppercase text-slate-500">{cfg.label}</p>
              </div>
            ))}
          </div>

          return (
            <div className="relative min-h-screen overflow-hidden bg-slate-50">
              {/* Gradient backdrop + subtle grid */}
              <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.12),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.10),transparent_55%),linear-gradient(135deg,#fdfcff,#eef4ff)]" />
              <div className="absolute inset-0 -z-10 opacity-80 bg-[url('data:image/svg+xml,%3Csvg width=\'130\' height=\'130\' viewBox=\'0 0 130 130\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect opacity=\'0.03\' width=\'130\' height=\'130\' fill=\'%230F172A\'/%3E%3C/svg%3E')]" />

              {/* Header */}
              <header className="relative z-10 px-6 pt-8">
                <nav className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto border border-white shadow-sm rounded-2xl bg-white/80 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">F</div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">FMS Admin</p>
                      <p className="text-xs text-slate-500">Freights Management System</p>
                    </div>
                  </div>
                  <div className="items-center hidden gap-8 text-sm font-medium md:flex text-slate-600">
                    <span className="transition-colors cursor-pointer hover:text-slate-900">Product</span>
                    <span className="transition-colors cursor-pointer hover:text-slate-900">Customers</span>
                    <span className="transition-colors cursor-pointer hover:text-slate-900">Security</span>
                    <span className="transition-colors cursor-pointer hover:text-slate-900">Docs</span>
                  </div>
                  <Link to="/login" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors rounded-xl bg-slate-900 hover:bg-slate-800">
                    Launch Console
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </nav>
              </header>

              <main className="relative z-10 px-6 py-16">
                <div className="grid items-center max-w-6xl gap-12 mx-auto lg:grid-cols-12">
                  {/* Left Column */}
                  <div className="space-y-8 lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-white border rounded-full shadow-sm border-slate-100 text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Trusted logistics control center
                    </div>
                    <div>
                      <h1 className="max-w-2xl text-4xl font-bold leading-snug md:text-5xl text-slate-900">Operate logistics with confidence & clarity</h1>
                      <p className="max-w-2xl mt-4 text-lg leading-loose text-slate-600">Orchestrate shipments, teams, and customer communications from a single secure workspace. Every parcel event, SLA alert, and KPI is streamed live for your ops team.</p>
                    </div>

                    {/* Counters */}
                    <div className="grid grid-cols-3 gap-4">
                      {countersConfig.map((cfg, i) => (
                        <div key={cfg.label} className="p-5 border border-white shadow-sm rounded-2xl bg-white/85 backdrop-blur">
                          <p className="text-3xl font-bold text-slate-900">
                            {counters[i]}{cfg.suffix || ''}
                          </p>
                          <p className="text-xs font-semibold tracking-wide uppercase text-slate-400">{cfg.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link to="/signup" className="group relative inline-flex items-center px-8 py-3.5 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        <span className="relative z-10">Create Admin Account</span>
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link to="/login" className="inline-flex items-center px-8 py-3.5 rounded-2xl font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
                        Sign In
                      </Link>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-white border shadow-sm rounded-2xl border-white/80">
                      <div className="flex items-center justify-center w-12 h-12 font-semibold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">★</div>
                      <div>
                        <p className="text-sm leading-relaxed text-slate-600">“Visibility improved our dispatch speed by 24% while cutting escalations in half.”</p>
                        <p className="text-xs font-semibold text-slate-400">OPS LEAD · GLOBAL FREIGHT NETWORK</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-widest uppercase text-slate-400">
                      <span>ISO 27001 Ready</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span>Real-time status streaming</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span>Audit friendly exports</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6 lg:col-span-5">
                    <div className="relative w-full rounded-[32px] bg-white shadow-xl border border-white p-8">
                      <div className="absolute w-32 h-32 rounded-full -top-6 -right-6 bg-indigo-200/40 blur-3xl" />
                      <img src="/hero.png" alt="FMS" className="relative w-full shadow-lg rounded-2xl ring-1 ring-slate-200" />
                      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                        <div className="p-4 border rounded-xl bg-slate-50 border-slate-100">
                          <p className="mb-1 text-xs font-semibold text-slate-400">Avg. SLA compliance</p>
                          <p className="text-2xl font-bold text-slate-900">99.45%</p>
                          <p className="text-xs font-semibold text-emerald-500">+4.2% vs last month</p>
                        </div>
                        <div className="p-4 border rounded-xl bg-slate-50 border-slate-100">
                          <p className="mb-1 text-xs font-semibold text-slate-400">Incidents auto-resolved</p>
                          <p className="text-2xl font-bold text-slate-900">1,284</p>
                          <p className="text-xs font-semibold text-emerald-500">-32% escalations</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <FeatureCard icon={<span>🚚</span>} title="Real-time" text="Latency-optimized polling streams parcel events without lag." />
                      <FeatureCard icon={<span>🔐</span>} title="Secure" text="AES encrypted credentials, role-based controls, and JWTs." />
                      <FeatureCard icon={<span>📊</span>} title="Analytics" text="Surface KPIs, SLA drift, and cost per route instantly." />
                    </div>
                  </div>
                </div>
              </main>

              <footer className="relative z-10 pb-8">
                <p className="text-center text-[11px] text-slate-400">© {new Date().getFullYear()} FMS Admin · Optimizing global freight</p>
              </footer>
            </div>
          );
