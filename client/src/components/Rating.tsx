import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rate, amountOfStars }: { rate: number; amountOfStars: number }) => {
  const starsArrayRange = Array.from({ length: amountOfStars }, (_, i) => 1 + i);
  const dynamicStarsList = starsArrayRange.map((index) =>
    rate >= index ? (
      <FaStar key={"fullStar" + index} />
    ) : rate >= index - 0.5 ? (
      <FaStarHalfAlt key={"halfStar" + index} />
    ) : (
      <FaRegStar key={"emptyStar" + index} />
    )
  );

  return <div>{dynamicStarsList}</div>;
};

Rating.defaultProps = {
  amountOfStars: 5,
};

export default Rating;
