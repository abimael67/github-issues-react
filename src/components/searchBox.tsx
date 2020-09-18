import React, { useCallback, useRef } from "react";
import "../assets/autocomplete.css";
interface Props {
  filterFunc: (criteria: string) => void;
  reference: any;
}
/**Displays a searchbox along with a clear button */
export const SearchBox: React.FC<Props> = ({ filterFunc, reference }) => {
  const value = useRef<string | null>(null);
  //cached and debounced filter handler to improve performance
  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      value.current = event.target.value;
      let temp = value.current;
      setTimeout(() => {
        if (temp === value.current) filterFunc(value.current || "");
      }, 500);
    },
    [filterFunc]
  );

  return (
    <div className="searchbox">
      <input
        type="text"
        className="searchbox"
        onChange={onChangeHandler}
        placeholder="Search an issue"
        ref={reference}
      ></input>
      <button onClick={() => filterFunc("")} className="clear-button">
        CLEAR
      </button>
    </div>
  );
};
