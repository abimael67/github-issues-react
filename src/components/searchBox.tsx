import React from "react";
import "../assets/autocomplete.css";
interface Props {
  filterFunc: (criteria: string) => void;
  reference: any;
}
/**Displays a searchbox along with a clear button */
export const SearchBox: React.FC<Props> = ({ filterFunc, reference }) => {
  return (
    <div className="searchbox">
      <input
        type="text"
        className="searchbox"
        onChange={(e) => filterFunc(e.target.value)}
        placeholder="Search an issue"
        ref={reference}
      ></input>
      <button onClick={() => filterFunc("")} className="clear-button">
        CLEAR
      </button>
    </div>
  );
};
