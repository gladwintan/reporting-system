"use client";
import { SignOutButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm flex flex-row justify-between p-5">
      <h1>ServiHub</h1>
      <SignOutButton />
    </nav>
  );
};
