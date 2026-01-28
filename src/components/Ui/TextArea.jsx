function TextArea({ placeholder = "", state, setState, id, label, name }) {
  function handleInputChange(e) {
    setState(e.value);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-zinc-400 ml-3">
        {label}
      </label>
      <textarea
        className="border border-zinc-500 bg-zinc-800 rounded-2xl p-4"
        name={name}
        id={id}
        placeholder={placeholder}
        value={state}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default TextArea;
