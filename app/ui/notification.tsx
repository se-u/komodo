"use client";
import { useEffect, useState } from "react";
import { SignalIcon } from "@heroicons/react/16/solid";
import { fetchIsVoteActive } from "../lib/data";

export default function NotificationTop() {
  const [voteActive, setVoteActive] = useState(false);

  const checkVoteStatus = async () => {
    const isActive = await fetchIsVoteActive();
    setVoteActive(isActive);
  };

  useEffect(() => {
    // Initial check when component mounts
    checkVoteStatus();

    // Set up an interval to check the status every, for example, 10 seconds
    const intervalId = setInterval(checkVoteStatus, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 text-white">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li>
          <a>
            <span className="relative flex h-5 w-5">
              <SignalIcon className="animate-ping absolute inline-flex h-full w-full rounded-full text-sky-400 opacity-75"></SignalIcon>
              <SignalIcon className=" relative inline-flex rounded-full h-5 w-5 text-sky-500"></SignalIcon>
            </span>
            Terhubung Sistem
          </a>
        </li>
        <li>
          {voteActive ? (
            <a>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Pemilihan Berlansung
            </a>
          ) : (
            <a>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Pemilihan Berakhir
            </a>
          )}
        </li>
      </ul>{" "}
    </div>
  );
}
