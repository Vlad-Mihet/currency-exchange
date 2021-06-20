import React, { useState, useEffect } from "react";
import DatePicker from "./components/DatePicker";
import "./App.css";
import styles from "./App.module.scss";
import CardsContainer from "./components/CardsContainer";
import Modal from "./components/Modal";
import axios from "axios";
import { Helmet } from "react-helmet";

function App() {
  // This will change whenever a new currency is used as the base currency
  const [exchangeData, setExchangeData] = useState({});

  // Set Currency Amount Input State
  const [inputValue, setInputValue] = useState(0);

  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  // Generate New Date Data For Today
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  const [date, setDate] = useState(new Date(year, month, day));
  const [dateHelperState, setDateHelperState] = useState(
    new Date(year, month, day),
  );

  // Active Currencies Will Represent The User Selected Currencies
  const [activeCurrencies, setActiveCurrencies] = useState([]);

  // State For The Modal Selected Currencies
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  // We'll import the currencies data from the currencies.json file
  let data = require("./currencies.json");

  // We'll restring scrolling while the modal is open
  useEffect(() => {
    showModal && document.body.setAttribute("style", "overflow: hidden");
    !showModal && document.body.setAttribute("style", "overflow: unset");
  }, [showModal]);

  // The function for requesting data from the exhange rates api asynchrounously with some additional condition checking
  const requestExchangeRatesData = async () => {
    let day = date.getDate();
    let month = date.getMonth();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    let year = date.getFullYear();

    // We'll check before making a call whether or not the date has been changed as well
    // As the exchange data will remain in the state, so not further updates will be needed

    // We'll check to see whether or not the date was changed
    // Or we don't have the exchange rates data yet in order
    // To make a request to the exchange rates api
    if (
      dateHelperState.getTime() != date.getTime() ||
      (exchangeData &&
        Object.keys(exchangeData).length === 0 &&
        exchangeData.constructor === Object)
    ) {
      console.log(dateHelperState.getTime(), date.getTime());

      const result = await axios.get(
        `http://api.exchangeratesapi.io/v1/${year}-${month}-${day}?access_key=27e85f9d365fddc071250b1c4f695aca&base=EUR`,
      );

      setExchangeData(result.data.rates);

      setDateHelperState(date);
    }
  };

  useEffect(() => {
    // We'll use a date based useEffect listener in order to update the exchange rates everytime the date is updated

    requestExchangeRatesData();
  }, [date]);

  return (
    <div className="App">
      {/* Helmet is a npm library that eases the work we have to do to add SEO, as well as changing the title of the web application */}
      <Helmet>
        <title>Currency Exchange | Vlad Mihet</title>
        <meta charSet="UTF-8" />
      </Helmet>
      <div className={styles.container}>
        {/* top__wrapper will represent our top section which 
            will include the header, today's date as well as the currency cards */}
        <div className={styles.top__wrapper}>
          <h1>Currency Exchange</h1>
          <div className={styles.picker__wrapper}>
            {/* Date Picker will be the component we'll be using for picking a date for which we'll show currencies */}
            <DatePicker
              date={date}
              setDate={setDate}
              dateHelperState={dateHelperState}
              setDateHelperState={setDateHelperState}
            />
          </div>
          {activeCurrencies.length > 0 ? (
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
              activeCurrencies={activeCurrencies}
              setActiveCurrencies={setActiveCurrencies}
              requestExchangeRatesData={requestExchangeRatesData}
              exchangeData={exchangeData}
            />
          ) : (
            <div className={styles.noCurrencyText}>
              <p>You haven't selected any currencies to show here yet.</p>
              <p>
                Be sure to select one or more by clicking the button at the
                bottom of the screen.
              </p>
            </div>
          )}
        </div>
        <button onClick={() => setShowModal((prevState) => !prevState)}>
          Add Currency
        </button>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          activeCurrencies={activeCurrencies}
          setActiveCurrencies={setActiveCurrencies}
          currencyData={data}
          selectedCurrencies={selectedCurrencies}
          setSelectedCurrencies={setSelectedCurrencies}
        />
      )}
    </div>
  );
}

export default App;
