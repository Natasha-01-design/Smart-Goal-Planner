import { useState } from "react";

export default function AddGoalForm({ setGoals }) {
  const [form, setForm] = useState({
    name: "", category: "", targetAmount: "", deadline: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newGoal = {
      ...form,
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => setGoals(prev => [...prev, data]));

    setForm({ name: "", category: "", targetAmount: "", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Goal</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Goal name" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="targetAmount" type="number" value={form.targetAmount} onChange={handleChange} placeholder="Target Amount" required />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}
