import { useMemo, useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinancerCard";
import SelectInput from "../../components/Select";
import { Container, Content, Filters } from "./styles";
import { useParams } from "react-router-dom";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import { formatCurrency, formatDate } from "../../utils/formatCurrenty";
import MonthList from "../../utils/months";

interface Idata {
  description: string;
  amountFormatted: string;
  freguency: string;
  dateFormatted: string;
  tagColor: string;
}

const List = () => {
  const params = useParams();
  const { type } = params;

  const [data, setData] = useState<Idata[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  /* const title = useMemo(() => {
    return type === "entry-balance" ? "Entradas" : "Saida";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#f7931b" : "#e44c4e";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]); */

  const pageData = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4e41f0",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#e44c4e",
          data: expenses,
        };
  }, [type]);

  const months = useMemo(() => {
    return MonthList.map((Mes, i) => {
      return {
        value: i + 1,
        label: Mes,
      };
    });
  }, []);

  const years = useMemo(() => {
    const { data } = pageData;
    let uniqueYears: number[] = [];
    data.forEach((item) => {
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
  }, [pageData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency
    );
    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid month value.");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error("invalid month value.");
    }
  };

  useEffect(() => {
    const { data } = pageData;
    const filteredDate = data.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredDate.map((item) => {
      return {
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        freguency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(formattedData);
  }, [pageData, monthSelected, yearSelected, selectedFrequency, data.length]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

      <Filters>
        <button
          className={`tag-filter tag-filter-recurrent ${
            selectedFrequency.includes("recorrente") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          className={`tag-filter tag-filter-eventual ${
            selectedFrequency.includes("eventual") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item, i) => (
          <HistoryFinanceCard
            key={i}
            tagColor={item.tagColor}
            title={item.description}
            subTitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
