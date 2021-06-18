import React, { useState, useEffect, useRef } from "react";
import Card from "../ModalCard";
import SearchInput from "../SearchInput";
import styles from "./index.module.scss";

export default function Modal({
  activeCurrencies,
  setActiveCurrencies,
  setShowModal,
  currencyData,
  selectedCurrencies,
  setSelectedCurrencies,
}) {
  // We'll use state for the search input value
  const [searchInputValue, setSearchInputValue] = useState("");

  // We'll use a focus state to know when the input is being in focus
  const [searchFocus, setSearchFocus] = useState(false);

  function useOutsideAlerter(ref, setShowModal) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowModal(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowModal);

  useEffect(() => {
    console.log(activeCurrencies);
  }, [activeCurrencies]);

  return (
    <div className={styles.overshadow}>
      <div ref={wrapperRef} className={styles.container}>
        <SearchInput
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
        />
        <div className={styles.cards__container}>
          {/* We'll check to see whether or not the user added all of the avaible preset currencies to the main UI */}
          {currencyData.length === activeCurrencies.length ? (
            <p
              style={{
                color: "#a0a0a0",
                fontWeight: 600,
                fontSize: "1.15rem",
              }}>
              There are no more currencies available for you to add at this
              moment.
            </p>
          ) : (
            currencyData.map(
              (data, index) =>
                !activeCurrencies.includes(data.id) &&
                (data.currencyCode
                  .toLowerCase()
                  .includes(searchInputValue.toLowerCase()) ||
                  data.currency
                    .toLowerCase()
                    .includes(searchInputValue.toLowerCase())) && (
                  // Filter and make sure these cards are not already in the main interface
                  <Card
                    key={index}
                    cardIndex={index}
                    currencyId={data.id}
                    currencyCode={data.currencyCode}
                    currencyName={data.currency}
                    currencyFlag={data.flag}
                    selected={selectedCurrencies.includes(data.id)}
                    selectedCurrencies={selectedCurrencies}
                    setSelectedCurrencies={setSelectedCurrencies}
                  />
                ),
            )
          )}
        </div>
        <div className={styles.bottom__wrapper}>
          <span onClick={() => setSelectedCurrencies([])}>Unselect All</span>
          <button
            onClick={() => {
              setActiveCurrencies((prevState) => [
                ...prevState,
                ...selectedCurrencies,
              ]);

              setSelectedCurrencies([]);
              setShowModal(false);
            }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
