import WorldMap from "../map/WorldMap";
import BottomSheet from "../ui/BottomSheet";
import Logo from "../ui/Logo";

function HomePage() {
  return (
    <div className="h-svh w-screen overflow-hidden relative">
      <Logo className="absolute top-5 left-5 z-1000" />
      <WorldMap />
      <div className="z-1000">
        <BottomSheet
          title="Add your first trip!"
          titleStyles="text-center text-xl"
        >
          <p className="text-center text-black-3 dark:text-white-3 w-2/3 m-auto">
            Your map looks a little lonely. Tap anywhere on the map to begin.
          </p>
        </BottomSheet>
      </div>
    </div>
  );
}

export default HomePage;
