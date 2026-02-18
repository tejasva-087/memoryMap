import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type Prop = {
  id: string;
  placeholder?: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  label: string;
};

function InputField({ id, input, setInput, label, placeholder = "" }: Prop) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        type="text"
        value={input}
        onChange={handleChange}
        autoComplete="off"
        required={true}
        className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring focus:ring-primary transition-all duration-300 invalid:border-red-500 focus:invalid:ring-red-200 focus:invalid:border-red-500"
      />
    </div>
  );
}

export default InputField;
