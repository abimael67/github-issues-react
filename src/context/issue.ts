import React from "react";
import { Issue } from "../types/Issue";

export interface IssueContext {
  allIssues: Issue[];
  filteredIssues: Issue[];
  selectedIssue: Issue;
}
export const IssuesContext = React.createContext({} as IssueContext);
