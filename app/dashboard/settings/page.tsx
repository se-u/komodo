import SettingsForm from "@/app/ui/dashboard/settings-form";

export default function Page() {
  return (
    <>
      <main>
        <h1 className={` mb-4 text-xl md:text-2xl`}>Settings</h1>
        <div className="">
          {/* form */} <SettingsForm />
        </div>
      </main>
    </>
  );
}
