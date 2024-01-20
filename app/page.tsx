import Hero from "@/app/ui/home/hero";
import NotificationTop from "./ui/notification";
import { NavBottom } from "./ui/home/nav-bottom";

export default async function Home() {
  return (
    <>
      <NotificationTop />

      <Hero />
      <NavBottom />
    </>
  );
}
