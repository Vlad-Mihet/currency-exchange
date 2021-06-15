import data from "currency-codes/data";
import React from "react";
import Card from "../Card";
import styles from "./index.module.scss";

export default function CardsContainer({
  currencies,
  setCurrencies,
  selectedCurrency,
  setSelectedCurrency,
  activeCardIndex,
  setActiveCardIndex,
  inputValue,
  setInputValue,
  currencyData,
}) {
  const removeCurrency = (currencyIndex) => {};

  return (
    <div className={styles.container}>
      {currencyData.map((data, index) => (
        <Card
          activeCardIndex={activeCardIndex}
          cardIndex={index}
          setActiveCardIndex={setActiveCardIndex}
          key={index}
          inputValue={inputValue}
          setInputValue={setInputValue}
          currencyCode={data.currencyCode}
          currencyName={data.currency}
          currencyFlag={data.flag}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      ))}
    </div>
  );
}
