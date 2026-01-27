import { StarIcon } from "@phosphor-icons/react";

const arr = Array.from({ length: 5 });

function Ratings({ rating, defaultView = true }) {
  return (
    <ul
      className={`flex items-center ${defaultView ? "text-base" : "text-xl"}`}
    >
      {arr.map((_, i) => {
        return i < rating ? (
          <li key={i}>
            <StarIcon color="#ffde00" weight="fill" />
          </li>
        ) : (
          <li key={i}>
            <StarIcon color="#ffde00" />
          </li>
        );
      })}
    </ul>
  );
}

export default Ratings;
