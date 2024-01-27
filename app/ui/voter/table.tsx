import { fetchVoters } from "../../lib/data";
import { clsx } from "clsx";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { DeleteVoter, UpdateVoter, VerifyVoter } from "../buttons";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";

export default async function VoterTable({ query }: { query: string }) {
  const _voters = await fetchVoters();
  let voters = _voters.filter((voter: { name: string; idCard: string; }) => {
    return (
      voter.name.toLowerCase().includes(query.toLowerCase()) ||
      voter.idCard.toLowerCase().includes(query.toLowerCase())
    );
  });
  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {voters?.map((voter: { index: Key | null | undefined; }) => (
                <div
                  key={voter.index}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    {/* <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div> */}
                    {/* <InvoiceStatus status={invoice.status} /> */}
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {/* {formatCurrency(invoice.amount)} */}
                      </p>
                      {/* <p>{formatDateToLocal(invoice.date)}</p> */}
                    </div>
                    <div className="flex justify-end gap-2">
                      {/* <UpdateInvoice id={invoice.id} /> */}
                      {/* <DeleteVoter id={invoice.id} /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    NIK
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>

                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {voters?.map((voter: { index: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; idCard: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; isVerified: boolean; id: string; }) => (
                  <tr
                    key={voter.index}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                        <p>{voter.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {voter.idCard}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2 py-1 text-xs",
                          {
                            "bg-gray-100 text-gray-500": !voter.isVerified,
                            "bg-green-500 text-white": voter.isVerified,
                          }
                        )}
                      >
                        {!voter.isVerified ? (
                          <>
                            Pending
                            <ClockIcon className="ml-1 w-4 text-gray-500" />
                          </>
                        ) : (
                          <>
                            Verified
                            <CheckIcon className="ml-1 w-4 text-white" />
                          </>
                        )}
                      </span>{" "}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateVoter id={voter.id} />
                        <VerifyVoter
                          id={voter.id}
                          isVerified={voter.isVerified}
                        />
                        <DeleteVoter id={voter.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
