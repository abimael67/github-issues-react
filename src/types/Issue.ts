/**Structure of an issue element */
export interface Issue {
  title: string;
  labels: Array<Label>;
  user: User;
  comments: number;
  state: "open" | "closed";
  created_at: string;
  body: string;
}
/**Structure of a label element */
export interface Label {
  id: number;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
}
/**Structure of a user element */
interface User {
  login: string;
  avatar_url: string;
}
