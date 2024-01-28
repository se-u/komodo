import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  deleteAdminByAddress,
  deleteCandidate,
  deleteVoterById,
  verifyVoterById,
} from "../lib/data";
import { ShieldCheckIcon } from "@heroicons/react/16/solid";

export function CreateVoter() {
  return (
    <Button variant={"outline"} asChild>
      <Link href="/dashboard/voter/create">
        <span className="hidden md:block">Create Voter</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateVoter({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/voter/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function VerifyVoter({
  id,
  isVerified,
}: {
  id: string;
  isVerified: boolean;
}) {
  const verifyVoter = verifyVoterById.bind(null, id);
  return (
    <>
      {!isVerified ? (
        <form action={verifyVoter}>
          <button className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Verify</span>
            <ShieldCheckIcon className="w-5" />
          </button>
        </form>
      ) : null}
    </>
  );
}

export async function DeleteVoter({ id }: { id: string }) {
  const deleteVoter = deleteVoterById.bind(null, id);
  return (
    <>
      <form action={deleteVoter}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export async function DeleteAdmin({ address }: { address: string }) {
  const deleteAdmin = deleteAdminByAddress.bind(null, address);
  return (
    <>
      <form action={deleteAdmin}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export async function DeleteCandidate({ index }: { index: number }) {
  const deleteCandidteByIndex = deleteCandidate.bind(null, index);
  return (
    <>
      <form action={deleteCandidteByIndex}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export function UpdateCandidate({ index }: { index: number }) {
  return (
    <Link
      href={`/dashboard/settings/${index}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
