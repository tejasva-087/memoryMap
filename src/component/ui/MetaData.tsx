type MetaDataProp = {
  icon: React.ReactNode;
  minimal?: boolean;
  value: string;
  heading: string;
};

function MetaData({ heading, value, icon, minimal = true }: MetaDataProp) {
  if (minimal)
    return (
      <div className="flex items-center gap-2 text-black-3 dark:text-white-3">
        <span className="text-xl">{icon}</span>
        <p className="">{value}</p>
      </div>
    );

  return (
    <div className="flex items-center gap-2 p-2">
      <span className="bg-primary/20 text-primary p-3 rounded-lg text-2xl">
        {icon}
      </span>
      <div className="flex flex-col">
        <p className="text-xs font-medium uppercase tracking-wider">
          {heading}
        </p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default MetaData;
