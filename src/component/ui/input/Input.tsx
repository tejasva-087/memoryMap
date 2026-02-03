import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type Prop = {
  id: string;
  placeholder?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  label: string;
};

function Input({ id, state, setState, label, placeholder = "" }: Prop) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState(e.target.value);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        value={state}
        onChange={handleChange}
        autoComplete="off"
        className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring focus:ring-primary transition-all duration-300"
      />
    </div>
  );
}

export default Input;
