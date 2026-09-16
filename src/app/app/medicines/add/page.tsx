import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MedicationForm from "@/components/medicines/medication-form";

export default function AddMedicinePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/app/medicines"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to medicines
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Medication management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Add a medicine
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Add the medication, dosage, schedule, and refill details you want
            MediReach to track.
          </p>
        </div>

        <MedicationForm />
      </div>
    </main>
  );
}
