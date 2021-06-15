import React, { useState, useEffect, useRef } from "react";
import Card from "../ModalCard";
import styles from "./index.module.scss";

export default function Modal({ currencies, setCurrencies, setShowModal }) {
  // We'll need the currencies state as well to make sure we won't render
  // the option to add a currency that is already active

  const [selectedCards, setSelectedCards] = useState([]);

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
      <div ref={wrapperRef} className={styles.container}>
        <div className={styles.cards__container}>
          {[...Array(5)].map((_, index) => (
            // Filter and make sure these cards are not already in the main interface
            <Card key={index} />
          ))}
        </div>
        <button onClick={() => setShowModal((prevState) => !prevState)}>
          Add
        </button>
      </div>
    </div>
  );
}
