"use client";
import { deployedAddress } from "@/app/lib/utils";
import { FormEvent, Suspense, useContext, useEffect, useState } from "react";
import style from "./ballot.module.css";
import Web3, { ContractExecutionError } from "web3";
import abi from "@/artifacts/contracts/Election.sol/Election.json";
import { fetchCandidates } from "@/app/lib/data";
import { useRouter } from "next/navigation";

const VerificationLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="">
        <div className="animate-spin inline-block w-12 h-12 border-t-4 border-black border-solid rounded-full"></div>
        <p className="text-xl font-semibold">Menunggu Verifikasi</p>
      </div>
    </div>
  );
};

export default function Page() {
  // Metamask
  const [walletAddress, setWalletAddress] = useState("");
  const [verified, setVerified] = useState(false);

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
  // End Metamask

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();

    const methodVerify = async () => {
      // Contract
      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
      const contract: any = new web3.eth.Contract(abi.abi, deployedAddress);
      try {
        const isAlreadyRegister: any = await contract.methods
          .chainVoter(walletAddress)
          .call({
            from: walletAddress,
            gas: 1000000,
            gasPrice: "10000000000",
          });
        // console.log();
        setVerified(isAlreadyRegister);
      } catch (error) {
        if (error instanceof ContractExecutionError) {
          console.log(error.innerError.message);
        }
        console.log(error);
      }

      // End Contract
    };
    methodVerify();
  }, [walletAddress]);

  // const [voter, setVoter] = useState({
  //   isRegistered: "any",
  //   isVerified: false,
  //   id: "any",
  //   name: "any",
  //   idCard: "any",
  //   account: "any",
  // });
  // const id = params.id;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const voter: any = await fetchVotersById(params.id);
  //     setVoter(voter);
  //   };

  //   // Fetch data initially
  //   fetchData();
  //   // Set up interval to fetch data every 1 second
  //   const intervalId = setInterval(fetchData, 1000);
  //   return () => clearInterval(intervalId);
  // }, [params.id]);

  return (
    <>
      {!verified ? (
        <VerificationLoading />
      ) : (
        <Ballot walletAddress={walletAddress} />
      )}{" "}
    </>
  );
}

function Ballot(walletAddress: any) {
  const [kirim, setKirim] = useState(false);
  const [candidates, setCandidates] = useState([
    { index: 0, name: "", image: "" },
  ]);

  const router = useRouter();

  const [candidateInput, setCandidateInput] = useState("");
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     // Contract
  //     const web3 = new Web3(
  //       new Web3.providers.HttpProvider("http://localhost:7545")
  //     );
  //     const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
  //     const receipt: any = await myContract.methods.vote(0).send({
  //       from: walletAddress,
  //       gas: 1000000,
  //       gasPrice: "10000000000",
  //     });
  //     console.log(myContract.events.VoterRegistered);
  //     console.log("Transaction Hash: " + receipt.transactionHash);
  //     // return receipt.events.Voted.returnValues;
  //   } catch (error) {
  //     if (error instanceof ContractExecutionError) {
  //       console.log(error.innerError.message);
  //       return { error: error.innerError.message };
  //     }
  //     console.log(error);
  //     return { error: "Ops Ada kesalahan" };
  //   }
  //   // redirect("/thanks");
  // };

  const handleClick = async () => {
    setKirim(true);

    try {
      // Contract
      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
      const myContract: any = new web3.eth.Contract(abi.abi, deployedAddress);
      const receipt: any = await myContract.methods.vote(candidateInput).send({
        from: walletAddress.walletAddress,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log(myContract.events.VoterRegistered);
      console.log("Transaction Hash: " + receipt.transactionHash);
      router.push("/thanks");
    } catch (error) {
      if (error instanceof ContractExecutionError) {
        alert(error.innerError.message);
        return { error: error.innerError.message };
      }
      console.log(error);
      return { error: "Ops Ada kesalahan" };
    }
  };

  useEffect(() => {
    // console.log(`cca : ${account}`);
    // const getCandidates = async () => {
    //   try {
    //     // Contract
    //     const web3 = new Web3(
    //       new Web3.providers.HttpProvider("http://localhost:7545")
    //     );
    //     const contract: any = new web3.eth.Contract(abi.abi, deployedAddress);
    //     try {
    //       const cand: any = await contract.methods.fetchCandidates().call({
    //         from: walletAddress,
    //         gas: 1000000,
    //         gasPrice: "10000000000",
    //       });
    //       setCandidates(cand);
    //       console.log(cand);
    //     } catch (error) {
    //       if (error instanceof ContractExecutionError) {
    //         console.log(error.innerError.message);
    //       }
    //       console.log(error);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    const test = async () => {
      const candidates = await fetchCandidates();
      setCandidates(candidates);
    };
    // };
    // getCandidates();
    test();
  }, [walletAddress]);
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

        <form onSubmit={(e) => e.preventDefault()} className={style["row"]}>
          {/* <input type="hidden" name="uuid" value={uuid} /> */}
          {candidates.map((candidate) => (
            <div
              className={`${style["card"]} hover:bg-black`}
              key={candidate.index}
            >
              <input
                type="radio"
                onChange={(e) => setCandidateInput(e.target.value)}
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
          <button
            disabled={kirim}
            onClick={() => handleClick()}
            className="group relative h-12 w-full overflow-hidden rounded-sm bg-gray-600 text-lg shadow"
          >
            <div className="absolute inset-0 w-[0px] bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-white group-hover:text-white">
              {kirim ? "Sedang mengirim" : "kirim"}
            </span>
          </button>
        </form>
      </div>
    </Suspense>
  );
}
