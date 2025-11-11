import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const countersConfig = [
  { label: "Shipments Tracked", end: 12843 },
  { label: "Active Users", end: 876 },
  { label: "Avg. Delivery Rate", end: 98, suffix: "%" },
];

const FeatureCard = ({ icon, title, text }) => (
  <div className="group relative overflow-hidden p-5 rounded-xl bg-white/60 backdrop-blur border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-70 group-hover:scale-125 transition-all"></div>
    <div className="flex items-center mb-3 space-x-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <p className="text-sm leading-relaxed text-slate-600">{text}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const Landing = () => {
  const [counters, setCounters] = useState(countersConfig.map(() => 0));
  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounters(countersConfig.map(cfg => Math.round(cfg.end * progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.18),transparent_55%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff)]" />
      {/* Floating orbs */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-14 w-52 h-52 bg-purple-300/30 rounded-full blur-3xl animate-pulse [animation-delay:400ms]" />
      </div>

      <div className="w-full max-w-7xl grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-7">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-white/40">
              <span className="text-white text-2xl font-bold">F</span>
            </div>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">FMS Admin</h1>
              <p className="text-sm font-medium text-blue-600">Freights Management System</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 leading-tight">Operate logistics with confidence & clarity</h2>
          <p className="text-slate-600 text-base max-w-xl">A unified control center for shipments, user governance and performance analytics. Start by signing in or create a secure admin account to unlock the dashboard.</p>

          {/* Counters */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {countersConfig.map((cfg, i) => (
              <div key={cfg.label} className="p-4 rounded-xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {counters[i]}{cfg.suffix || ''}
                </p>
                <p className="text-[11px] tracking-wide font-medium text-slate-500 uppercase">{cfg.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/login" className="group relative inline-flex items-center px-7 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-white transition-opacity" />
            </Link>
            <Link to="/signup" className="inline-flex items-center px-7 py-3 rounded-xl font-semibold bg-white text-blue-700 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all">
              Create Admin Account
            </Link>
          </div>

          {/* Mini Testimonial */}
          <div className="mt-6 p-4 rounded-xl bg-white/60 border border-slate-200 shadow-sm flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">★</div>
            <p className="text-sm text-slate-600"><span className="font-semibold text-slate-800">“Visibility improved our dispatch speed by 24%.”</span> – Ops Lead</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative group w-full max-w-md mx-auto">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src="/hero.png" alt="FMS" className="w-full rounded-2xl shadow-lg ring-1 ring-slate-200/60 group-hover:scale-[1.02] transition-transform" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <FeatureCard icon={<span>🚚</span>} title="Real-time" text="Track freight status live with latency optimized polling." />
            <FeatureCard icon={<span>🔐</span>} title="Secure" text="AES encrypted credentials & JWT based session flow." />
            <FeatureCard icon={<span>📊</span>} title="Analytics" text="Surface shipment KPIs to steer operational decisions." />
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-full flex justify-center">
        <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} FMS Admin • Optimizing global freight</p>
      </div>
    </div>
  );
};

export default Landing;
