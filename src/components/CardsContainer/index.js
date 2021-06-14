import React from "react";
import Card from "../Card";
import styles from "./index.module.scss";

export default function CardsContainer({
  currencies,
  setCurrencies,
  activeCardIndex,
  setActiveCardIndex,
}) {
  const removeCurrency = (currencyIndex) => {};

  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => (
        <Card
          activeCardIndex={activeCardIndex}
          cardIndex={index}
          setActiveCardIndex={setActiveCardIndex}
          key={index}
        />
      ))}
    </div>
  );
}
