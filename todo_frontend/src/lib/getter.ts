import { Url } from "next/dist/shared/lib/router/router";
import useSWR from "swr";
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

type itemType = {
  id: number;
  title: string;
  detail: string;
  date: string;
  completed: boolean
};

const fetcher = (url: string) => fetch(url)
  .then(response => response.json());

export const GetTodos = () => {
  const { data, error, isLoading } = useSWR<itemType[]>(
    `${apiUrl}/todo/lists`, fetcher);
    // throw new Error('test');

  return {
    data: data,
    isLoading: isLoading,
    isError: error
  };
}

export const GetTask = (id: number) => {
  const { data, error, isLoading } = useSWR<itemType>(
    `${apiUrl}/todo/tasks/${id}`, fetcher);

  console.log(data);

  return {
    data: data,
    isLoading: isLoading,
    isError: error
  };
}