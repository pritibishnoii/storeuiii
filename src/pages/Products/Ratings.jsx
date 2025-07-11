import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value = 0, text, color }) => {
  // Ensure value is a number and between 0-5
  const safeValue = typeof value === "number" && value >= 0 ? value : 0;
  const fullStars = Math.max(0, Math.floor(safeValue));
  //   const fullStars = Math.floor(value);
  const halfStars = safeValue - fullStars > 0.5 ? 1 : 0;
  const emptyStar = Math.max(0, 5 - fullStars - halfStars);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`} />
      ))}
      <span className={`rating-text ml-{2rem} text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
