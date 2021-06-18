import React from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// We'll use this component to filter currencies by name
export default function SearchInput({
  searchFocus,
  setSearchFocus,
  searchInputValue,
  setSearchInputValue,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faSearch}
          className={
            searchFocus && searchInputValue.length > 0
              ? styles.focused
              : styles.unfocused
          }
        />
        <input
          type="search"
          name="search_currency"
          placeholder="Search Currency"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
        />
      </div>
    </div>
  );
}
