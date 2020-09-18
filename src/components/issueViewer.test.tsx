import React from "react";
import renderer from "react-test-renderer";
import { IssueViewer } from "./issueViewer";
import { getFakeIssues } from "../test_utils/fakeApi";

describe("IssueViewer component", () => {
  it("Component renders correctly", () => {
    const tree = renderer
      .create(<IssueViewer issue={getFakeIssues()[0]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
