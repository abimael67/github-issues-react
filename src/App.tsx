import React, { useState, useRef } from "react";
import { getIssues } from "./api/github";
import { IssueList } from "./components/issueList";
import { useFetchIssues } from "./hooks/useFetchIssues";
import { SearchBox } from "./components/searchBox";
import { Issue } from "./types/Issue";
import { searchByTitle } from "./utils/search";
import { IssueViewer } from "./components/issueViewer";

function App() {
  //created a custom hook to handle the async api call
  //since github doesn't allow us to search under a repo by issue title,
  //I am storing the first repo response in a local state just for demo.
  const { issues } = useFetchIssues(getIssues());
  const [filteredIssues, setFilteredIssues] = useState([] as Issue[]);
  const [selectedIssue, setSelectedIssue] = useState(null as Issue | null);
  const searchBoxRef = useRef({} as HTMLInputElement);
  /**Handle the searchbox input changes to filter the matching issues. */
  const filterIssues = (criteria: string) => {
    setSelectedIssue(null);
    if (!criteria) {
      searchBoxRef.current.value = "";
      setFilteredIssues([]);
    } else setFilteredIssues(searchByTitle(issues, criteria));
  };
  /** Set the received Issue as selected.*/
  const selectIssue = (issue: Issue) => {
    if (!issue) return;
    setSelectedIssue(issue);
    searchBoxRef.current.value = issue.title;
    setFilteredIssues([]);
  };

  return (
    <div className="App">
      <SearchBox filterFunc={filterIssues} reference={searchBoxRef}></SearchBox>
      <IssueList
        issueList={filteredIssues}
        selectIssue={selectIssue}
      ></IssueList>
      {selectedIssue && <IssueViewer issue={selectedIssue}></IssueViewer>}
    </div>
  );
}

export default App;
