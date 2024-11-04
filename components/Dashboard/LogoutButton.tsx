import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return <button onClick={() => handleLogout()}>Logout</button>;
}
