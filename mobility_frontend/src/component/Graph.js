import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Graphs = () => {
  const [dailyData, setDailyData] = useState([
    {
      day: "2024-12-18",
      total: 433.0,
    },
    {
      day: "2024-12-20",
      total: 877.0,
    },
    {
      day: "2024-12-27",
      total: 7766.0,
    },
  ]);
  const [monthlyData, setMonthlyData] = useState([
    {
      month: "December 2024",
      total: 9076.0,
    },
  ]);
  const [yearlyData, setYearlyData] = useState([
    {
      year: "2024",
      total: 9076.0,
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}dashboard`);
      const result = await response.json();
      setDailyData(result.dailyData || []);
      setMonthlyData(result.monthlyData || []);
      setYearlyData(result.yearlyData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Daily Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Yearly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;
