type Prop = {
  heading: string;
  value: string;
  icon: React.ReactNode;
};

function MetaPreview({ heading, value, icon }: Prop) {
  return (
    <div className="flex items-center gap-3 p-3">
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

export default MetaPreview;
