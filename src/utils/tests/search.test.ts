import { getFakeIssues } from "../../test_utils/fakeApi";
import { searchByTitle } from "../search";

const _fakeIssues = getFakeIssues();
describe("Search by title function", () => {
  it("returns correct issues when passed the entire title ", async () => {
    const expectedLength = 1;
    const expectedIssueTitle = "Issue number 2";
    expect(searchByTitle(_fakeIssues, "Issue number 2").length).toEqual(
      expectedLength
    );
    expect(searchByTitle(_fakeIssues, "Issue number 2")[0].title).toEqual(
      expectedIssueTitle
    );
  });
  it("returns correct issues when passed part of the title ", async () => {
    const expectedLength = 3;
    expect(searchByTitle(_fakeIssues, "Issue number").length).toEqual(
      expectedLength
    );
  });
});
