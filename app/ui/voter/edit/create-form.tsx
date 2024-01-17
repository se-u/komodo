import { Button } from "../../button";
import { CreditCardIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { updateVoter } from "@/app/lib/actions";

export default function Form({ voter }) {
  return (
    <form action={updateVoter}>
      <input type="hidden" name="id" value={voter.id} />
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
                defaultValue={voter.name}
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
                value={voter.idCard}
                placeholder="Masukan NIK"
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CreditCardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

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
                  Pending <ClockIcon className="h-4 w-4" />
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
                  Verified <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Save </Button>
      </div>
    </form>
  );
}
