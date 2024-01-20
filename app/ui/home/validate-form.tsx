"use client";
import { navigateBallot, validateVoter } from "@/app/lib/actions";
import { DocumentCheckIcon } from "@heroicons/react/16/solid";
import { FormEvent, useEffect, useState } from "react";

export default function ValidateForm() {
  const [error, setError] = useState({ error: null });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("null");

  useEffect(() => {
    const local:any = localStorage.getItem("connectedAccount");
    setConnectedAccount(local);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await validateVoter(formData, connectedAccount);
      if (response?.error) {
        setError({ error: response.error });
        setLoading(false);
      } else {
        console.log("redirect...");
        // console.log(response);
        navigateBallot(response.uuid);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {error.error !== null ? (
        <div role="alert" className="w-72 alert shadow-lg fixed z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <div>
            <h3 className="font-bold">Maaf :(</h3>
            <div className="text-xs">{error.error}</div>
          </div>
          <button
            onClick={() => setError({ error: null })}
            className="btn btn-sm"
          >
            Mengerti
          </button>
        </div>
      ) : null}
      <div className="flex justify-center m-12 text-white">
        <form onSubmit={handleSubmit}>
          <div className="glass shadow-lg px-8 py-10 rounded-md text-white">
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

          <button type="submit" className="my-5 btn glass w-full">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <DocumentCheckIcon className="w-5" />
            )}
            Check Data
          </button>
        </form>
      </div>
    </>
  );
}
