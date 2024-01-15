// "use client";
import { createAccount } from "../lib/actions";
import { useFormState } from "react-dom";

export default async function Validate() {
  // const initialState = { message: null, errors: {} };

  return (
    <div className="flex justify-center m-12">
      <form action={createAccount}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Masukan Nama Lengkap</span>
          </div>
          <input
            name="name"
            type="text"
            placeholder="Cth: Andika Putra"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Masukan NIK</span>
          </div>
          <input
            name="idCard"
            type="number"
            placeholder="Cth: 332**********34"
            className="input input-bordered w-full max-w-xs"
          />

          <div id="customer-error" aria-live="polite" aria-atomic="true"></div>
        </label>
        <button type="submit" className="my-5 btn glass w-full">
          Check Data
        </button>
      </form>
    </div>
  );
}
