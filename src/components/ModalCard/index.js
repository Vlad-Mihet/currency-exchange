import React from "react";
import styles from "./index.module.scss";

export default function Card({
  activeCardIndex,
  setActiveCardIndex,
  currencyId,
  currencyCode,
  currencyName,
  currencyFlag,
  selected,
  selectedCurrencies,
  setSelectedCurrencies,
}) {
  return (
    <div
      className={selected ? styles.activeCard : styles.defaultCard}
      onClick={() => {
        if (selected)
          setSelectedCurrencies((prevState) =>
            prevState.filter(
              (stateCurrencyId) => stateCurrencyId !== currencyId,
            ),
          );

        if (!selected)
          setSelectedCurrencies((prevState) => [...prevState, currencyId]);
      }}>
      <div className={styles.image__wrapper}>
        <img
          src={require(`../../country_flags_png/${currencyFlag}.png`).default}
          alt={currencyFlag}
        />
      </div>
      <p>
        {currencyCode} - {currencyName}
      </p>
    </div>
  );
}
