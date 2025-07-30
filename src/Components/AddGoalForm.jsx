import { useState } from "react";

export default function AddGoalForm({ addGoal }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    targetAmount: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(form);
    setForm({ name: "", category: "", targetAmount: "", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Goal</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Goal name"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        name="targetAmount"
        type="number"
        value={form.targetAmount}
        onChange={handleChange}
        placeholder="Target Amount"
        required
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
