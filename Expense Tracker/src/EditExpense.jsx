import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './App.css'

const firebaseUrl = "https://expense-tracker-2513a-default-rtdb.asia-southeast1.firebasedatabase.app/";

const EditExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`${firebaseUrl}/expenses/${id}.json`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

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
      await axios.put(`${firebaseUrl}/expenses/${id}.json`, formData);
      alert("Expense updated!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form className="form-cont" onSubmit={(e)=> handleSubmit(e)}>
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
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
