import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './App.css'

const firebaseUrl = "https://expense-tracker-2513a-default-rtdb.asia-southeast1.firebasedatabase.app/";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${firebaseUrl}/expenses.json`);
      const arr = []
      for (let key in res.data){
        arr.push({id: key, ...res.data[key]})
      }

      setExpenses(arr);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${firebaseUrl}/expenses/${id}.json`);
      alert("Expense deleted!");
      fetchData();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Expenses List</h2>
      <div className="expense-cont">
            {expenses.map((ele) => (
                <div key={ele.id} className="expense-child">
                    <h4>{ele.title}</h4>
                    <p>Amount: {ele.amount}/-</p>
                    <p>Date: {ele.date}</p>
                    <p>Category: {ele.category}</p>
                    <Link to={`/edit/${ele.id}`}>
                        <button>Edit Expense</button>
                    </Link>
                    <button onClick={() => handleDelete(ele.id)}>Del</button>
                </div>
            ))}
      </div>
    </div>
  );
};

export default ExpenseList;
