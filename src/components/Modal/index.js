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

  // We'll use this function to detect a click outside the modal container
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

  return (
    <div className={styles.overshadow}>
      {/* By using this ref property we'll make a reference to the created wrapperRef to mark the .container div as the object for which we'll listen to outside clicks */}
      <div ref={wrapperRef} className={styles.container}>
        {/* Search Input will be the Search Bar Component we'll use for searching up currencies */}
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
            // Here we'll filter currencies based on a couple of factors:
            currencyData.map(
              (data, index) =>
                // Whether or not the currency is already present in the main UI
                !activeCurrencies.includes(data.id) &&
                // Whether or not it's being searched for in the search bar
                // We'll search based on both the currency code and the currency's name
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
            // When we click the add button we'll bring all the selected currencies in the active currencies main interface
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
