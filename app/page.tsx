"use client";
import Hero from "@/app/ui/home/hero";
import { NavBottom } from "./ui/home/nav-bottom";
import NavNotification from "./ui/NavNotification";

export default function Home() {
  return (
    <>
    <NavNotification/>
      <Hero />
      <NavBottom />
    </>
  );
}
