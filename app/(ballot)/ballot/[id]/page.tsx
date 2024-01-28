"use client";
import { fetchCandidates, fetchVotersById } from "@/app/lib/data";
import { FormEvent, Suspense, useContext, useEffect, useState } from "react";
import style from "./ballot.module.css";
import { voteCandidate } from "@/app/lib/actions";
import { AuthContext } from "@/app/auth-context";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export function Ballot({ uuid }: { uuid: string }) {
  const [account, _] = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
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
    <div className="min-h-screen px-24 pt-24">
      <div
        className="absolute inset-x-0 -top-40 -z-30 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div
        className="absolute -right-40  -top-20 -z-20 transform-gpu"
        aria-hidden="true"
      >
        <img className="w-96 opacity-50" src="/mega-mendung.svg" />
      </div>

      <div
        className="absolute -left-40  -top-20 -z-20 transform-gpu"
        aria-hidden="true"
      >
        <img className="w-96 opacity-50" src="/mega-mendung.svg" />
      </div>

      <div
        className="absolute -bottom-20  -left-40 -z-20 transform-gpu"
        aria-hidden="true"
      >
        <img className="w-96 opacity-50" src="/batik.svg" />
      </div>

      <div
        className="absolute -bottom-20  -right-40 -z-20 transform-gpu"
        aria-hidden="true"
      >
        <img className="-scale-x-1 w-96 opacity-50" src="/batik.svg" />
      </div>

      <div className="mb-4 text-center">
        <h1 className="inline border-b-[5px] border-[#F0B323] text-4xl font-bold  ">
          Silahkan pilih jagoanmu !
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-wrap justify-center gap-5"
      >
        <input type="hidden" name="uuid" value={uuid} />
        {candidates.map((candidate) => (
          <div
            style={{
              position: "relative",
              width: "300px",
              borderRadius: "10px",
              alignItems: "center",
              overflow: "hidden",
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
              textAlign: "justify",
            }}
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
              className={`${style["card-label"]} text-balance text-xl`}
            >
              {candidate.name}
            </label>
          </div>
        ))}
        <section className="fixed bottom-14">
          <Button className="h-12 w-80 text-lg">
            <PaperPlaneIcon className="mx-1" /> KIRIM SUARA
          </Button>
        </section>
      </form>
    </div>
  );
}

const VerificationLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-black dark:border-slate-50"></div>
        <p className="text-xl font-semibold">Menunggu Verifikasi</p>
        <p className="mt-2 text-lg text-gray-500">
          Jika Dalam 1 Menit Tidak Terverifikasi Sialah Hubungi Petugas
        </p>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [voter, setVoter] = useState({
    isRegistered: false,
    isVerified: false,
    id: "any",
    name: "any",
    idCard: "any",
    account: "any",
  });
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const voter: any = await fetchVotersById(params.id);
      setVoter(voter);
    };

    // Fetch data initially
    fetchData();
    // Set up interval to fetch data every 1 second
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [params.id]);

  return (
    <>{!voter?.isVerified ? <VerificationLoading /> : <Ballot uuid={id} />}</>
  );
}
