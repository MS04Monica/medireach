import Link from "next/link";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Cross,
  FileClock,
  HeartPulse,
  Home as HomeIcon,
  MapPin,
  Menu,
  Pill,
  Plus,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/", icon: HomeIcon, active: true },
  { label: "Medicines", href: "/app/medicines", icon: Pill },
  { label: "Reminders", href: "/app/reminders", icon: Bell },
  { label: "History", href: "/app/history", icon: FileClock },
  { label: "Analytics", href: "/app/analytics", icon: TrendingUp },
  { label: "Pharmacies", href: "/app/pharmacies", icon: MapPin },
];

const medications = [
  {
    time: "08:00 AM",
    name: "Vitamin D3",
    dose: "1000 IU",
    status: "Taken",
    statusClass: "bg-emerald-50 text-emerald-700",
  },
  {
    time: "01:00 PM",
    name: "Medicine",
    dose: "After lunch",
    status: "Upcoming",
    statusClass: "bg-blue-50 text-blue-700",
  },
  {
    time: "08:00 PM",
    name: "Medicine",
    dose: "After dinner",
    status: "Upcoming",
    statusClass: "bg-slate-100 text-slate-600",
  },
];

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123B5D] text-white">
            <Cross size={18} strokeWidth={2.5} />
          </div>

          <div>
            <p className="text-[17px] font-semibold tracking-tight text-slate-900">
              MediReach
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Medication care
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  item.active
                    ? "bg-slate-100 text-[#123B5D]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Account
        </p>

        <nav className="space-y-1">
          <Link
            href="/app/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <UserRound size={18} strokeWidth={1.8} />
            Profile
          </Link>

          <Link
            href="/app/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#123B5D] shadow-sm">
            <ShieldCheck size={17} />
          </div>

          <p className="text-xs font-semibold text-slate-800">
            Your health data
          </p>

          <p className="mt-1 text-[11px] leading-4 text-slate-500">
            Kept private and protected with secure account access.
          </p>
        </div>
      </div>
    </aside>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Pill;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell size={18} strokeWidth={1.8} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </button>

              <div className="hidden h-7 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCE8EF] text-xs font-semibold text-[#123B5D]">
                  M
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800">Monica</p>
                  <p className="text-[10px] text-slate-400">Personal account</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:py-9">
            <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <CalendarDays size={14} />
                  Today
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Good morning
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Stay on top of your medicines, reminders and daily health
                  routine.
                </p>
              </div>

              <Link
                href="/app/medicines/add"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#0E304A]"
              >
                <Plus size={17} />
                Add medicine
              </Link>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={Pill}
                label="Today's doses"
                value="1 / 3"
                detail="1 dose completed today"
              />

              <StatCard
                icon={Activity}
                label="Adherence"
                value="92%"
                detail="Excellent consistency this week"
              />

              <StatCard
                icon={HeartPulse}
                label="Active medicines"
                value="4"
                detail="Across 3 daily schedules"
              />

              <StatCard
                icon={Clock3}
                label="Next dose"
                value="1:00 PM"
                detail="Medicine · after lunch"
              />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      <p>Here&apos;s your medication overview</p>      
                     </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Monday, September 14
                    </p>
                  </div>

                  <Link
                    href="/app/reminders"
                    className="flex items-center gap-1 text-xs font-medium text-[#123B5D] hover:underline"
                  >
                    View schedule
                    <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {medications.map((medication, index) => (
                    <div
                      key={`${medication.time}-${medication.name}`}
                      className="flex items-center gap-4 px-5 py-5 sm:px-6"
                    >
                      <div className="w-16 shrink-0 text-xs font-medium text-slate-400">
                        {medication.time}
                      </div>

                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
                        <Pill size={18} strokeWidth={1.7} />

                        {index < medications.length - 1 && (
                          <span className="absolute left-1/2 top-10 hidden h-10 w-px bg-slate-200 sm:block" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {medication.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {medication.dose}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${medication.statusClass}`}
                      >
                        {medication.status}
                      </span>

                      {medication.status === "Upcoming" && (
                        <button
                          type="button"
                          className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:block"
                        >
                          Take
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                      <Pill size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        Refill reminder
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        One medicine is running low. Consider checking your
                        remaining supply.
                      </p>

                      <Link
                        href="/app/medicines"
                        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-800"
                      >
                        Review medicines
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#123B5D] p-5 text-white sm:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <MapPin size={19} />
                  </div>

                  <h2 className="mt-5 text-sm font-semibold">
                    Need a pharmacy?
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Find nearby pharmacies and plan your next refill.
                  </p>

                  <Link
                    href="/app/pharmacies"
                    className="mt-5 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#123B5D]"
                  >
                    Find nearby
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={17} className="text-[#123B5D]" />
                    <h2 className="text-sm font-semibold text-slate-900">
                      Weekly adherence
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Your medication routine is looking consistent.
                  </p>
                </div>

                <Link
                  href="/app/analytics"
                  className="flex items-center gap-1 text-xs font-medium text-[#123B5D]"
                >
                  View analytics
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-4">
                {[
                  ["Mon", "100%"],
                  ["Tue", "100%"],
                  ["Wed", "86%"],
                  ["Thu", "100%"],
                  ["Fri", "86%"],
                  ["Sat", "100%"],
                  ["Sun", "92%"],
                ].map(([day, value]) => (
                  <div key={day} className="text-center">
                    <div className="mx-auto flex h-20 items-end justify-center rounded-lg bg-slate-50 p-2 sm:h-24">
                      <div
                        className="w-full max-w-5 rounded-md bg-[#123B5D]"
                        style={{ height: value }}
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-slate-400">
                      {day}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}