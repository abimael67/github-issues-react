import React, { useState, useEffect } from "react";
import { Issue } from "../types/Issue";
import "../assets/autocomplete.css";
import { IssueSuggestion } from "./issueSuggestion";
/** Displays an issue suggestion list */
export const IssueList: React.FC<{
  issueList: Array<Issue>;
  selectIssue: (issue: Issue) => void;
}> = ({ issueList, selectIssue }) => {
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number>(0);

  const setSelectedIssueIndexWithMouse = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedIssueIndex(Number(e.currentTarget.dataset.index));
  };

  const retrieveIssue = () => {
    if (issueList.length > 0) selectIssue(issueList[selectedIssueIndex]);
  };

  useEffect(() => {
    window.addEventListener("keydown", arrowKeysHandler);
    return () => {
      window.removeEventListener("keydown", arrowKeysHandler);
    };
  });
  const arrowKeysHandler = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "ArrowUp":
        setSelectedIssueIndex(
          selectedIssueIndex > 0 ? selectedIssueIndex - 1 : 0
        );
        break;
      case "ArrowDown":
        setSelectedIssueIndex(
          selectedIssueIndex < issueList.length - 1
            ? selectedIssueIndex + 1
            : selectedIssueIndex
        );
        break;
      case "Enter":
        retrieveIssue();
        break;
    }
  };
  return (
    <ul className="issues">
      {issueList &&
        issueList.map((issue: Issue, index: number) => (
          <li
            key={index}
            onMouseOver={setSelectedIssueIndexWithMouse}
            onClick={retrieveIssue}
            data-index={index}
          >
            <IssueSuggestion
              issue={issue}
              cn={
                selectedIssueIndex === index
                  ? "issue-suggestion-active"
                  : "issue-suggestion"
              }
            ></IssueSuggestion>
          </li>
        ))}
    </ul>
  );
};
