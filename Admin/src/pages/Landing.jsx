import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const countersConfig = [
	{ label: "Shipments monitored", value: 18420 },
	{ label: "Global depots", value: 62 },
	{ label: "SLA compliance", value: 99, suffix: "%" },
];

const featureCards = [
	{
		icon: "🚛",
		title: "Live Control",
		text: "Command parcels, riders, and statuses in a single dashboard.",
	},
	{
		icon: "🧠",
		title: "Predictive Ops",
		text: "AI-backed alerts flag delays before customers notice.",
	},
	{
		icon: "🔐",
		title: "Enterprise Security",
		text: "Role-based access, audit logs, and encrypted secrets built-in.",
	},
];

const FeatureCard = ({ icon, title, text }) => (
	<div className="relative p-5 transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-100/80 hover:shadow-lg">
		<div className="flex items-center gap-3 mb-3">
			<div className="flex items-center justify-center w-10 h-10 text-xl bg-blue-50 rounded-2xl">
				{icon}
			</div>
			<h3 className="text-base font-semibold text-slate-900">{title}</h3>
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

		const step = (now) => {
			const progress = Math.min((now - start) / duration, 1);
			setCounters(
				countersConfig.map((item) => Math.round(item.value * progress))
			);
			if (progress < 1) requestAnimationFrame(step);
		};

		requestAnimationFrame(step);
	}, []);

	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-50">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(79,70,229,0.15),transparent_45%)]" />

			<div className="relative z-10 max-w-6xl px-6 pt-10 mx-auto">
				<header className="flex items-center justify-between px-6 py-4 mb-12 bg-white border border-white shadow-sm rounded-2xl backdrop-blur">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">
							FMS
						</div>
						<div>
							<p className="text-base font-semibold text-slate-900">Freights Console</p>
							<p className="text-xs text-slate-500">Admin Control Center</p>
						</div>
					</div>
					<div className="items-center hidden gap-6 text-sm font-medium text-slate-500 md:flex">
						<span className="hover:text-slate-900">Product</span>
						<span className="hover:text-slate-900">Security</span>
						<span className="hover:text-slate-900">Docs</span>
					</div>
					<Link
						to="/login"
						className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl bg-slate-900"
					>
						Launch Console
						<svg
							className="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5l7 7-7 7" />
						</svg>
					</Link>
				</header>

				<main className="grid items-center gap-12 pb-16 lg:grid-cols-2">
					<section className="space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase border rounded-full bg-white/80 border-slate-100 text-slate-500">
							<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
							Live Freight Visibility
						</div>
						<div>
							<h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
								Run theenuka logistics with clarity and calm
							</h1>
							<p className="mt-4 text-lg leading-relaxed text-slate-600">
								From parcel assignments to compliance reporting, the FMS admin console keeps every operator in sync. Dispatch faster, mitigate escalations, and deliver with confidence.
							</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-3">
							{countersConfig.map((item, idx) => (
								<div
									key={item.label}
									className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100/80"
								>
									<p className="text-2xl font-bold text-slate-900">
										{counters[idx]}
										{item.suffix || ""}
									</p>
									<p className="mt-1 text-xs font-semibold tracking-[0.2em] text-slate-400">
										{item.label}
									</p>
								</div>
							))}
						</div>
						<div className="flex flex-wrap gap-4">
							<Link
								to="/signup"
								className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-white shadow-lg rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl"
							>
								Create Admin Account
								<svg
									className="w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14" />
									<path d="M12 5l7 7-7 7" />
								</svg>
							</Link>
							<Link
								to="/login"
								className="inline-flex items-center px-8 py-3 font-semibold transition-colors border rounded-2xl text-slate-700 border-slate-200 hover:border-slate-300"
							>
								Sign In
							</Link>
						</div>
						<div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-100/80">
							<p className="text-sm leading-relaxed text-slate-600">
								“FMS became our mission control. Escalations dropped 37% within the first month because everyone finally saw the same truth.”
							</p>
							<p className="mt-2 text-xs font-semibold tracking-widest uppercase text-slate-400">
								Operations Lead · Atlas Freight
							</p>
						</div>
					</section>

					<section className="space-y-6">
						<div className="relative p-8 overflow-hidden bg-white border rounded-[32px] shadow-xl border-slate-100">
							<div className="absolute w-40 h-40 bg-indigo-100 rounded-full -top-10 -right-10 blur-3xl" />
							<img
								src="/hero.png"
								alt="FMS dashboard"
								className="relative w-full shadow-lg rounded-2xl ring-1 ring-slate-200"
							/>
							<div className="grid gap-4 mt-6 sm:grid-cols-2">
								<div className="p-4 border bg-slate-50 border-slate-100 rounded-2xl">
									<p className="text-xs font-semibold text-slate-500">SLA compliance</p>
									<p className="text-2xl font-bold text-slate-900">99.4%</p>
									<p className="text-xs font-semibold text-emerald-500">+4.2% vs last quarter</p>
								</div>
								<div className="p-4 border bg-slate-50 border-slate-100 rounded-2xl">
									<p className="text-xs font-semibold text-slate-500">Incidents auto-resolved</p>
									<p className="text-2xl font-bold text-slate-900">1,284</p>
									<p className="text-xs font-semibold text-emerald-500">-32% escalations</p>
								</div>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							{featureCards.map((card) => (
								<FeatureCard key={card.title} {...card} />
							))}
						</div>
					</section>
				</main>

				<footer className="pb-10 text-xs font-semibold tracking-widest text-center uppercase text-slate-400">
					© {new Date().getFullYear()} Freights Management System · Built for operators
				</footer>
			</div>
		</div>
	);
};

export default Landing;