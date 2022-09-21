import React from "react";
import { formatCurrency } from "./../../utils/formatCurrenty";
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";
import {
  Container,
  SideLeft,
  SideRight,
  Legend,
  LegendContainer,
} from "./style";

interface IBar {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox = ({ title, data }: IBar) => (
  <Container>
    <SideLeft>
      <h3>{title}</h3>
      <LegendContainer>
        {data.map((indicador) => {
          return (
            <Legend key={indicador.name} color={indicador.color}>
              <div>{indicador.percent}%</div>
              <span>{indicador.name}</span>
            </Legend>
          );
        })}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <BarChart data={data}>
          <Bar dataKey="amount" name="Valor">
            {data.map((indicador) => (
              <Cell
                key={indicador.name}
                fill={indicador.color}
                cursor="pointer"
              />
            ))}
          </Bar>
          <Tooltip
            cursor={{ fill: "none" }}
            formatter={(value) => formatCurrency(Number())}
          />
        </BarChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default BarChartBox;
