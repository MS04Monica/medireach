"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Clock3, Loader2, Pill, Plus } from "lucide-react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const medicationSchema = z.object({
  name: z.string().trim().min(2, "Enter the medicine name."),
  dosage: z.string().trim().min(1, "Enter the dosage."),
  unit: z.string().min(1, "Select a dosage unit."),
  form: z.string().min(1, "Select a medicine form."),
  frequency: z.string().min(1, "Select a frequency."),
  startDate: z.string().min(1, "Select a start date."),
  endDate: z.string().optional(),
  quantity: z.coerce.number().int().min(1, "Enter the available quantity."),
  refillThreshold: z.coerce
    .number()
    .int()
    .min(0, "Refill threshold cannot be negative."),
  instructions: z
    .string()
    .trim()
    .max(300, "Keep instructions under 300 characters."),
});

type FormErrors = Partial<
  Record<keyof z.infer<typeof medicationSchema> | "times", string>
>;

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10";

const selectClass =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10";

const frequencies = [
  { value: "once", label: "Once daily" },
  { value: "twice", label: "Twice daily" },
  { value: "three", label: "Three times daily" },
  { value: "four", label: "Four times daily" },
  { value: "as-needed", label: "As needed" },
];

function getDefaultTime(index: number) {
  const defaults = ["08:00", "13:00", "20:00", "22:00"];
  return defaults[index] ?? "08:00";
}

export default function MedicationForm() {
  const [frequency, setFrequency] = useState("once");
  const [times, setTimes] = useState(["08:00"]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleFrequencyChange(value: string) {
    setFrequency(value);

    const nextLength =
      value === "once"
        ? 1
        : value === "twice"
          ? 2
          : value === "three"
            ? 3
            : value === "four"
              ? 4
              : 1;

    setTimes((current) =>
      Array.from(
        { length: nextLength },
        (_, index) => current[index] ?? getDefaultTime(index),
      ),
    );
  }

  function handleTimeChange(index: number, value: string) {
    setTimes((current) =>
      current.map((time, timeIndex) =>
        timeIndex === index ? value : time,
      ),
    );
  }

  async function handleSubmit(formData: FormData): Promise<void> {
    setErrors({});
    setIsSubmitting(true);

    const result = medicationSchema.safeParse({
      name: formData.get("name"),
      dosage: formData.get("dosage"),
      unit: formData.get("unit"),
      form: formData.get("form"),
      frequency,
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate") || undefined,
      quantity: formData.get("quantity"),
      refillThreshold: formData.get("refillThreshold"),
      instructions: formData.get("instructions") ?? "",
    });

    if (!result.success) {
      const nextErrors: FormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      setIsSubmitting(false);
      return;
    }

    if (times.some((time) => !time)) {
      setErrors({
        times: "Set a time for every scheduled dose.",
      });
      setIsSubmitting(false);
      return;
    }

    if (
      result.data.endDate &&
      result.data.endDate < result.data.startDate
    ) {
      setErrors({
        endDate: "End date must be after the start date.",
      });
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.from("medications").insert({
      name: result.data.name,
      dosage: Number(result.data.dosage),
      unit: result.data.unit,
      form: result.data.form,
      frequency: result.data.frequency,
      times,
      start_date: result.data.startDate,
      end_date: result.data.endDate || null,
      quantity: result.data.quantity,
      refill_threshold: result.data.refillThreshold,
      instructions: result.data.instructions || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);

      setErrors({
        instructions: "Could not save the medication. Please try again.",
      });

      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Check size={26} strokeWidth={2.2} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
            Medicine added
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Your medication has been added to your MediReach schedule.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/app/medicines"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#123B5D] px-5 text-sm font-medium text-white hover:bg-[#0E304A]"
            >
              View medicines
            </Link>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Add another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
            <Pill size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Medication details
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Enter the medicine exactly as it appears on your prescription or
              packaging.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-xs font-semibold text-slate-700"
            >
              Medicine name <span className="text-rose-500">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Paracetamol"
              className={inputClass}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-rose-600">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="dosage"
                className="text-xs font-semibold text-slate-700"
              >
                Dosage <span className="text-rose-500">*</span>
              </label>

              <div className="mt-2 grid grid-cols-[1fr_7rem] gap-2">
  <input
    id="dosage"
    name="dosage"
    type="number"
    min="0"
    step="any"
    placeholder="500"
    className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10"
  />

  <select
    id="unit"
    name="unit"
    defaultValue="mg"
    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10"
  >
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="mcg">mcg</option>
                  <option value="ml">mL</option>
                  <option value="IU">IU</option>
                </select>
              </div>

              {errors.dosage && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.dosage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="form"
                className="text-xs font-semibold text-slate-700"
              >
                Medicine form <span className="text-rose-500">*</span>
              </label>

              <select
                id="form"
                name="form"
                defaultValue="tablet"
                className={selectClass}
              >
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup</option>
                <option value="injection">Injection</option>
                <option value="drops">Drops</option>
                <option value="inhaler">Inhaler</option>
                <option value="cream">Cream</option>
                <option value="other">Other</option>
              </select>

              {errors.form && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.form}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D]">
            <Clock3 size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Schedule
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Set when MediReach should remind you to take this medicine.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="frequency"
              className="text-xs font-semibold text-slate-700"
            >
              Frequency <span className="text-rose-500">*</span>
            </label>

            <select
              id="frequency"
              name="frequency"
              value={frequency}
              onChange={(event) =>
                handleFrequencyChange(event.target.value)
              }
              className={selectClass}
            >
              {frequencies.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-700">
              Dose time{times.length > 1 ? "s" : ""}
            </p>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {times.map((time, index) => (
                <div key={index}>
                  <label
                    htmlFor={`time-${index}`}
                    className="mb-1.5 block text-[11px] font-medium text-slate-400"
                  >
                    Dose {index + 1}
                  </label>

                  <input
                    id={`time-${index}`}
                    name={`time-${index}`}
                    type="time"
                    value={time}
                    onChange={(event) =>
                      handleTimeChange(index, event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10"
                  />
                </div>
              ))}
            </div>

            {errors.times && (
              <p className="mt-1.5 text-xs text-rose-600">
                {errors.times}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="text-xs font-semibold text-slate-700"
              >
                Start date <span className="text-rose-500">*</span>
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className={inputClass}
              />

              {errors.startDate && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="text-xs font-semibold text-slate-700"
              >
                End date
              </label>

              <input
                id="endDate"
                name="endDate"
                type="date"
                className={inputClass}
              />

              {errors.endDate && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Supply & refill
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            MediReach can use this information to warn you before your medicine
            runs low.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="quantity"
              className="text-xs font-semibold text-slate-700"
            >
              Current quantity <span className="text-rose-500">*</span>
            </label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="30"
              className={inputClass}
            />

            {errors.quantity && (
              <p className="mt-1.5 text-xs text-rose-600">
                {errors.quantity}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="refillThreshold"
              className="text-xs font-semibold text-slate-700"
            >
              Refill when remaining
            </label>

            <input
              id="refillThreshold"
              name="refillThreshold"
              type="number"
              min="0"
              defaultValue="5"
              className={inputClass}
            />

            {errors.refillThreshold && (
              <p className="mt-1.5 text-xs text-rose-600">
                {errors.refillThreshold}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Instructions
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Add useful instructions such as “after food” or “with water”.
          </p>
        </div>

        <textarea
          id="instructions"
          name="instructions"
          rows={4}
          maxLength={300}
          placeholder="e.g. Take after breakfast with a glass of water."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10"
        />

        {errors.instructions && (
          <p className="mt-1.5 text-xs text-rose-600">
            {errors.instructions}
          </p>
        )}
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-6 text-sm font-medium text-white shadow-sm transition hover:bg-[#0E304A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Adding medicine...
            </>
          ) : (
            <>
              <Plus size={17} />
              Add medicine
            </>
          )}
        </button>
      </div>
    </form>
  );
}