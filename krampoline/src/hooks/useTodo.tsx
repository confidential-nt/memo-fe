import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import {
  getTodos,
  addQuickInputTodo as addQuickInputTodoAPI,
} from "../service/http-requests/todo-api";

const baseQuery = "todo";

export default function useTodo() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const todoQuery = useQuery({
    queryKey: [baseQuery, user?.email],
    queryFn: () => getTodos(),
    staleTime: 1000 * 60 * 60,
    enabled: !!user,
  });

  const addQuickInputTodo = useMutation({
    mutationFn: ({ todo }: { todo: string }) => addQuickInputTodoAPI(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [baseQuery, user?.email],
      });
    },
  });

  return {
    todoQuery,
    addQuickInputTodo,
  };
}
