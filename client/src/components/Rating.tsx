import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rate }: any) => {
  const dynamicStarsList = [1, 2, 3, 4, 5].map((index) =>
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

export default Rating;
