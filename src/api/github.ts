import { Issue } from "../types/Issue";
/**Basic function that calls github issues API endpoint and returns an array of Issues */
export const getIssues = async (): Promise<Array<Issue>> => {
  let results = await fetch(
    "https://api.github.com/repos/facebook/react/issues"
  ).then((resp) => resp.json());
  return results as Array<Issue>;
};
