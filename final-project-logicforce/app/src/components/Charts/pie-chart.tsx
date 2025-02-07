import React, { Component } from "react";
const echarts = require("echarts"); // Import echarts API
import chartStyle from "../../styles/Charts.module.scss";
import { Expense } from "./types"; // Import the Expense type

// Pie chart component
class PieCharts extends React.Component {
  async componentDidMount() {
    // Initialize the chart
    var myChart = echarts.init(document.getElementById("pie") as HTMLDivElement);
    // Get userId from local storage
    let userId = localStorage.getItem("loggedInUserId");
    // Fetch expense objects by userId
    const responseExpense = await fetch(`/api/getExpense?userId=${userId}`);
    let expense: { message: Expense[] } = await responseExpense.json();

    let food = 0,
      entertainment = 0,
      medical = 0,
      selfcare = 0,
      housing = 0,
      travel = 0;
    if (expense.message.length > 0) {
      // Sum up the expenses by category
      for (let i = 0; i < expense.message.length; i++) {
        let category = expense.message[i].category;
        switch (category) {
          case "food":
          case "Food":
            food += parseInt(expense.message[i].expense);
            break;
          case "entertainment":
          case "Entertainment":
            entertainment += parseInt(expense.message[i].expense);
            break;
          case "medical":
          case "Medical":
            medical += parseInt(expense.message[i].expense);
            break;
          case "selfcare":
          case "Self Care":
          case "Selfcare":
            selfcare += parseInt(expense.message[i].expense);
            break;
          case "housing":
          case "Housing":
            housing += parseInt(expense.message[i].expense);
            break;
          case "travel":
          case "Travel":
            travel += parseInt(expense.message[i].expense);
            break;
        }
      }
    }

    // Set the chart properties
    var option = {
      title: {
        text: "Expenses Portion",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          type: "pie",
          data: [
            {
              value: food,
              name: "Food",
            },
            {
              value: entertainment,
              name: "Entertainment",
            },
            {
              value: medical,
              name: "Medical",
            },
            {
              value: selfcare,
              name: "Self Care",
            },
            {
              value: housing,
              name: "Housing",
            },
            {
              value: travel,
              name: "Travel",
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  }
  render() {
    return <div id="pie" className={chartStyle.chart}></div>;
  }
}

export default PieCharts;