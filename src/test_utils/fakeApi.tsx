import { Issue, Label } from "../types/Issue";

export const getFakeIssues = (): Issue[] => {
  const dummyIssues: Issue[] = [
    {
      body: "test body",
      comments: 5,
      created_at: "2020-09-17",
      state: "open",
      title: "Issue number 1",
      user: {
        avatar_url: "dummy_url",
        login: "user1",
      },
      labels: [dummyLabel],
    },
    {
      body: "test body",
      comments: 3,
      created_at: "2020-09-17",
      state: "open",
      title: "Issue number 2",
      user: {
        avatar_url: "dummy_url",
        login: "user2",
      },
      labels: [dummyLabel],
    },
    {
      body: "test body",
      comments: 6,
      created_at: "2020-09-17",
      state: "open",
      title: "Issue number 3",
      user: {
        avatar_url: "dummy_url",
        login: "user3",
      },
      labels: [dummyLabel],
    },
  ];
  return dummyIssues;
};

const dummyLabel: Label = {
  color: "ccc",
  default: true,
  description: null,
  id: 10,
  name: "Label 1",
};
