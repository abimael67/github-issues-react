import React from "react";
import renderer from "react-test-renderer";
import { IssueList } from "./issueList";
import { getFakeIssues } from "../test_utils/fakeApi";

describe("IssueList component", () => {
  it("Component renders correctly", () => {
    const tree = renderer
      .create(<IssueList issueList={getFakeIssues()} selectIssue={jest.fn} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
