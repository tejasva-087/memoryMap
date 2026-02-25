import { CalendarBlankIcon } from "@phosphor-icons/react";
import {
  useRef,
  useCallback,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

type DatePickerProps = {
  id: string;
  label: string;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

function DatePicker({ id, label, date, setDate }: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDate = useCallback((isoValue: string): string => {
    if (!isoValue) return "";
    const [year, month, day] = isoValue.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    const parts = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).formatToParts(dateObj);

    const m = parts.find((p) => p.type === "month")?.value;
    const d = parts.find((p) => p.type === "day")?.value;
    const y = parts.find((p) => p.type === "year")?.value;

    return `${m} ${d}, ${y}`;
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    [setDate],
  );

  const openPicker = useCallback(() => {
    // showPicker() throws on iOS — fall back to plain .click()
    try {
      inputRef.current?.showPicker();
    } catch {
      inputRef.current?.click();
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-500 dark:text-zinc-300">
        {label}
      </label>

      <div
        className="relative cursor-text p-4 pr-12 border border-white-3 dark:border-black-3 rounded-xl bg-transparent focus-within:ring focus-within:ring-primary transition-all duration-300"
        onClick={openPicker}
      >
        {/* 
          The native input is stretched to fill the entire wrapper so tapping
          anywhere opens the picker on iOS. It's made fully transparent so the
          native date text/chrome is invisible — our span provides the display.
        */}
        <input
          ref={inputRef}
          type="date"
          id={id}
          required
          value={date}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Custom display layer */}
        <span className="text-sm text-zinc-800 dark:text-zinc-100 pointer-events-none">
          {date ? (
            formatDate(date)
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">
              Pick a date
            </span>
          )}
        </span>

        <button
          type="button"
          aria-label="Open date picker"
          onClick={(e) => {
            e.stopPropagation();
            openPicker();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-0 focus:ring focus:ring-primary transition-all duration-300 rounded-sm"
        >
          <CalendarBlankIcon className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
