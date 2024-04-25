import {
  ArrowPathIcon,
  MagnifyingGlassCircleIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import { DeleteAdmin } from "../buttons";
import { fetchAdmins, fetchStation } from "@/app/lib/data";
// import { addAdmin, updateStation } from "@/app/lib/actions";

export default async function AdminForm() {
  const admins = await fetchAdmins();
  const station = await fetchStation();
  return (
    <>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <form
          action={updateStation}
          className="relative flex flex-1 flex-shrink-0 "
        >
          <input
            name="station"
            className="peer mr-2 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={station}
          />
          <button
            type="submit"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowPathIcon className="h-5" />
          </button>
        </form>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <form action={addAdmin} className="relative flex flex-1 flex-shrink-0 ">
          <input
            name="address"
            className="peer mr-2 block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Masukan address staff"
          />
          <button
            type="submit"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-5" />
          </button>
        </form>
      </div> */}

      {/* <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((address, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{address}</td>
                <td>
                  {" "}
                  <DeleteAdmin address={address} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
}
