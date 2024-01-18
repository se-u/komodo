import { validateVoter } from "@/app/lib/actions";
import { Button } from "../button";
import { CreditCardIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Form() {
  return (
    <form action={validateVoter}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nama  */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nama
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Masukan Nama"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* NIK  */}
        <div className="mb-4">
          <label htmlFor="idCard" className="mb-2 block text-sm font-medium">
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
              <CreditCardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
