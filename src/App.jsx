import React, { useEffect, useState } from "react";
import GoalList from "./Components/GoalList";
import AddGoalForm from "./Components/AddGoalForm";
import DepositForm from "./Components/DepositForm";
import Overview from "./Components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(setGoals);
  }, []);

  return (
    <div className="App">
      <h1 style={{color: "white",display:"flex", justifyContent:"center"}}>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm setGoals={setGoals} />
      <DepositForm goals={goals} setGoals={setGoals} />
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;
