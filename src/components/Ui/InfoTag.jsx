function InfoTag({ className, icon, text }) {
  return (
    <div className={`flex items-center gap-1 text-zinc-200 ${className}`}>
      <span className="text-base">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
  );
}

export default InfoTag;
