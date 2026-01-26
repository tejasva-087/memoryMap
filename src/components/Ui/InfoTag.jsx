function InfoTag({ className, icon, text }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-xl">{icon}</span>
      <p className="text-base">{text}</p>
    </div>
  );
}

export default InfoTag;
