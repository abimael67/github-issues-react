import React, { useState, useEffect, useCallback } from "react";
import { getIssues } from "./api/github";
import { IssueList } from "./components/issueList";
import { useFetchIssues } from "./hooks/useFetchIssues";
import { SearchBox } from "./components/searchBox";
import { Issue } from "./types/Issue";
import { IssueViewer } from "./components/issueViewer";
import { IssuesContext, IssueContext } from "./context/issue";

function App() {
  //created a custom hook to handle the async api call
  //since github doesn't allow us to search under a repo by issue title,
  //I am storing the first repo response in a local state just for demo.
  const { issues } = useFetchIssues(useCallback(getIssues, []));
  const [issueContext, setIssueContext] = useState({} as IssueContext);

  useEffect(() => {
    setIssueContext((i) => ({ ...i, allIssues: issues }));
  }, [issues.length]);

  return (
    <div className="App">
      <IssuesContext.Provider value={issueContext}>
        <SearchBox
          setFilteredIssues={(filteredIssues: Issue[]) =>
            setIssueContext(
              Object.assign({}, issueContext, {
                filteredIssues,
                selectedIssue: null,
              })
            )
          }
        ></SearchBox>
        <IssueList
          setSelectedIssue={(selectedIssue: Issue) =>
            setIssueContext(
              Object.assign({}, issueContext, {
                selectedIssue,
                filteredIssues: [],
              })
            )
          }
        ></IssueList>
        {issueContext.selectedIssue && <IssueViewer />}
      </IssuesContext.Provider>
    </div>
  );
}

export default App;
