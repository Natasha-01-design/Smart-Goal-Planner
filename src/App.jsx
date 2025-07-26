// src/App.jsx
import React, { useEffect, useState } from "react";
import GoalList from "./Components/GoalList";
import AddGoalForm from "./Components/AddGoalForm";
import DepositForm from "./Components/DepositForm";
import Overview from "./Components/Overview";

const BASE_URL = "http://localhost:3000";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/goals`)
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  const addGoal = (goal) => {
    fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    })
      .then((res) => res.json())
      .then((data) => setGoals((prev) => [...prev, data]));
  };

  const depositToGoal = (goalId, amount) => {
    const goal = goals.find((g) => g.id === Number(goalId));
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + Number(amount),
    };

    fetch(`${BASE_URL}/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
    })
      .then((res) => res.json())
      .then((data) =>
        setGoals((prev) => prev.map((g) => (g.id === data.id ? data : g)))
      );
  };

  const deleteGoal = (goalId) => {
    fetch(`${BASE_URL}/goals/${goalId}`, { method: "DELETE" })
      .then(() => setGoals((prev) => prev.filter((g) => g.id !== goalId)));
  };

  return (
    <div className="App">
      <h1 className="title">Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm addGoal={addGoal} />
      <DepositForm goals={goals} depositToGoal={depositToGoal} />
      <GoalList goals={goals} deleteGoal={deleteGoal} />
    </div>
  );
}

export default App;
