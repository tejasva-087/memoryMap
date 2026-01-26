function SideBar({ className, children }) {
  return (
    <aside
      className={`bg-zinc-800 text-zinc-100 p-6 flex items-center flex-col ${className}`}
    >
      {children}
    </aside>
  );
}

export default SideBar;
