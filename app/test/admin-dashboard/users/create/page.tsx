import Form from "@/app/ui/voter/create-form";
import { Breadcrumbs } from "@/app/ui/breadcrumb";

export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Voters", href: "/test/admin-dashboard/users" },
                    {
                        label: "Create Voter",
                        href: "/test/admin-dashboard/users/create",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
