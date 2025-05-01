import { useSelector } from "../store/hooks";

export const Points = () => {
  const { fanPoints } = useSelector((state) => state.customer);

  return (
    <div>
      <h1>Fan Points</h1>
      <p>{fanPoints}</p>
    </div>
  );
};
