"use client";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { fetchIsVoteActive } from "@/app/lib/data";
import { toggleActive } from "@/app/lib/actions";

export default function SettingsForm() {
  const [voteActive, setVoteActive] = useState(false);
  const [change, setChange] = useState(false);
  useEffect(() => {
    async function getStatus() {
      const status = await fetchIsVoteActive("");
      setVoteActive(status);
      console.log(status);
    }
    getStatus();
  }, [change]);

  const handleToggle = async () => {
    await toggleActive();
    setChange(!change);
  };
  return (
    <>
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <div className="text-left">Sistem Pemilihan On/Off</div>
          <div className="text-right">
            <input
              type="checkbox"
              className="toggle"
              checked={voteActive}
              onChange={handleToggle}
            />
          </div>
        </div>
      </div>
    </>
  );
}
