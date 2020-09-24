import React from "react";
import renderer from "react-test-renderer";
import { SearchBox } from "../searchBox";
import { mount, configure as configureEnzyme } from "enzyme";
import EnzymeReact16Adapter from "enzyme-adapter-react-16";
import { getFakeIssues } from "../../test_utils/fakeApi";

configureEnzyme({ adapter: new EnzymeReact16Adapter() });

describe("Searchbox component", () => {
  it("Component renders correctly", () => {
    const tree = renderer
      .create(<SearchBox filterFunc={jest.fn} reference={null} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("call filter func with a delay of minimal allowed interval", async () => {
    jest.useFakeTimers();
    const testingFunction = jest.fn().mockImplementation(() => getFakeIssues());
    const searchBoxInput = mount(
      <SearchBox filterFunc={testingFunction} reference={null}></SearchBox>
    )
      .find(SearchBox)
      .find("input");

    searchBoxInput.simulate("change", { target: { value: "Iss" } });
    expect(testingFunction).not.toBeCalled();
    jest.runAllTimers();
    expect(testingFunction).toBeCalled();
    expect(testingFunction).toHaveBeenCalledTimes(1);

    searchBoxInput.simulate("change", { target: { value: "Issue" } });
    searchBoxInput.simulate("change", { target: { value: "Issue n" } });
    expect(testingFunction).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(testingFunction).toHaveBeenCalledTimes(2);
  });
});
