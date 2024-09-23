import useSWR from "swr";
import type { ItemType } from "./ItemType";
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

const fetcher = (url: string) => fetch(url)
  .then(response => response.json());

export const GetTodos = () => {
  const { data, error, isLoading } = useSWR<ItemType[]>(
    `${apiUrl}/todo/lists`, fetcher);
    // throw new Error('test');

  return {
    data: data,
    isLoading: isLoading,
    isError: error
  };
}

export const GetTask = (id: number) => {
  const { data, error, isLoading } = useSWR<ItemType>(
    `${apiUrl}/todo/tasks/${id}`, fetcher);

  console.log(data);

  return {
    data: data,
    isLoading: isLoading,
    isError: error
  };
}