import Link from "next/link";
import Header from "@/app/components/header";

function DomainCard({
  href,
  icon,
  title,
  subtitle,
  badge,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-start gap-3 p-5 rounded-xl border border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-3xl">{icon}</span>
        {badge && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>
      </div>
      <span className="text-xs text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Open →
      </span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        {/* Hero */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">
            ProtoDebug
          </h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            A debugging reference for IoT and web prototyping. Pick your domain,
            choose your hardware or tech stack, and find solutions fast.
          </p>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Choose a domain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="IoT / Hardware"
              subtitle="Microcontrollers, sensors, actuators, motor drivers, displays, and communication modules."
            />
            <DomainCard
              href="/web"
              icon="🌐"
              title="Web Development"
              subtitle="React, Next.js, REST APIs, WebSocket — common bugs and fixes."
            />
            <DomainCard
              href="/bots"
              icon="🤖"
              title="Robotics / Bots"
              subtitle="Build guides + debugging for line followers, maze solvers, RC bots, soccer bots, and more."
              badge="Learn + Debug"
            />
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Quick access — popular bots
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Line Follower", href: "/bots/line_follower" },
              { label: "Maze Solver", href: "/bots/maze_solver" },
              { label: "RC Race Bot", href: "/bots/rc_race_bot" },
              { label: "Soccer Bot", href: "/bots/soccer_bot" },
              { label: "Pick & Place", href: "/bots/pick_and_place" },
              { label: "PID Reference", href: "/bots/pid_reference" },
            ].map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
