import { NavBottom } from "../ui/home/nav-bottom";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NavBottom />
    </>
  );
}
