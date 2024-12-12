import React from "react";
import { Router, Route, Routes, Link } from "react-router-dom";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import './App.css'

const App = () => {
  return (
    
      <div>
        <div className="app">
        <h1>Expense Tracker</h1>
        <nav>
          <Link className="a" to="/">Home</Link> <Link className='a' to="/add">Add Expense</Link>
        </nav>
        </div>
        
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      </div>
  
  );
};

export default App;
