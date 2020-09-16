import React from "react";
import { Issue, Label } from "../types/Issue";
interface Props {
  issue: Issue | null;
}
/**Displays issues details */
export const IssueViewer: React.FC<Props> = ({ issue }) => {
  return (
    <>
      <div className={"issue-viewer"}>
        <img alt="avatar" src={issue?.user.avatar_url} className="avatar"></img>
        <div className="issue-body">
          <div>{"by " + issue?.user.login}</div>
          <div>{" on " + issue?.created_at}</div>
          <div className="issue-title">{issue?.title}</div>
          <pre>{issue?.body}</pre>
          <div className="labels-display">
            {issue?.labels &&
              issue.labels.map((label: Label, index: number) => (
                <div
                  key={index}
                  title={label.description ?? ""}
                  className="label"
                  style={{ backgroundColor: "#" + label.color }}
                >
                  {label.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
