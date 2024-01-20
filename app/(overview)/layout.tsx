import NotificationTop from "../ui/notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NotificationTop />
      {children}
    </>
  );
}
