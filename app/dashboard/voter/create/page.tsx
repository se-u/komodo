import Form from "@/app/ui/voter/create-form";
import { Breadcrumbs } from "@/app/ui/breadcrumb";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Voters", href: "/dashboard/voter" },
          {
            label: "Create Voter",
            href: "/dashboard/voter/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
