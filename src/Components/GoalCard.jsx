export default function GoalCard({ goal, setGoals }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const timeLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  const isOverdue = timeLeft < 0 && goal.savedAmount < goal.targetAmount;
  const isWarning = timeLeft <= 30 && timeLeft >= 0 && goal.savedAmount < goal.targetAmount;

  const handleDelete = () => {
    fetch(`http://localhost:3001/goals/${goal.id}`, {
      method: "DELETE"
    })
    .then(() => setGoals(prev => prev.filter(g => g.id !== goal.id)));
  };

  return (
    <div style={{ border: "1px solid", marginBottom: "1rem", padding: "1rem" }}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Remaining: ${remaining}</p>
      <p>Deadline: {goal.deadline} ({timeLeft} days left)</p>
      <progress value={goal.savedAmount} max={goal.targetAmount} />
      {isOverdue && <p style={{ color: "red" }}>Overdue</p>}
      {isWarning && <p style={{ color: "orange" }}>Deadline is near</p>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
