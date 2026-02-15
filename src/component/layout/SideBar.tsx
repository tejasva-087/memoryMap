import { useTrip } from "../../context/tripContext";
import Logo from "../ui/Logo";
import TripList from "../sideBar/TripList";

function SideBar() {
  const { trips } = useTrip();

  return (
    <aside className="h-full w-full p-5 max-[425px]:p-0">
      <div className="bg-zinc-50 dark:bg-zinc-900 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4 overflow-scroll max-[425px]:h-[30svh] max-[425px]:border-0 max-[425px]:rounded-none max-[425px]:pt-8 max-[425px]:p-2 max-[425px]:gap-2">
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
            <TripList />
          )}
        </main>
      </div>
    </aside>
  );
}

export default SideBar;
