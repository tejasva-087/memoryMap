function Input({ type = "text", placeholder = "", state, setState }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={state}
      onChange={setState}
    />
  );
}

export default Input;
