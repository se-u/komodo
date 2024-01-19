import SettingsForm from "@/app/ui/dashboard/settings-form";
import CandidateForm from "@/app/ui/setting/table";
import {CreateCandidate} from "@/app/ui/settingButton";
import Search from "@/app/ui/search";

export default function Page() {
  return (
    <>
        <main>
            <h1 className={` mb-4 text-xl md:text-2xl`}>Settings Candidate</h1>
            <div className="">
                {/* form */} <SettingsForm/>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search voter..."/>
                <CreateCandidate/>
            </div>

            <CandidateForm/>
        </main>
    </>
  );
}
