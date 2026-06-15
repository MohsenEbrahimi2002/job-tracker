import { ReactNode } from "react";

type DropDownProp = {
  children: ReactNode;
  className?: string;
};

function DropDownMenu({ children, className }: DropDownProp) {
  return (
    <div
      className={`absolute flex p-2 z-50 bg-white flex-col justify-between right-0 top-12 w-56 shadow-lg border border-slate-800/10 rounded-md text-black ${className}`}
    >
      {children}
    </div>
  );
}

export default DropDownMenu;
