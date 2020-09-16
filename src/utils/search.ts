import { Issue } from "../types/Issue";
/**Receives an array of issues and a search criteria string.
 * It will look for the criteria string inside the title of each issue
 *  and then return an array of matching issues.
 */
export const searchByTitle = (issues: Issue[], criteria: string): Issue[] => {
  return issues.filter((issue: Issue) =>
    issue.title.toLowerCase().includes(criteria.toLowerCase())
  );
};
