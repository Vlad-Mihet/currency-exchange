import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import generateExchangeRate from "../../helpers/exchangeHelper";

export default function Card({
  activeCardIndex,
  setActiveCardIndex,
  cardIndex,
  inputValue,
  setInputValue,
  currencyId,
  currencyCode,
  currencyName,
  currencyFlag,
  selectedCurrency,
  setSelectedCurrency,
  setActiveCurrencies,
  requestExchangeRatesData,
  exchangeData,
}) {
  // As we'll use inputValue as a global input state to retain the value according to which we'll convert,
  // We'll use an adittional card-based input value state to not change all of the other cards' values

  const [localInputValue, setLocalInputValue] = useState(inputValue);
  const [inFocus, setInFocus] = useState(false);

  console.log(currencyFlag);

  useEffect(() => {
    setLocalInputValue(inputValue);
  }, [inputValue]);

  return (
    <div
      className={
        activeCardIndex === cardIndex ? styles.activeCard : styles.defaultCard
      }>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() =>
          setActiveCurrencies((prevState) =>
            prevState.filter(
              (stateCurrencyId) => stateCurrencyId !== currencyId,
            ),
          )
        }
      />
      <div className={styles.image__currency__wrapper}>
        <div className={styles.image__wrapper}>
          <img
            src={
              require(`../../../public/assets/country_flags_png/${currencyFlag}.png`)
                .default
            }
            alt={currencyFlag}
          />
        </div>
        {/* AUD will represent the card currency abbreviation */}
        {/* Asutralian Dollar will represent the card currency name */}
        <p>
          {currencyCode} - {currencyName}
        </p>
      </div>

      {/* EUR will represent the selected currency */}
      {/* We'll also give the currency exchange specific to one day */}
      {selectedCurrency && (
        <p>
          1 {selectedCurrency} ={" "}
          {selectedCurrency === "EUR"
            ? exchangeData[currencyCode].toFixed(4)
            : generateExchangeRate(
                exchangeData[selectedCurrency],
                exchangeData[currencyCode],
              ).toFixed(4)}{" "}
          {currencyCode}
        </p>
      )}

      <div className={styles.input__wrapper}>
        <label htmlFor="amount">Exchange Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Please Input The Amount You Wish To Exchange"
          value={
            activeCardIndex === cardIndex
              ? localInputValue
              : selectedCurrency === "EUR"
              ? (inputValue / exchangeData[currencyCode]).toFixed(4)
              : (
                  inputValue /
                  generateExchangeRate(
                    exchangeData[currencyCode],
                    exchangeData[selectedCurrency],
                  )
                ).toFixed(4)
          }
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

            requestExchangeRatesData();
          }}
        />
      </div>

      {/* Test to see if a currency conversion would work fine */}
    </div>
  );
}
