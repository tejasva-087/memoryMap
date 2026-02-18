import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type Prop = {
  id: string;
  placeholder?: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  label: string;
  className?: string;
};

function TextArea({
  id,
  text,
  setText,
  label,
  placeholder = "",
  className = "",
}: Prop) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-300">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        autoComplete="off"
        required={true}
        className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring focus:ring-primary transition-all duration-300 min-h-32 invalid:border-red-500 focus:invalid:ring-red-200 focus:invalid:border-red-500"
      />
    </div>
  );
}

export default TextArea;
