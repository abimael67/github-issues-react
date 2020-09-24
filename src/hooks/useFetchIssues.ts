import { useState, useEffect } from "react";
import { Issue } from "../types/Issue";
/**Custom hook to handle async API calls and set the result
 * to a local state. Returns the loaded local state.
 */
export const useFetchIssues = (
  promise: Promise<Issue[]>
): { issues: Issue[] } => {
  const [issues, setIssues] = useState([] as Issue[]);

  useEffect(() => {
    (async () => {
      console.log("api called");
      try {
        setIssues(await promise);
      } catch (err) {
        setIssues([]);
        alert("Something went wrong calling the api. Error message: " + err);
      }
    })();
  }, []);

  return { issues };
};
