import React from "react";
import styles from "./index.module.scss";

export default function Card({
  activeCardIndex,
  setActiveCardIndex,
  cardIndex,
}) {
  return (
    <div
      className={
        activeCardIndex === cardIndex ? styles.activeCard : styles.defaultCard
      }>
      <div className={styles.content__container}>
        <div className={styles.left__col}></div>
        <div className={styles.right__col}>
          <p>Card</p>
          <input
            type="number"
            name="amount"
            placeholder="Please Input The Amount You Want To Convert"
            onFocus={() => setActiveCardIndex(cardIndex)}
            onBlur={() =>
              activeCardIndex === cardIndex && setActiveCardIndex(null)
            }
          />
        </div>
      </div>
    </div>
  );
}
