import { useState } from "react";
import { Drawer } from "vaul";

type BottomSheetProp = {
  title: string;
  titleStyles?: string;
  children: React.ReactNode;
};

function BottomSheet({ title, children, titleStyles = "" }: BottomSheetProp) {
  const snapPoints = [0.04, 0.2, 0.8];
  const [snap, setSnap] = useState<string | number | null>(snapPoints[1]);

  return (
    <Drawer.Root
      open={true} // Stays open by default
      dismissible={true} // Allows dragging down to close completely
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      modal={false} // Allows interaction with the background if needed
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-100 bg-white-2 dark:bg-black-2" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-4xl bg-white-1 dark:bg-black-1 h-full transition-transform duration-500 ease-in-out z-9999 border-t border-l border-r border-white-3 dark:border-0 outline-0 focus:outline-none">
          <div className="mx-auto mt-4 h-1.5 w-18 shrink-0 rounded-full bg-white-3 dark:bg-black-2" />

          <div className="flex-1 pt-4">
            <Drawer.Title className={`${titleStyles}`}>{title}</Drawer.Title>
            <div className="h-[70vh] overflow-scroll p-6">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default BottomSheet;
