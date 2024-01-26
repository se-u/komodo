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
          <section
            id="bottom-navigation"
            className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
          >
            <div id="tabs" className="flex justify-between">
              <button
                type="submit"
                className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 42 42"
                  className="inline-block mb-1"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path
                      d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z"
                      fill="currentColor"
                      fill-opacity="0.1"
                    ></path>
                    <path
                      d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="currentColor"
                      fill-opacity="0.1"
                    ></path>
                    <rect
                      fill="currentColor"
                      transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) "
                      x="17"
                      y="10.3137085"
                      width="30"
                      height="2"
                      rx="1"
                    ></rect>
                    <rect
                      fill="currentColor"
                      transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) "
                      x="-3"
                      y="10.3137085"
                      width="30"
                      height="2"
                      rx="1"
                    ></rect>
                  </g>
                </svg>
                <span className="tab tab-home block text-xs">Kirim</span>
              </button>
            </div>
          </section>
        </form>
      </div>
    </Suspense>
  );
}
