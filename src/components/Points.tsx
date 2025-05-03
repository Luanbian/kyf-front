import { useSelector } from "../store/hooks";

const fanLevel = [
  { min: 0, max: 25, label: "Iniciante" },
  { min: 26, max: 50, label: "Intermediário" },
  { min: 51, max: 75, label: "Avançado" },
  { min: 76, max: 100, label: "Expert" },
  { min: 101, max: Infinity, label: "Mestre" },
];

export const Points = () => {
  const { fanPoints } = useSelector((state) => state.customer);

  return (
    <div>
      <h2>Fan Points</h2>
      <p>
        {fanLevel.find(
          (level) => fanPoints >= level.min && fanPoints <= level.max,
        )?.label || "Iniciante"}
      </p>
      <p>{fanPoints} pontos</p>
      <div className="cs-progress-bar">
        <div style={{ width: `${fanPoints}%` }} className="bars"></div>
      </div>
    </div>
  );
};
