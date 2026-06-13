"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import Button from "./button";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { useState } from "react";
import DropDownMenu from "./dropdown";
import { useClickOutside } from "@/lib/utils";
import { useRouter } from "next/navigation";

function Navbar() {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const { data } = useSession();

  const router = useRouter();

  const dropdownRef = useClickOutside(() => setOpenDropDownMenu(false));

  return (
    <nav className="border-b sm:mx-10 border-gray-200 bg-white">
      <div className="container mx-auto gap-4 justify-between flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center  whitespace-nowrap gap-2 font-semibold text-xl text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        {data?.user ? (
          <>
            <div
              ref={dropdownRef}
              className="relative flex items-center justify-center gap-3"
            >
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="h-10 w-26 border border-primary"
                >
                  dashboard
                </Button>
              </Link>
              <div>
                <Button
                  onClick={() => setOpenDropDownMenu((prev) => !prev)}
                  className="rounded-full w-10 h-10 flex justify-center"
                >
                  {data.user.name[0].toUpperCase()}
                </Button>
              </div>
              {openDropDownMenu && (
                <DropDownMenu className="h-36">
                  <p className="text-black font-bold text-xl">
                    {data.user.name}
                  </p>
                  <p className="text-slate-500/80 -mt-8">{data.user.email}</p>
                  <Button
                    onClick={async () => {
                      const result = await signOut();
                      result.data?.success
                        ? router.push("/login")
                        : alert("Error in Logout");
                    }}
                    className="flex justify-center h-9 hover:bg-slate-500/80"
                  >
                    Logout
                  </Button>
                </DropDownMenu>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-0.5 sm:gap-2">
              <Link href="/login">
                <Button variant="ghost" className="h-10 w-18">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="h-10 w-18">Sign Up</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
