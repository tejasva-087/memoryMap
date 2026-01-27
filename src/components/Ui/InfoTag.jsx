function InfoTag({ icon, text, defaultView = true }) {
  return (
    <div
      className={`flex items-center text-zinc-200 ${defaultView ? "gap-1" : "gap-2"}`}
    >
      <span className={`${defaultView ? "text-base" : "text-xl"}`}>{icon}</span>
      <p className={`${defaultView ? "text-sm" : "text-lg"}`}>{text}</p>
    </div>
  );
}

export default InfoTag;
