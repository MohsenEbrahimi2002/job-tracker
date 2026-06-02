import { ComponentProps } from "react";

type InputProps = {
  label: string;
};

function Input({ id, label,...props }: InputProps & ComponentProps<"input">) {
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={id} className="px-1 font-semibold">{label}</label>
      <input id={id} {...props} className="p-2 my-1 border border-black/10 focus:border-primary focus:ring-primary duration-300 transition-colors rounded"/>
    </div>
  );
}

export default Input;
