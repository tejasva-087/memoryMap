const stars = Array.from({ length: 5 });

function Ratings() {
  // TODO: get the rating, viewOnly and dispatch function form the context
  const rating = 3;
  const viewOnly = true;

  function setRatings(num) {
    if (viewOnly) return;

    // TODO: set the rating to the provided number in the reducer function form the context
    console.log("Set rating to:", num);
  }

  return (
    <div>
      {stars.map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => setRatings(i + 1)}
            className={`cursor-pointer ${viewOnly ? "pointer-events-none" : ""}`}
          >
            {i < rating ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

export default Ratings;
