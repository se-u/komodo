import {clsx} from "clsx";
import {CheckIcon, ClockIcon} from "@heroicons/react/24/outline";
import {DeleteVoter, UpdateVoter, VerifyVoter} from "@/app/ui/buttons";

export default function CandidateForm(){
    return (
    <>
        <table className="bg-white mt-5 min-w-full text-grey-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Nomor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    Gambar
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    Nama
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    Jumlah Suara
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">

                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                        test
                    </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    test
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                    test
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">

                        test

                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        test
                </td>
            </tr>
            </tbody>
        </table>
    </>
    );
}