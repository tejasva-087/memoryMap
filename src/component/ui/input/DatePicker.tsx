import { CalendarBlankIcon } from "@phosphor-icons/react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
} from "react";

type Prop = {
  id: string;
  label: string;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

function DatePicker({ id, label, date, setDate }: Prop) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function openPicker() {
    inputRef.current?.showPicker();
    inputRef.current?.focus();
  }

  function handleWrapperClick(e: MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    openPicker();
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-300">
        {label}
      </label>

      <div className="relative cursor-text" onClick={handleWrapperClick}>
        <input
          ref={inputRef}
          type="date"
          id={id}
          required
          value={date}
          onChange={handleChange}
          className="
            date-custom-style
            w-full p-4 pr-12
            border border-zinc-200 dark:border-zinc-700
            rounded-xl
            bg-transparent
            focus:outline-none focus:ring focus:ring-primary
            transition-all duration-300 invalid:border-red-500 focus:invalid:ring-red-200 focus:invalid:border-red-500
          "
        />

        <button
          type="button"
          onClick={openPicker}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-zinc-400 dark:text-zinc-500
            hover:text-zinc-600 dark:hover:text-zinc-300
             focus:outline-0 focus:ring focus:ring-primary transition-all duration-300 rounded-sm
          "
        >
          <CalendarBlankIcon className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
