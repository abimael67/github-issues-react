import { useEffect, useReducer } from "react";
import { Issue } from "../types/Issue";

type State = {
  issues?: Issue[];
  isLoading: boolean | null;
  error?: string;
};

type Action =
  | { type: "request" }
  | { type: "success"; issues: Issue[] }
  | { type: "failure"; error: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "request":
      return { isLoading: true };
    case "success":
      return { isLoading: false, issues: action.issues };
    case "failure":
      return { isLoading: false, error: action.error };
  }
};

/**Custom hook to handle async API calls and set the result
 * to a local state. Returns the loaded local state.
 */
export const useFetchIssues = (
  promise: () => Promise<Array<Issue>>
): { issues: Issue[] } => {
  const [{ issues, isLoading, error }, dispatch] = useReducer(reducer, {
    isLoading: null,
  });
  useEffect(() => {
    (async () => {
      dispatch({ type: "request" });
      try {
        let result = await promise();
        dispatch({ type: "success", issues: result });
      } catch (err) {
        dispatch({ type: "failure", error: err });
        alert("Something went wrong calling the api. Error message: " + err);
      }
    })();
  }, [promise]);

  useEffect(() => {
    if (isLoading === false) console.log("Api data loaded!");
    else if (isLoading === true) console.log("Loading api data...");
    error && console.log("Error loading api data: ", error);
  }, [isLoading, error]);
  return { issues: issues || [] };
};
