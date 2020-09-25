import React, { useState, useEffect, useContext } from "react";
import { Issue } from "../types/Issue";
import "../assets/autocomplete.css";
import { IssueSuggestion } from "./issueSuggestion";
import { IssuesContext } from "../context/issue";

interface Props {
  setSelectedIssue: (selectedIssue: Issue) => void;
}
/** Displays an issue suggestion list */
export const IssueList: React.FC<Props> = ({ setSelectedIssue }) => {
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number>(0);
  const issueContext = useContext(IssuesContext);
  const setSelectedIssueIndexWithMouse = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedIssueIndex(Number(e.currentTarget.dataset.index));
  };

  const selectIssue = (issue: Issue) => {
    if (!issue) return;
    setSelectedIssue(issue);
  };

  const retrieveIssue = () => {
    if (issueContext.filteredIssues.length > 0)
      selectIssue(issueContext.filteredIssues[selectedIssueIndex]);
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
          selectedIssueIndex < issueContext.filteredIssues.length - 1
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
      {issueContext.filteredIssues &&
        issueContext.filteredIssues.map((issue: Issue, index: number) => (
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
