import GoalCard from "./GoalCard";

export default function GoalList({ goals, setGoals }) {
  return (
    <div>
      <h2>All Goals</h2>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} setGoals={setGoals} />
      ))}
    </div>
  );
}
