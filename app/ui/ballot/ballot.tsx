"use client";
import { FormEvent, useEffect, useState } from "react";
import style from "./ballot.module.css";
import { fetchCandidates } from "@/app/lib/data";
import { voteCandidate } from "@/app/lib/actions";

export default function Ballot({ uuid }: { uuid: string }) {
  const [candidates, setCandidates] = useState([
    { index: 0, name: "", image: "" },
  ]);
  const [connectedAccount, setConnectedAccount] = useState("null");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await voteCandidate(formData, connectedAccount);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const account : any = localStorage.getItem("connectedAccount");
    setConnectedAccount(account);
    const getCandidates = async () => {
      const candidates = await fetchCandidates();
      // console.log(`candidates: ${candidates[0].count}`);
      setCandidates(candidates);
    };

    getCandidates();
  }, []);
  return (
    <div className={`${style["ballot-bg"]} bg-slate-200`}>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-[#012169] border-b-[5px] inline border-[#F0B323]">
          Voting Sistem
        </h1>
        <h3 className="pt-3 text-xl font-medium text-[#012169]">
          Silahkan pilih jagoanmu !
        </h3>
        <p className="">Klik, Pilih Aman. Demokrasi Milenial</p>
      </div>

      <form onSubmit={handleSubmit} className={style["row"]}>
        <input type="hidden" name="uuid" value={uuid} />
        {candidates.map((candidate) => (
          <div
            className={`${style["card"]} hover:bg-black`}
            key={candidate.index}
          >
            <input
              type="radio"
              name="card-option"
              className={style["card-radio"]}
              value={candidate.index}
              id={`candidate_${candidate.index}`}
            />
            <label
              htmlFor={`candidate_${candidate.index}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('${candidate.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={style["card-label"]}
            >
              {candidate.name}
            </label>
          </div>
        ))}
        <div className="btm-nav glass bg-orange-400 text-gray-300 text-sm hover:bg-orange-500">
          <button type="submit" className="text-black text-lg font-bold">
            KIRIM
          </button>
        </div>
      </form>
    </div>
  );
}
