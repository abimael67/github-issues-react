import React from "react";
import { Issue } from "../types/Issue";
interface Props {
  issue: Issue;
  cn: string;
}
/**Displays a single issue suggestion inside the list */
export const IssueSuggestion: React.FC<Props> = ({ issue, cn }) => {
  return (
    <>
      <div className={cn}>
        <img alt="avatar" src={issue.user.avatar_url} className="avatar"></img>
        <div className="issue-body">
          <div className="issue-title">{issue.title}</div>
          <br></br>
          <div>{"by " + issue.user.login}</div>
          <div>{" on " + issue.created_at}</div>
        </div>
      </div>
    </>
  );
};
