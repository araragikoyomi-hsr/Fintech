import React, { useState } from "react";
import axios from "axios";
import './App.css'

const firebaseUrl = "https://expense-tracker-2513a-default-rtdb.asia-southeast1.firebasedatabase.app/";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.date || !formData.category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${firebaseUrl}/expenses.json`, formData);
      alert("Expense added successfully!");
      setFormData({
        title: "",
        amount: "",
        date: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form className="form-cont" onSubmit={(e)=> handleSubmit(e)}>
        <p>Input Form</p>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e)=>handleChange(e)}
          placeholder="Expense Title"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(e)=> handleChange(e)}
          placeholder="Amount"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={(e) => handleChange(e)}
          placeholder="Category"
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
