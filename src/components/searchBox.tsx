import React, { useCallback, useRef, useContext, useEffect } from "react";
import "../assets/autocomplete.css";
import { Issue } from "../types/Issue";
import { searchByTitle } from "../utils/search";
import { IssuesContext } from "../context/issue";
interface Props {
  setFilteredIssues: (filteredIssues: Issue[]) => void;
}
/**Displays a searchbox along with a clear button */
export const SearchBox: React.FC<Props> = ({ setFilteredIssues }) => {
  const reference = useRef<HTMLInputElement>(null);
  const issuesContext = useContext(IssuesContext);

  const filterIssues = useCallback(
    (criteria: string) => {
      if (!criteria) {
        if (reference.current) reference.current.value = "";
        setFilteredIssues([]);
      } else
        setFilteredIssues(searchByTitle(issuesContext.allIssues, criteria));
    },
    [issuesContext.allIssues, setFilteredIssues]
  );

  useEffect(() => {
    if (reference.current)
      reference.current.value = issuesContext?.selectedIssue?.title ?? "";
  }, [issuesContext]);

  const value = useRef<string | null>(null);
  //cached and debounced filter handler to improve performance
  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      value.current = event.target.value;
      let temp = value.current;
      setTimeout(() => {
        if (temp === value.current) filterIssues(value.current || "");
      }, 500);
    },
    [filterIssues]
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
      <button onClick={() => filterIssues("")} className="clear-button">
        CLEAR
      </button>
    </div>
  );
};
