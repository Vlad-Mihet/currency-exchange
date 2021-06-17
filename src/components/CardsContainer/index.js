import React from "react";
import Card from "../Card";
import styles from "./index.module.scss";

export default function CardsContainer({
  selectedCurrency,
  setSelectedCurrency,
  activeCardIndex,
  setActiveCardIndex,
  inputValue,
  setInputValue,
  currencyData,
  activeCurrencies,
  setActiveCurrencies,
  requestExchangeRatesData,
  exchangeData,
}) {
  return (
    <div className={styles.container}>
      {currencyData.map(
        (data, index) =>
          activeCurrencies.includes(data.id) && (
            <Card
              activeCardIndex={activeCardIndex}
              cardIndex={index}
              setActiveCardIndex={setActiveCardIndex}
              key={index}
              inputValue={inputValue}
              setInputValue={setInputValue}
              currencyId={data.id}
              currencyCode={data.currencyCode}
              currencyName={data.currency}
              currencyFlag={data.flag}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              setActiveCurrencies={setActiveCurrencies}
              requestExchangeRatesData={requestExchangeRatesData}
              exchangeData={exchangeData}
            />
          ),
      )}
    </div>
  );
}
