"use client";
import { validateVoter } from "@/app/lib/actions";
import { DocumentCheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ValidateForm() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center m-12">
      <form action={validateVoter}>
        <div className="glass shadow-lg px-8 py-10 rounded-md">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nama</span>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Cth: Andika Putra"
              required
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              <span className="label-text-alt">
                *Masukan nama sesuai dengan KTP
              </span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Masukan NIK</span>
            </div>
            <input
              name="idCard"
              type="number"
              required
              placeholder="Cth: 332**********34"
              className="input input-bordered w-full max-w-xs"
            />

            <div
              id="customer-error"
              aria-live="polite"
              aria-atomic="true"
            ></div>
            <div className="label">
              <span className="label-text-alt">
                *Masukan NIK sesuai dengan KTP
              </span>
            </div>
          </label>
        </div>

        <button
          onClick={() => setLoading(true)}
          type="submit"
          className="my-5 btn glass w-full"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <DocumentCheckIcon className="w-5" />
          )}
          Check Data
        </button>
      </form>
    </div>
  );
}
