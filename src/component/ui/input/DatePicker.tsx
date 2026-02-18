import { CalendarBlankIcon } from "@phosphor-icons/react";
import {
  useRef,
  useCallback,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
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
    inputRef.current?.showPicker();
    inputRef.current?.focus();
  }, []);

  const handleWrapperClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      openPicker();
    },
    [openPicker],
  );

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
            date-custom-style w-full p-4 pr-12 border border-white-3 dark:border-black-3 rounded-xl bg-transparent focus:outline-none focus:ring focus:ring-primary transition-all duration-300 invalid:border-red-500 focus:invalid:ring-red-200 focus:invalid:border-red-500
          "
        />

        {/* Formatted display overlay — shown when a date is selected */}
        {date && (
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-4 top-1/2 -translate-y-1/2
              text-zinc-800 dark:text-zinc-100 text-sm
              bg-white dark:bg-black-1
            "
          >
            {formatDate(date)}
          </span>
        )}

        <button
          type="button"
          aria-label="Open date picker"
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
