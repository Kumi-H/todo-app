import { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline";
import Link from 'next/link'
import { GetTodos } from '../lib/getter';
import { postTodos, deleteTask, putTask } from '../lib/actions';
// import ApiLoading from '@/app/loading';

type itemType = {
  id: number;
  title: string;
  detail: string;
  date: string;
  completed: boolean
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<itemType[]>([]);
  const { data, isError, isLoading } = GetTodos();

  // 
  useEffect(() => {
    if (data) {
      setTodoList(data);
    }
  }, [data]);
  // 

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  // if (isLoading) return <ApiLoading />;

  // 現在の最大idを取得
  let maxId: number = Math.max(...todoList.map(item => item.id));
  console.log(maxId);

  // 新規タスク追加
  const handleClick = async () => {
    try {
      const newTodo = {
        id: ++maxId,
        title: "入力してください",
        detail: "",
        date: "9999-12-31T00:00:00.000Z",
        completed: false
      };
      setTodoList([...todoList, newTodo]);
      await postTodos(newTodo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to add new todo:', error)
        // エラーページへ遷移する
      };

    }
  }

  // タイトルの更新管理
  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: e.target.value,
        };
      } else {
        return todo;
      }
    }))
  }

  // タイトルの更新管理
  const handleBlurTitle = async (id: number) => {
    try {
      const updatedTodo = todoList.find(todo => todo.id === id);
      if (updatedTodo === undefined) {
        console.error('item does not exist')
        return;
      }
      await putTask(updatedTodo);
      console.log(putTask(updatedTodo));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update task:', error)
      };
    };
  }

  //　チェックボックスの状態管理
  // true,falseのロジックを修正する
  const handleCompleted = async (id: number) => {
    try {
      setTodoList(todoList.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      }))
      const updatedTodo = todoList.find(todo => todo.id === id);
      if (updatedTodo === undefined) {
        console.error('item does not exist')
        return;
      }
      await putTask(updatedTodo);
      // console.log(putTask(updatedTodo));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update task:', error)
      };
    };
  }

  // タスクの削除
  const handleRemove = async (id: number) => {
    try {
      setTodoList(todoList.filter(todo =>
        todo.id !== id
      ));
      await deleteTask(id);
      console.log(deleteTask(id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to delete task:', error)
      };
    };
  }

  return (
    <div className="container bg-white/50 w-[700px] mx-auto pb-6 
                    rounded-2xl shadow-md">
      <div className="mx-7">
        <h3 className="pl-1.5 pt-5 pb-1.5 text-2xl font-bold">
          My List
        </h3>
      </div>
      {todoList.map((todo) => (
        <div key={todo.id}
          className="flex bg-white h-14 mx-7 my-3.5 rounded-xl shadow-lg">
          <div className="flex items-center w-4/5">
            <input
              type="checkbox"
              className="h-6 w-6 rounded-full mx-5 text-[#97d9e1b3] 
                          focus:outline-none focus:ring-0"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
            />
            <input
              type="text"
              className="w-full h-14 pl-2.5 border-white rounded-xl
                          focus:border-white focus:ring-0"
              value={todo.title}
              onChange={e => handleChangeTitle(e, todo.id)}
              onBlur={() => handleBlurTitle(todo.id)}
            />
          </div>
          <div className="w-1/5 flex items-center justify-between">
            {/* 編集ボタン*/}
            <Link href={"/task/" + todo.id}>
              <button className="hover:bg-gray-100 h-12 w-12 rounded-xl ml-2
                                  flex items-center justify-center">
                <PencilAltIcon className="h-6 w-6 text-[#7a8ca3]" />
              </button>
            </Link>
            {/* 削除ボタン */}
            <button
              onClick={() => handleRemove(todo.id)}
              className="hover:bg-gray-100 h-12 w-12 rounded-xl mr-3
                          flex items-center justify-center">
              <TrashIcon className="h-6 w-6 text-[#7a8ca3]" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleClick}
        className="group h-12 ml-7 pl-1.5 flex items-center justify-center rounded-xl">
        <PlusIcon className="h-6 w-6 text-[#7a8ca3]" />
        <div className="opacity-0 invisible ml-2 group-hover:visible opacity-100">
          Add new task
        </div>
      </button>
    </div>
  );
}

export default TodoList;