import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProp {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}
const variants = {
  primary: "bg-primary text-white hover:scale-105",
  ghost: "bg-white  text-primary hover:scale-105",
  submit: "bg-primary text-white hover:bg-slate-400 transition-color"
};
function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProp & ComponentProps<"button">) {
  const baseStyle =
    "group flex justify-center items-center whitespace-nowrap gap-2 transition-all rounded-md cursor-pointer sm:px-4 px-2 h-12";
  return (
    <button
      // style={style}
      className={twMerge(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
