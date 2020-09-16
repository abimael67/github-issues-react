import React, { useCallback } from "react";
import "../assets/autocomplete.css";
interface Props {
  filterFunc: (criteria: string) => void;
  reference: any;
}
/**Displays a searchbox along with a clear button */
export const SearchBox: React.FC<Props> = ({ filterFunc, reference }) => {
  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      filterFunc(event.target.value);
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
