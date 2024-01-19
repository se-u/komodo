import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/voter/create-form";
import FormCandidates from "@/app/ui/setting/create-form";

interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className={clsx(lusitana.className, "flex text-xl md:text-2xl")}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={clsx(
                            breadcrumb.active ? "text-gray-900" : "text-gray-500"
                        )}
                    >
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className="mx-3 inline-block">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Candidate", href: "/dashboard/settings" },
                    {
                        label: "Create Candidate",
                        href: "/dashboard/settings/create",
                        active: true,
                    },
                ]}
            />
            <FormCandidates/>
        </main>
    );
}
