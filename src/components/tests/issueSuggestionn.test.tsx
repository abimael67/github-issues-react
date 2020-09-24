import React from "react";
import renderer from "react-test-renderer";
import { IssueSuggestion } from "../issueSuggestion";
import { getFakeIssues } from "../../test_utils/fakeApi";

describe("IssueSuggestion component", () => {
  it("Component renders correctly", () => {
    const tree = renderer
      .create(
        <IssueSuggestion issue={getFakeIssues()[0]} cn="issue-suggestion" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
