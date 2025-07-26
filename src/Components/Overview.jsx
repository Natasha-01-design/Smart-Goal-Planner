// src/components/Overview.jsx
export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const goalsCompleted = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved.toFixed(2)}</p>
      <p>Goals Completed: {goalsCompleted}</p>
    </div>
  );
}
