import { useState } from "react";

export default function DepositForm({ goals, depositToGoal }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!goalId || !amount || Number(amount) <= 0) {
      alert("Please select a goal and enter a valid amount.");
      return;
    }

    depositToGoal(goalId, Number(amount));
    setGoalId("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Make a Deposit</h3>
      <select
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        required
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}
