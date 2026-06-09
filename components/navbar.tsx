"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import Button from "./button";
import { useSession } from "@/lib/auth/auth-client";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./dropdown";

function Navbar() {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  const { data } = useSession();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropDownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <Button variant="ghost" className="h-10 w-26 border border-primary">
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
                <DropDownMenu name={data.user.name} email={data.user.email} />
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
