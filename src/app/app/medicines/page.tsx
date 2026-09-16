import Link from "next/link";
import { Pill, Plus, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function MedicinesPage() {
  const supabase = await createClient();

  const { data: medications, error } = await supabase
    .from("medications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F7F9FB]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Medicines
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your medication schedule and supply.
            </p>
          </div>

          <Link
            href="/app/medicines/add"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#123B5D] px-4 text-sm font-medium text-white hover:bg-[#0E304A]"
          >
            <Plus size={17} />
            Add medicine
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            Could not load your medicines.
          </div>
        ) : medications && medications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {medications.map((medicine) => (
              <div
                key={medicine.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
                      <Pill size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-950">
                        {medicine.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {medicine.dosage} {medicine.unit} · {medicine.form}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {medicine.frequency === "once"
                      ? "Once daily"
                      : medicine.frequency === "twice"
                        ? "Twice daily"
                        : medicine.frequency === "three"
                          ? "Three times daily"
                          : medicine.frequency === "four"
                            ? "Four times daily"
                            : "As needed"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Schedule</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {medicine.times?.join(", ") || "Not set"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Quantity</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {medicine.quantity}
                    </p>
                  </div>
                </div>

                {medicine.instructions && (
                  <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-500">
                    {medicine.instructions}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
              <Pill size={21} />
            </div>

            <h2 className="mt-4 font-semibold text-slate-900">
              No medicines yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your first medication to start your schedule.
            </p>

            <Link
              href="/app/medicines/add"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#123B5D] px-4 text-sm font-medium text-white hover:bg-[#0E304A]"
            >
              <Plus size={16} />
              Add medicine
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}