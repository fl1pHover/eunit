import React from "react";
import { STYLES } from "../styles";
import mergeNames from "./mergeNames";

const CustomPagination = ({ prev, pagi, num, next }) => {
  return (
    <ul className="flex float-right mt-3 list-style-none">
      <li className="mx-2">
        <button
          className={mergeNames(num > 0 ? STYLES.active : STYLES.notActive)}
          onClick={prev}
        >
          Өмнөх
        </button>
      </li>

      <li className="mx-2">
        <button className={mergeNames(STYLES.notActive)} onClick={next}>
          Дараах
        </button>
      </li>
    </ul>
  );
};

export default CustomPagination;
