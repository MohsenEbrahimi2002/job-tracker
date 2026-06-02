import { Briefcase } from "lucide-react";
import Link from "next/link";
import Button from "./button";

function Navbar() {
  return (
    <nav className="border-b sm:mx-10 border-gray-200 bg-white">
      <div className="container mx-auto  justify-between flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center  whitespace-nowrap gap-2 font-semibold text-xl text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-2">
          <Link href="/login">
            <Button variant="ghost" className="h-10">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="h-10">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
