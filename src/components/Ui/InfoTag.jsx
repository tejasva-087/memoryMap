function InfoTag({ className, icon, text }) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <span className="text-2xl">{icon}</span>
      <p>{text}</p>
    </div>
  );
}

export default InfoTag;
