import React, { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then(res => res.json())
      .then(setGoals);
  }, []);

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm setGoals={setGoals} />
      <DepositForm goals={goals} setGoals={setGoals} />
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;
