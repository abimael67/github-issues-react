import { useState, useEffect } from "react";
import { Issue } from "../types/Issue";
/**Custom hook to handle async API calls and set the result
 * to a local state. Returns the loaded local state.
 */
export const useStateWithPromise = (
  promise: Promise<Issue[]>
): { issues: Issue[] } => {
  const [issues, setIssues] = useState([] as Issue[]);

  useEffect(() => {
    (async () => {
      console.log("api called");
      setIssues(await promise);
    })();
  }, []);

  return { issues };
};
