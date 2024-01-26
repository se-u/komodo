import { Breadcrumbs } from "@/app/ui/breadcrumb";
import FormCandidates from "@/app/ui/setting/create-form";

export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Candidate", href: "/test/admin-dashboard/settings" },
                    {
                        label: "Create Candidate",
                        href: "/test/admin-dashboard/settings/create",
                        active: true,
                    },
                ]}
            />
            <FormCandidates />
        </main>
    );
}
