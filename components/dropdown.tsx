import { signOut } from "@/lib/auth/auth-client";
import Button from "./button";
import { redirect, useRouter } from "next/navigation";

type DropDownMenuProp = {
  email: string;
  name: string;
};

function DropDownMenu({ name, email }: DropDownMenuProp) {
  const router = useRouter();
  return (
    <div className="absolute flex p-2 flex-col justify-between right-0 top-16 w-56 shadow-lg border border-slate-800/10 h-36 rounded-md text-black">
      <p className="text-black font-bold text-xl">{name}</p>
      <p className="text-slate-500/80 -mt-8">{email}</p>
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
    </div>
  );
}

export default DropDownMenu;
