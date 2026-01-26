import { StarIcon } from "@phosphor-icons/react";

const arr = Array.from({ length: 5 });

function Ratings({ rating }) {
  return (
    <div className="flex items-center">
      {arr.map((_, i) => {
        return i < rating ? (
          <StarIcon color="#ffde00" weight="fill" key={i} />
        ) : (
          <StarIcon color="#ffde00" key={i} />
        );
      })}
    </div>
  );
}

export default Ratings;
