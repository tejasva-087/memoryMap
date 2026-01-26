function CustomPopup() {
  return (
    <div style={{ minWidth: "200px" }}>
      <h3 style={{ margin: "0 0 4px" }}>📍 London</h3>
      <p style={{ margin: "0 0 8px", fontSize: "14px" }}>
        This is a custom popup
      </p>
      <button
        style={{
          padding: "6px 10px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => alert("Clicked inside popup")}
      >
        Action
      </button>
    </div>
  );
}

export default CustomPopup;
