"use client";
import { FormEvent, Suspense, useContext, useEffect, useState } from "react";
import style from "./ballot.module.css";
import { fetchCandidates } from "@/app/lib/data";
import { voteCandidate } from "@/app/lib/actions";
import { AuthContext } from "@/app/auth-context";

export default function Ballot({ uuid }: { uuid: string }) {
  const [account, _] = useContext(AuthContext);
  const [candidates, setCandidates] = useState([
    { index: 0, name: "", image: "" },
  ]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await voteCandidate(formData, account!!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(`cca : ${account}`);
    const getCandidates = async () => {
      const candidates = await fetchCandidates();
      // console.log(`candidates: ${candidates[0].count}`);
      setCandidates(candidates);
    };

    getCandidates();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <button className="group relative h-12 w-full overflow-hidden rounded-sm bg-gray-600 text-lg shadow">
            <div className="absolute inset-0 w-[0px] bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-white group-hover:text-white">
              Kirim
            </span>
          </button>
        </form>
      </div>
    </Suspense>
  );
}
