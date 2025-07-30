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
      .then((data) => {
        // Convert savedAmount to number for each goal
        const parsedGoals = data.map(goal => ({
          ...goal,
          savedAmount: Number(goal.savedAmount)
        }));
        setGoals(parsedGoals);
      })
      .catch((err) => console.error("Failed to load goals:", err));
  }, []);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => setGoals((prev) => [...prev, data]))
      .catch((err) => console.error("Failed to add goal:", err));
  };

  const depositToGoal = (goalId, amount) => {
    // Use goalId as string directly
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) {
      console.error("Goal not found for ID:", goalId);
      return;
    }

    const updatedAmount = Number(goal.savedAmount) + Number(amount);

    fetch(`${BASE_URL}/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        // Ensure savedAmount is a number
        updatedGoal.savedAmount = Number(updatedGoal.savedAmount);
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
        );
      })
      .catch((err) => console.error("Deposit failed:", err));
  };

  const deleteGoal = (goalId) => {
    fetch(`${BASE_URL}/goals/${goalId}`, { method: "DELETE" })
      .then(() => setGoals((prev) => prev.filter((g) => g.id !== goalId)))
      .catch((err) => console.error("Delete failed:", err));
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
