import React from "react";
import { formatCurrency } from "./../../utils/formatCurrenty";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Container,
  ChartContainer,
  LegendContainer,
  Header,
  Legend,
} from "./style";

interface IProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}: IProps) => (
  <Container>
    <Header>
      <h3>Historido de saldo</h3>
      <LegendContainer>
        <Legend color={lineColorAmountEntry}>
          <div></div>
          <span>Entradas</span>
        </Legend>
      </LegendContainer>

      <LegendContainer>
        <Legend color={lineColorAmountOutput}>
          <div></div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </Header>

    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
          <XAxis dataKey="month" stroke="#cecece" />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Line
            type="monotone"
            dataKey="amountEntry"
            name="Entradas"
            stroke={lineColorAmountEntry}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="amountOutput"
            name="Saídas"
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default HistoryBox;
