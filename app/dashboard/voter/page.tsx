import Pagination from "@/app/ui/voter/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/voter/table";
import { CreateVoter } from "@/app/ui/buttons";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Voters</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search voter..." />
        <CreateVoter />
      </div>
      <Table currentPage={1} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={12} />
      </div>
    </div>
  );
}
