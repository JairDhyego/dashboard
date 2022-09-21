import React, { useState, useMemo, useCallback } from "react";
import { Container, Content } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/Select";
import WalletBox from "../../components/walletBox";
import MessageBox from "../../components/MessageBox";
import HistoryBox from "../../components/HistoryBox";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import MonthList from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import opsImg from "../../assets/ops.svg";
import CPieChart from "../../components/PieChart";
import BarChartBox from "./../../components/BarChartBox/index";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const months = useMemo(() => {
    return MonthList.map((Mes, i) => {
      return {
        value: i + 1,
        label: Mes,
      };
    });
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount! Amount must be number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês, você gastou mais do que deveria.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Op's!",
        description: "Neste mês, não há registros de entradas ou saídas.",
        footerText:
          "Parece que você não fez nenhum registro no mês e ano selecionado.",
        icon: opsImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês, você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    } else if (totalGains === 0 && totalExpenses) {
      return {
        title: "Op,s",
        description: "Neste mês, não há registros de entradass ou saídas.",
        footerText: "Parece que você não fez nenhum registro no mês e ano.",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#E44C4E",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: "#F7931B",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return MonthList.map((_, month) => {
      let amountEntry = 0;
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error("amounthEntry is invalid.");
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error("amountOutput is invalid.");
          }
        }
      });

      return {
        monthNumber: month,
        month: MonthList[month].substr(0, 3),
        amountEntry,
        amountOutput,
      };
    }).filter((item) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return (
        (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
        yearSelected < currentYear
      );
    });
  }, [yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });
    const total = amountRecurrent + amountEventual;

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
        color: "#f7931b",
      },
      {
        name: "Eventual",
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)),
        color: "#e44c4e",
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }
        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });
    const total = amountRecurrent + amountEventual;

    const recurrentPercentual = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );

    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercentual ? recurrentPercentual : 0,
        color: "#f7931b",
      },
      {
        name: "Eventual",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#e44c4e",
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid month value.");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error("invalid month value.");
    }
  }, []);
  
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saidas"
          icon="dolar"
          color="#4e41f0"
        />

        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerLabel="atualizado com base nas entradas e saidas"
          icon="arrowUp"
          color="#f7931b"
        />

        <WalletBox
          title="Saidas"
          amount={totalExpenses}
          footerLabel="atualizado com base nas entradas e saidas"
          icon="arrowDown"
          color="#e44c4e"
        />

        <MessageBox
          title={message.title}
          desc={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <CPieChart data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />
        <BarChartBox
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />
        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
