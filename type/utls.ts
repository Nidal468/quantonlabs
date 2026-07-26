export type agentIds =
  | "marketing"
  | "sales"
  | "cx"
  | "people"
  | "operations"
  | "inventory"
  | "finance"
  | "governing";

export type MessageType = {
  role: "user" | "assistant" | "system";
  content: string;
};
