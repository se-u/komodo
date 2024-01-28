"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

import { toggleActive } from "@/app/lib/actions";
import { fetchIsVoteActive } from "@/app/lib/data";

export default function ToggleVote() {
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
    <div className="grid grid-cols-2">
      <div className="text-left">Sistem Pemilihan On/Off</div>
      <div className="text-right">
        <Checkbox onChange={handleToggle} defaultChecked={voteActive} />
      </div>
    </div>
  );
}
