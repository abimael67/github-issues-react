import React, { useState, useEffect, useRef } from "react";
import { Issue } from "../types/Issue";
import "../assets/autocomplete.css";
import { IssueSuggestion } from "./issueSuggestion";
/** Displays an issue suggestion list */
export const IssueList: React.FC<{
  issueList: Array<Issue>;
  selectIssue: (issue: Issue) => void;
}> = ({ issueList, selectIssue }) => {
  const selectedIssueIndexRef = useRef<number>(0);
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number>(0);
  /**Handle the mouse movement event to select the hovered issue */
  const setSelectedIssueIndexWithMouse = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedIssueIndex(Number(e.currentTarget.dataset.index));
  };
  /**Retrieves the current selected issue and send it back to parent's
   *  selectIssue function. */
  const retrieveIssue = () => {
    selectIssue(issueList[selectedIssueIndex]);
  };
  /**Manages the key press events subscribing the listener callbacks
   * when the component is first mounted and unsubscribe when it gets
   * unmounted.
   */
  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowUp":
          selectedIssueIndexRef.current =
            selectedIssueIndexRef.current > 0
              ? selectedIssueIndexRef.current - 1
              : 0;
          setSelectedIssueIndex(selectedIssueIndexRef.current);
          break;
        case "ArrowDown":
          selectedIssueIndexRef.current = selectedIssueIndexRef.current + 1;
          setSelectedIssueIndex(selectedIssueIndexRef.current);
          break;
      }
    });

    return () => {
      window.removeEventListener("keydown", () => null);
    };
  }, []);
  /**Manages the key 'Enter' subscribing the listener callback
   * when the component is updated and unsubscribe when it gets
   * unmounted.
   */
  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      switch (event.key) {
        case "Enter":
          retrieveIssue();
          break;
      }
    });
    return () => {
      window.removeEventListener("keydown", () => null);
    };
  });

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
