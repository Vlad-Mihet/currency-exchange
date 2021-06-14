import React, { useState } from "react";
import Card from "../ModalCard";
import styles from "./index.module.scss";

export default function Modal({ currencies, setCurrencies }) {
  // We'll need the currencies state as well to make sure we won't render
  // the option to add a currency that is already active

  const [selectedCards, setSelectedCards] = useState([]);

  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
}
