import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { CalendarBlank, CalendarBlankIcon } from "@phosphor-icons/react";

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
    inputRef.current?.showPicker(); // 👈 opens native calendar
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-300">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          id={id}
          value={date}
          onChange={handleChange}
          className="
          date-muted
            w-full p-4 pr-12
            border border-zinc-200 dark:border-zinc-700
            rounded-xl
            focus:outline-none focus:ring focus:ring-primary
            transition-all duration-300
            text-zinc-900 dark:text-zinc-100
            bg-transparent
          "
        />

        <button
          type="button"
          onClick={openPicker}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-zinc-400 dark:text-zinc-500
            hover:text-zinc-600 dark:hover:text-zinc-300
            transition-colors
          "
        >
          <CalendarBlankIcon className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
