import { TodoItem } from "../pages/Todo";
import Task from "./Task";

type Props = {
  todos: TodoItem[];
  onUpdate: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
};

export default function Tasks({ todos, onUpdate, onDelete }: Props) {
  return (
    <ul>
      {todos.map((item) => (
        <Task
          key={item.id}
          todo={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
