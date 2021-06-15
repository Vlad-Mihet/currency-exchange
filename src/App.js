import React, { useState, useEffect } from "react";
import "./App.css";
import styles from "./App.module.scss";
import CardsContainer from "./components/CardsContainer";
import Modal from "./components/Modal";

const renderDate = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (day < 10) day = "0" + day;

  if (month < 10) month = "0" + month;

  return day + "/" + month + "/" + year;
};

function App() {
  // Display Currencies State

  // Set Currency Amount Input State
  const [inputValue, setInputValue] = useState(0);

  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  // Active Currencies Will Represent The User Selected Currencies
  const [activeCurrencies, setActiveCurrencies] = useState([]);

  // Addable Currencies That Haven't Been Yet Added For Use
  const [addableCurrencies, setAddableCurrencies] = useState([]);

  // We'll import the currencies data from the currencies.json file
  let data = require("./currencies.json");

  useEffect(() => {
    showModal && document.body.setAttribute("style", "overflow: hidden");
    !showModal && document.body.setAttribute("style", "overflow: unset");
  }, [showModal]);

  return (
    <div className="App">
      <div className={styles.container}>
        {/* top__wrapper will represent our top section which 
            will include the header, today's date as well as the currency cards */}
        <div className={styles.top__wrapper}>
          <h1>Currency Exchange</h1>
          <h2>
            {
              // Here we'll store today's date in a 'dd/mm/yyyy' format
              renderDate()
            }
          </h2>
          <CardsContainer
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            amount={amount}
            setAmount={setAmount}
            inputValue={inputValue}
            setInputValue={setInputValue}
            currencyData={data}
          />
        </div>
        <button onClick={() => setShowModal((prevState) => !prevState)}>
          Add Currency
        </button>
      </div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}

export default App;
