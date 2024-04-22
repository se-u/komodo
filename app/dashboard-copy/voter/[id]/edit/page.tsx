import { fetchVotersById } from "@/app/lib/data";
import { Breadcrumbs } from "@/app/ui/breadcrumb";
import Form from "@/app/ui/voter/edit/create-form";
export default async function Validate({ params }: { params: { id: string } }) {
  const id = params.id;
  const voter = await fetchVotersById(id);
  console.log(voter);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Voter", href: "/dashboard/voter" },
          {
            label: "Edit Voter",
            href: `/dashboard/voter/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form voter={voter} />
    </main>
  );
}
