import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Container,
  SideLeft,
  Legend,
  LegendContainer,
  SideRight,
} from "./style";

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const CPieChart = ({ data }: IPieChartProps) => (
  <Container>
    <SideLeft>
      <h3>Relação</h3>
      <LegendContainer>
        {data.map((indicador) => {
          const { name, value, percent, color } = indicador;
          return (
            <Legend key={name} color={color}>
              <div>{percent}%</div>
              <span>{name}</span>
            </Legend>
          );
        })}
      </LegendContainer>
    </SideLeft>

    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="percent">
            {data.map((indicador) => (
              <Cell key={indicador.name} fill={indicador.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);
export default CPieChart;
