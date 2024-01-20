import { DeleteCandidate, UpdateCandidate } from "@/app/ui/buttons";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

export default function CandidateForm({ candidates }: { candidates: any }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {candidates?.map(
              (
                candidate: {
                  id: Key | null | undefined;
                  image: string | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  email:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  count:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                },
                index: number
              ) => (
                <div
                  key={candidate.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <img
                          src={candidate.image}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${candidate.name}'s profile picture`}
                        />
                        <p>{candidate.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                    </div>
                    {/* <candidatestatus status={candidate.status} /> */}
                    <h1>{candidate.count}</h1>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {/* {formatCurrency(candidate.amount)} */}
                        amount
                      </p>
                      <p>
                        {/* {formatDateToLocal(candidate.date)} */}
                        amount
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateCandidate index={index} />
                      <DeleteCandidate index={index} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  No
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Total Suara
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {candidates?.map((candidate: { image: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; count: any; }, index: number) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.image}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${candidate.name}'s profile picture`}
                      />
                      <p>{candidate.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {Number(candidate.count)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCandidate index={index} />
                      <DeleteCandidate index={index} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
