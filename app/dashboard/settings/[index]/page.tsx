import { updateCandidate } from "@/app/lib/actions";
import { fetchCandidates } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import { UserCircleIcon } from "@heroicons/react/16/solid";

export default async function Page({ params }: { params: any }) {
  const index = params.index;
  const candidates = await fetchCandidates();
  const { name, image } = candidates[index];
  return (
    <form action={updateCandidate}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nomor  */}
        <div className="mb-4">
          <input type="hidden" name="index" value={index} />
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nomor
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nomor"
                name="nomor"
                type="number"
                placeholder="Masukan Nomor Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Gamabar */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Foto Candidate
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image"
                name="image"
                type="url"
                defaultValue={image}
                placeholder="Masukan URL Foto Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Nama  */}
        <div className="mb-4">
          <label htmlFor="idCard" className="mb-2 block text-sm font-medium">
            Nama
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                defaultValue={name}
                type="text"
                placeholder="Masukan Nama Candidate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Save </Button>
      </div>
    </form>
  );
}
