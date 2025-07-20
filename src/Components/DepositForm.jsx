import { useState } from "react";

export default function DepositForm({ goals, setGoals }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = e => {
    e.preventDefault();
    const goal = goals.find(g => g.id === goalId);
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + Number(amount)
    };

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
      .then(res => res.json())
      .then(data => {
        setGoals(goals.map(g => g.id === goalId ? data : g));
        setGoalId("");
        setAmount("");
      });
  };

  return (
    <form onSubmit={handleDeposit}>
      <h3>Make a Deposit</h3>
      <select value={goalId} onChange={e => setGoalId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Deposit</button>
    </form>
  );
}
