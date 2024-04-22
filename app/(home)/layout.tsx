import BottomNav from "../ui/home/nav-bottom";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* 3 Menu Bottom Nav Disini */}
      <BottomNav />
    </>
  );
}
