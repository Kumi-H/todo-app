/**
 * タスク詳細コンポーネント
 */
import { useState, useEffect } from 'react';
import { XIcon } from "@heroicons/react/outline";
import Link from 'next/link'
import { GetTask } from '../lib/getter';
import { putTask } from '../lib/actions';

type ItemType = {
  id: number;
  title: string;
  detail: string;
  date: string;
  completed: boolean
};

const Task = (taskId: { id: number }) => {
  const [item, setItem] = useState<ItemType>({
    id: 0,
    title: "",
    detail: "",
    date: "",
    completed: false
  });

  const { data, isError, isLoading } = GetTask(taskId.id);
  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(taskId);
  console.log(data);
  console.log(item);

  // 更新管理
  const handleChangeItem = (
    e: React.ChangeEvent<HTMLInputElement>, name: string
  ) => {
    let eventValue = e.target.value;
    if (name === "date" && eventValue !== "") {
      eventValue += "T00:00:00.000Z";
    } else if (name === "date" && eventValue === "") {
      eventValue = "9999-12-31T00:00:00.000Z";
    }
    setItem({ ...item, [name]: eventValue });
  }

  // ステータス管理
  const handleChangeStatus = (
    e: React.ChangeEvent<HTMLSelectElement>, name: string
  ) => {
    console.log(e.target.value);
    let eventValue = false
    e.target.value === "first" ? eventValue : eventValue = true
    setItem({ ...item, [name]: eventValue });
    console.log(eventValue);
  }

  // タスク更新
  const handleClick = async () => {
    try {
      await putTask(item);
      console.log(putTask(item));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }

  return (
    <div className="container bg-white/50 w-[700px] mx-auto pb-3.5 
                    rounded-2xl shadow-md">
      <div className="flex justify-between mx-7">
        <div>
          <h3 className="pt-5 pb-1.5 text-2xl font-bold">
            Task Details
          </h3>
        </div>
        {/* closeボタン */}
        <Link href="/">
          <button
            className="h-10 w-10 mt-5 rounded-xl 
                        flex items-center justify-center 
                        hover:bg-gray-100"
            onClick={handleClick}>
            <XIcon className="h-6 w-6 text-[#7a8ca3]" />
          </button>
        </Link>
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex items-center justify-center
                        bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">
            タイトル
          </label>
        </div>
        <input
          type="text"
          className="w-5/6 rounded-r-xl pl-3.5 border-white
                      focus:border-white
                      focus:ring-2 
                      focus:ring-[#d9afd9b3] 
                      focus:ring-opacity-95"
          value={item.title}
          onChange={e => handleChangeItem(e, "title")}
        />
      </div>
      <div className="flex h-60 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex justify-center
                    bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold mt-3.5">
            詳細
          </label>
        </div>
        <input
          type="text"
          className="w-5/6 rounded-r-xl pl-3.5 border-white
                      focus:border-white
                      focus:ring-2 
                      focus:ring-[#d9afd9b3] 
                      focus:ring-opacity-95"
          value={item.detail}
          onChange={e => handleChangeItem(e, "detail")}
        />
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex  items-center justify-center
                  bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">
            期日
          </label>
        </div>
        <input
          type="date"
          className="w-5/6 rounded-r-xl pl-3.5 pr-7 border-white
                      focus:border-white
                      focus:ring-2 
                      focus:ring-[#d9afd9b3] 
                      focus:ring-opacity-95"
          value={(
            item.date === "9999-12-31T00:00:00.000Z" ?
              "" : item.date.replace("T00:00:00.000Z", "")
          )}
          onChange={e => handleChangeItem(e, "date")}
        />
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex  items-center justify-center
                    bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">
            ステータス
          </label>
        </div>
        <select
          className="w-5/6 rounded-r-xl p-3.5 border-white
                      focus:border-white
                      focus:ring-2 
                      focus:ring-[#d9afd9b3] 
                      focus:ring-opacity-95"
          name="status"
          onChange={e => handleChangeStatus(e, "completed")}>
          <option value="first">
            {item.completed ? "完了" : "進行中"}
          </option>
          <option value="second">
            {item.completed ? "進行中" : "完了"}
          </option>
        </select>
      </div>
    </div>
  );
}

export default Task;