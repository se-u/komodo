"use client";
import { fetchCredential } from "@/app/lib/data";
import { useCallback, useState } from "react";
// import { createAccount } from "../lib/actions";
import { useFormState } from "react-dom";
export type Credential = {
  isRegistered: boolean;
  isVerified: boolean;
  name: string;
  idCard: string;
  account: string;
};

export default function Status() {
  const [credential, setCredential] = useState(null);
  const _fetchCredential = useCallback(async () => {
    const result = await fetchCredential();
    console.log(result);
    setCredential(result);
  }, []);
  _fetchCredential();
  return (
    <div className="flex justify-center m-12">
      <div className="card w-96 glass">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{credential?.name.toUpperCase()}</h2>
          <p>{credential?.idCard}</p>
          <div className="card-actions justify-end">
            {credential?.isVerified ? (
              <button className="btn btn-primary"></button>
            ) : (
              <div className="badge badge-warning gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Silahkan Melakukan Verifikasi
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
