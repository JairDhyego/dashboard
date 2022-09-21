import { useMemo } from "react";
import { Container } from "./styles";
import CountUp from "react-countup";

import dollarImg from "../../assets/dollar.svg";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";

interface IWallet {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
  color: string;
}

const WalletBox = ({ title, amount, footerLabel, icon, color }: IWallet) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case "dolar":
        return dollarImg;
      case "arrowUp":
        return arrowUp;
      case "arrowDown":
        return arrowDown;
      default:
        return undefined;
    }
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h3>
        <CountUp
          end={amount}
          prefix={"R$ "}
          separator="."
          decimal=","
          decimals={2}
        />
      </h3>
      <small>{footerLabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

export default WalletBox;
