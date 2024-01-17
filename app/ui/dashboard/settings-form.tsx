"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { CalendarIcon } from "@heroicons/react/24/outline";

import { fetchRemainingTime } from "@/app/lib/data";
import { updateRemainingTime } from "@/app/lib/data";

function generateMinute(startDate: Date, endDate: Date) {
  const selisihWaktu = endDate - startDate;
  const selisihMenit = Math.floor(selisihWaktu / (1000 * 60));
  return selisihMenit;
}

export default function SettingsForm() {
  const [minute, setMinute] = useState(0);
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate: Date = new Date();
    const endDate: Date = e.target.valueAsDate!;
    const dateInMinute = generateMinute(startDate, endDate);
      setMinute(dateInMinute);
  };
  
  
  useEffect(() => {
    const remainingTime = async () => {
      const time = await fetchRemainingTime();
      // const update = updateRemainingTime(1);
      console.log(time);
    };
    remainingTime();
  });

  return (
    <>
      <form>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="date"
                  name="date"
                  type="date"
                  placeholder="date"
                  onChange={handleDate}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* NIK  */}
          {/* <div className="mb-4">
                <label
                  htmlFor="idCard"
                  className="mb-2 block text-sm font-medium"
                >
                  NIK
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="idCard"
                      name="idCard"
                      type="number"
                      placeholder="Masukan NIK"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
              </div> */}

          {/* Verified Status */}
          {/* <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                  Set the Verify status
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input
                        id="pending"
                        name="status"
                        type="radio"
                        value="pending"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                      />
                      <label
                        htmlFor="pending"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        Pending <UserIcon className="h-4 w-4" />
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="verified"
                        name="status"
                        type="radio"
                        value="verified"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                      />
                      <label
                        htmlFor="verified"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        Verified <UserIcon className="h-4 w-4" />
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset> */}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
