import { Drawer } from 'vaul';
import { FaBars, FaWindowClose } from 'react-icons/fa';
import { useState } from 'react';

const VaulDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer.Root
      direction="right"
      dismissible={false}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Trigger className="p-2 bg-blue-500 text-white rounded-full">
        <FaBars />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-screen max-w-md flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div className="max-w-md mx-auto">
              <div className="flex justify-end">
                <FaWindowClose
                  className="cursor-pointer text-blue-600"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <Drawer.Title className="font-medium mb-2 text-zinc-900">
                It supports all directions.
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600">
                This one specifically is not touching the edge of the screen,
                but that&apos;s not required for a side drawer.
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VaulDrawer;
