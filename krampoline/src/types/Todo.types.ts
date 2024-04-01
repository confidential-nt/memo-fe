export type TodoItem = {
  id: number;
  title: string;
  status: "completed" | "active";
  start: Date;
  end: Date;
};
