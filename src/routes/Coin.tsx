import { useParams } from "react-router-dom";

export const Coin = () => {
  const { coinId } = useParams();
  console.log(coinId);
  return <div>Coin: {coinId}</div>;
};
