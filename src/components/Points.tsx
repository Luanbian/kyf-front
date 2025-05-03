import { useSelector } from "../store/hooks";

const fanLevel = [
  { min: 0, max: 25, label: "Iniciante" },
  { min: 26, max: 50, label: "Intermediário" },
  { min: 51, max: 75, label: "Experiente" },
  { min: 76, max: 99, label: "Mestre" },
  { min: 100, max: Infinity, label: "Lenda" },
];

export const Points = () => {
  const { fanPoints } = useSelector((state) => state.customer);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <h2>Nível de torcedor da furia: </h2>
        <h1>
          {fanLevel.find(
            (level) => fanPoints >= level.min && fanPoints <= level.max,
          )?.label || "Iniciante"}
        </h1>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div className="cs-progress-bar">
          <div style={{ width: `${fanPoints}%` }} className="bars"></div>
        </div>
        <h3>{fanPoints} pontos</h3>
      </div>
    </div>
  );
};
