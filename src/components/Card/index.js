import React, { useEffect, useState, useCallback } from "react";
import styles from "./index.module.scss";

export default function Card({
  activeCardIndex,
  setActiveCardIndex,
  cardIndex,
  inputValue,
  setInputValue,
  currencyCode,
  currencyName,
  currencyFlag,
  selectedCurrency,
  setSelectedCurrency,
}) {
  // As we'll use inputValue as a global input state to retain the value according to which we'll convert,
  // We'll use an adittional card-based input value state to not change all of the other cards' values

  const [localInputValue, setLocalInputValue] = useState(inputValue);

  let items = [
    0.24, 1.24, 0.75, 0.2, 0.21421, 2, 1.241, 0.431, 1.241, 4.341, 1.4638, 2.57,
  ];

  console.log(currencyFlag);

  useEffect(() => {
    setLocalInputValue(inputValue);
  }, [inputValue]);

  return (
    <div
      className={
        activeCardIndex === cardIndex ? styles.activeCard : styles.defaultCard
      }>
      <img
        src={require(`../../../public/assets/country_flags_png/${currencyFlag}.png`)}
        alt={currencyFlag}
      />
      <div className={styles.content__container}>
        <div className={styles.left__col}></div>
        <div className={styles.right__col}>
          <p>Card</p>
          <input
            type="number"
            name="amount"
            placeholder="Please Input The Amount You Want To Convert"
            value={localInputValue}
            onChange={(e) => setLocalInputValue(e.target.value)}
            onFocus={() => setActiveCardIndex(cardIndex)}
            onBlur={(e) => {
              // On blurring from the actual card we've just updated the local input value of
              // We'll update the other cards' values as well in order to have the default value
              // for which we'll convert

              setInputValue(e.target.value);
              activeCardIndex === cardIndex && setActiveCardIndex(null);

              // Change the main currency only if there was a change made to the amount
              if (localInputValue !== inputValue) {
                setSelectedCurrency(currencyCode);
                setInputValue(localInputValue);
              }
            }}
          />
          {/* AUD will represent the card currency abbreviation */}
          {/* Asutralian Dollar will represent the card currency name */}
          <p>
            {currencyCode} - {currencyName}
          </p>

          {/* EUR will represent the selected currency */}
          {/* We'll also give the currency exchange specific to one day */}
          <p>
            1 {currencyCode} ={" "}
            {(
              items[Math.floor(Math.random() * items.length)] *
              items[Math.floor(Math.random() * items.length)] *
              inputValue *
              1.2324
            ).toFixed(4)}{" "}
            {selectedCurrency}
          </p>

          {/* Test to see if a currency conversion would work fine */}
        </div>
      </div>
    </div>
  );
}
