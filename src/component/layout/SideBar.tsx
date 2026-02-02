import { useTrip } from "../../context/tripContext";
import Logo from "../ui/Logo";

function SideBar() {
  const { trips } = useTrip();

  return (
    <aside className="h-full w-full p-5">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4">
        <header
          className="flex items-center
         justify-center"
        >
          <Logo />
        </header>
        <main className="w-full">
          {trips.length === 0 ? (
            <p className="text-center w-2/3 m-auto text-zinc-500 dark:text-zinc-400">
              Your map looks a little lonely. Tap anywhere on the map to begin.
            </p>
          ) : (
            <></>
          )}
        </main>
      </div>
    </aside>
  );
}

export default SideBar;
