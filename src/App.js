import { useState } from "react";
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
  const [currencies, setCurrencies] = useState([]);

  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

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
            currencies={currencies}
            setCurrencies={setCurrencies}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            amount={amount}
            setAmount={setAmount}
          />
        </div>
        <button
          className={
            showModal ? styles.activeModalButton : styles.closedModalButton
          }
          onClick={() => setShowModal((prevState) => !prevState)}>
          Add Currency
        </button>
      </div>
      {showModal && (
        <Modal currencies={currencies} setCurrencies={setCurrencies} />
      )}
    </div>
  );
}

export default App;
