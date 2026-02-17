import { useState } from "react";
import { Drawer } from "vaul";

function App() {
  const snapPoints = [0.05, 0.2, 0.8];
  const [snap, setSnap] = useState(snapPoints[1]);

  return (
    <>
      <Drawer.Root
        open={true} // Stays open by default
        dismissible={true} // Allows dragging down to close completely
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false} // Allows interaction with the background if needed
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[10px] bg-white h-full transition-transform duration-500 ease-in-out">
            <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />

            <div className="flex-1 p-4">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="text-lg font-bold mb-2">
                  Memory Map
                </Drawer.Title>
                <p className="text-zinc-600">
                  The drawer is at {Math.round(snap * 100)}% height.
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export default App;
