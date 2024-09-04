/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./Dashboard.scss";
import { UserData } from "./Data";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { BubbleChart } from "./BubbleChart";
import { Select } from "./Select";
export function Dashboard() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userLost),
        backgroundColor: [
          "#FF5733", // Naranja
          "#3498DB", // Azul
          "#2ECC71", // Verde
          "#9B59B6", // Morado
          "#F1C40F", // Amarillo
          "rgb(255, 99, 71)", // Rojo
          "rgb(0, 128, 0)", // Verde
          "rgb(128, 0, 128)", // Púrpura
          "rgba(0, 0, 255, 0.5)", // Azul con transparencia
          "hsl(240, 100%, 50%)", // Azul
          "hsla(120, 100%, 50%, 0.5)", // Verde con transparencia]
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div className="ContainerDashboard">
      {/* <div className="card">
        <canvas id="bar-graph"></canvas>
      </div> */}
      {/* <div className="bar">
        <BarChart chartData={userData} />
      </div>
      <div className="line">
        <LineChart chartData={userData} />
      </div>
      <div className="bubble">
        <BubbleChart chartData={userData} />
      </div> */}
      <Select />
    </div>
  );
}
