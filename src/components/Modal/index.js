import React, { useEffect, useRef } from "react";
import Card from "../ModalCard";
import styles from "./index.module.scss";

export default function Modal({
  activeCurrencies,
  setActiveCurrencies,
  setShowModal,
  currencyData,
  selectedCurrencies,
  setSelectedCurrencies,
}) {
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
        <div className={styles.cards__container}>
          {currencyData.map(
            (data, index) =>
              !activeCurrencies.includes(data.id) && (
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
