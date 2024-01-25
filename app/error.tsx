"use client";

import { useEffect } from "react";
import { BadRequest } from "./components/error-page";

export default function ErrorStatistic({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  let errorCode: string = "";
  if (error.message.includes("request to")) {
    errorCode = "network";
  }

  console.log(errorCode);
  // useEffect(() => {
  //     // Log the error to an error reporting service

  //   }, [error])
  return (
    <div className="bg-white w-full min-h-screen">
      {errorCode === "network" ? <BadRequest /> : <h1>Oops Something Wrong</h1>}
    </div>
  );
}
