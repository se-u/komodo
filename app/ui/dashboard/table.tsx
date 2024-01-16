"use client";
import { useEffect, useState } from "react";
import { fetchRemainingTime, fetchVoters } from "../../lib/data";
import { verifyVoter } from "../../lib/actions";
import { Voter } from "../../lib/definition";
export default function VoterTable() {
  const [voters, setVoters] = useState<[Voter]>();
  useEffect(() => {
    const handle = async () => {
      const result = await fetchVoters();
      const time = await fetchRemainingTime();
      console.log(time);
      setVoters(result);
      console.log(result);
    };

    handle();
  }, []);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>NIL</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {voters?.map((voter) => (
              <tr key={voter.index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {/* <img
                          src="/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        /> */}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{voter.name}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{voter.idCard}</td>
                <td>
                  {voter.isVerified ? (
                    <span className="badge badge-accent badge-sm">
                      Verified
                    </span>
                  ) : (
                    <span className="badge badge-secondary badge-sm">
                      Not Verified
                    </span>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                  <form action={verifyVoter.bind(null, voter.account)}>
                    <button className="btn btn-ghost btn-xs">Verify</button>
                  </form>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
}
