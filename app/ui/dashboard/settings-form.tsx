"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
        <div className="grid grid-cols-2 bg-white rounded-2xl shadow p-4">
          <div className="text-left">Sistem Pemilihan On/Off</div>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode"/>
            <Label htmlFor="airplane-mode">Election On/Off</Label>
          </div>
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
