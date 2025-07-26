export default function GoalCard({ goal, deleteGoal }) {
  const { id, name, category, targetAmount, savedAmount, deadline } = goal;
  const progress = (savedAmount / targetAmount) * 100;
  const remaining = targetAmount - savedAmount;
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = timeLeft < 0 && savedAmount < targetAmount;
  const isWarning = timeLeft <= 30 && timeLeft >= 0 && savedAmount < targetAmount;

  return (
    <div className="goal-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Target: ${targetAmount}</p>
      <p>Saved: ${savedAmount}</p>
      <p>Remaining: ${remaining}</p>
      <p>Deadline: {deadline} ({timeLeft} days left)</p>
      <progress value={savedAmount} max={targetAmount} />
      {isOverdue && <p style={{ color: "red" }}>Overdue</p>}
      {isWarning && <p style={{ color: "orange" }}>Deadline is near</p>}
      <button onClick={() => deleteGoal(id)}>Delete</button>
    </div>
  );
}
