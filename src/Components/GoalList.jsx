
import GoalCard from "./GoalCard";

export default function GoalList({ goals, deleteGoal }) {
  return (
    <div className="allgoals">
      <h2>All Goals</h2>
      {goals.length === 0 ? (
        <p>No goals added yet.</p>
      ) : (
        goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} deleteGoal={deleteGoal} />
        ))
      )}
    </div>
  );
}
