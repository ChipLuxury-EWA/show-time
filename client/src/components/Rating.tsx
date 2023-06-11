import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rate, text }: any) => {
  const dynamicStarsList = [1, 2, 3, 4, 5].map((index) =>
    rate >= index ? (
      <FaStar key={"fullStar" + index} />
    ) : rate >= index - 0.5 ? (
      <FaStarHalfAlt />
    ) : (
      <FaRegStar key={"halfStar" + index} />
    )
  );

  return <div>{dynamicStarsList}</div>;
};

export default Rating;
