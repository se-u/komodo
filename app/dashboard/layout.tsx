/** @format */
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "flex min-h-screen w-full pt-8",

        {
          "debug-screens": process.env.NODE_ENV === "development",
        },
      )}
    >
      <SideNavbar />
      <div className="w-full p-8">{children}</div>
    </main>
  );
}
