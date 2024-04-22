import Search from "@/app/ui/search";
import { fetchCandidates } from "@/app/lib/data";
import ToggleVote from "@/app/components/toggle-vote";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/16/solid";
import { fetchAdmins, fetchStation } from "@/app/lib/data";
import { addAdmin, updateStation } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DeleteCandidate,
  DeleteAdmin,
  UpdateCandidate,
} from "@/app/ui/buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableCandidate({ candidates }: { candidates: any }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah Suara</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate.index}>
            <TableCell className="font-medium">{candidate.index}</TableCell>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{`${candidate.count}`}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <UpdateCandidate index={candidate.index} />
                <DeleteCandidate index={candidate.index} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export async function AddAdmin() {
  const admins = await fetchAdmins();
  const station = await fetchStation();
  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        <form
          action={updateStation}
          className="relative flex flex-1 flex-shrink-0 "
        >
          <Input
            name="station"
            defaultValue={station}
            className="peer mr-2 block w-full rounded-md  text-sm outline-2 placeholder:text-gray-500"
          />
          <Button
            type="submit"
            className="flex items-center rounded-lg bg-blue-600  text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowPathIcon className="h-5" />
          </Button>
        </form>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <form action={addAdmin} className="relative flex flex-1 flex-shrink-0 ">
          <Input
            name="address"
            className="peer mr-2 block w-full rounded-md  outline-2 placeholder:text-gray-500"
            placeholder="Masukan address staff"
          />
          <Button
            type="submit"
            className="flex items-center rounded-lg bg-blue-600  font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-5" />
          </Button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table bg-inherit">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
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
      </div>
    </>
  );
}

export default async function Page() {
  const candidates: any = await fetchCandidates();

  return (
    <>
      <main>
        <h1 className={` mb-4 text-xl md:text-2xl`}>Settings Candidate</h1>
        <div className="">
          <ToggleVote />
          <AddAdmin />
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Link
            href="/dashboard/settings/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Add Candidate</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </div>

        <TableCandidate candidates={candidates} />
      </main>
    </>
  );
}
