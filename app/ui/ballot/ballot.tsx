"use client";
import { FormEvent, useEffect, useState } from "react";
import style from "./ballot.module.css";
import { deleteCandidate, fetchCandidates } from "@/app/lib/data";
import {
  addCandidate,
  updateCandidate,
  voteCandidate,
} from "@/app/lib/actions";

export default function Ballot({ uuid }) {
  const [candidates, setCandidates] = useState([
    { index: 0, name: "", image: "" },
  ]);

  // Handle Submit Form in Client Component
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await voteCandidate(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Karena ini di client jadi pke useEffect
    // kalau server component kayak table voter
    const getCandidates = async () => {
      const candidates = await fetchCandidates();
      console.log(`candidates: ${candidates[0].count}`);
      setCandidates(candidates);
    };

    const updateCandidateByIndex = async () => {
      const formData = new FormData();
      formData.set("index", "1");
      formData.set("name", "Prabowo Subianto");
      formData.set(
        "image",
        "https://cdnwpseller.gramedia.net/wp-content/uploads/2022/03/01181146/Jokowi.jpg"
      );
      const candidates = await updateCandidate(formData);
      console.log(`update: ${candidates}`);
    };
    // update();

    // Note For Future My Self, Delete Work But Not Make Content Disapear
    const deleteCanditaByIndex = async (index: number) => {
      const candidates = await deleteCandidate(index);
      console.log(`delete: ${candidates}`);
    };

    // deleteCanditaByIndex(3);

    // Add Candidate Using Form Data (require use client)
    const pushCandidate = async () => {
      const formData = new FormData();
      formData.set("name", "B.J Habibie");
      formData.set(
        "image",
        "https://cdnwpseller.gramedia.net/wp-content/uploads/2022/03/01181146/Jokowi.jpg"
      );
      const candidates = await addCandidate(formData);
      console.log(`pushCandidate: ${candidates}`);
    };
    // pushCandidate();

    getCandidates();
  }, []);
  return (
    <div className={style["ballot-bg"]}>
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
          <div className={style["card"]} key={candidate.index}>
            <input
              type="radio"
              name="card-option"
              className={style["card-radio"]}
              value={candidate.index}
              id={`candidate_${candidate.index}`}
            />
            <label
              htmlFor={`candidate_${candidate.index}`}
              className={style["card-label"]}
            >
              {candidate.name}
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn-block">
          Kirim
        </button>
      </form>
    </div>
  );
}
