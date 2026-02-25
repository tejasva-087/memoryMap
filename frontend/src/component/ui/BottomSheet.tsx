import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Drawer } from "vaul";

type BottomSheetProp = {
  children: React.ReactNode;
};

function BottomSheet({ children }: BottomSheetProp) {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const snapPoints = [0.04, 0.4, 1];
  const [snap, setSnap] = useState<string | number | null>(
    lat && lng ? snapPoints[2] : snapPoints[1],
  );
  const [viewportHeight, setViewportHeight] = useState("100dvh");

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      setViewportHeight(`${window.visualViewport!.height}px`);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer.Root
      open={true}
      dismissible={true}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Content
          style={{ height: viewportHeight }}
          className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-4xl bg-white-1 dark:bg-black-1 transition-all duration-300 ease-in-out z-9999 border-t border-white-3 dark:border-0 outline-none"
        >
          <div className="pb-4 cursor-grab active:cursor-grabbing">
            <div className="mx-auto mt-4 h-1.5 w-18 shrink-0 rounded-full bg-white-3 dark:bg-black-2" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-6 pb-10">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomSheet;
