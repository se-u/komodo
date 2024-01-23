"use client";

import { useEffect } from "react";

export default function ErrorStatistic({
  error,
  reset,
}: {
  error: Error & { digest?: string;},reset: () => void 
}) {
    let errorCode: string = "";
    if (error.message.includes("request to")){
        errorCode = "network";
    }

    console.log(errorCode)
    // useEffect(() => {
    //     // Log the error to an error reporting service
     
    //   }, [error])
  return (  <div>
    <h2>Something went wrong!</h2>
    <button
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
    >
      Try again
    </button>
  </div>);
}
