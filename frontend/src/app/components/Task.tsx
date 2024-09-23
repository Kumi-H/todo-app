import { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { GetTask } from "../lib/getter";
import { putTask } from "../lib/actions";
import ApiLoading from "@/app/loading";
import PageError from "@/app/error";
import type { ItemType } from "../types/types";

const Task = (taskId: { id: number }) => {
  const [item, setItem] = useState<ItemType>({
    id: 0,
    title: "",
    detail: "",
    date: "9999-12-31T00:00:00.000Z",
    completed: false,
  });

  console.log(taskId);
  const { data, isError, isLoading } = GetTask(taskId.id);

  if (isError) return <PageError />;
  if (isLoading) return <ApiLoading />;
  if (item.id === 0 && data) {
    setItem(data);
    console.log(data);
    console.log(item);
  }

  const handleChangeItem = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => {
    if (name === "completed") {
      setItem({ ...item, completed: !item.completed });
      return;
    }
    let eventValue = e.target.value;
    if (name === "date") {
      eventValue === ""
        ? (eventValue = "9999-12-31T00:00:00.000Z")
        : (eventValue += "T00:00:00.000Z");
    }
    setItem({ ...item, [name]: eventValue });
  };

  const handleClick = async () => {
    try {
      await putTask(item);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="container bg-white/50 w-[700px] mx-auto pb-3.5 rounded-2xl shadow-md">
      <div className="flex justify-between mx-7">
        <div>
          <h3 className="pt-5 pb-1.5 text-2xl font-bold">Task Details</h3>
        </div>
        <Link href="/">
          <button
            className="h-10 w-10 mt-5 rounded-xl flex items-center justify-center hover:bg-gray-100"
            onClick={handleClick}
          >
            <XIcon className="h-6 w-6 text-[#7a8ca3]" />
          </button>
        </Link>
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex items-center justify-center bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">タイトル</label>
        </div>
        <input
          type="text"
          className="w-5/6 rounded-r-xl pl-3.5 border-white focus:border-white focus:ring-0"
          value={item.title}
          onChange={(e) => handleChangeItem(e, "title")}
        />
      </div>
      <div className="flex h-60 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex justify-center bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold mt-3.5">詳細</label>
        </div>
        <input
          type="text"
          className="w-5/6 rounded-r-xl pl-3.5 border-white focus:border-white focus:ring-0"
          value={item.detail}
          onChange={(e) => handleChangeItem(e, "detail")}
        />
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex  items-center justify-center bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">期日</label>
        </div>
        <input
          type="date"
          className="w-5/6 rounded-r-xl pl-3.5 pr-7 border-white focus:border-white focus:ring-0"
          value={
            item.date === "9999-12-31T00:00:00.000Z"
              ? ""
              : item.date.replace("T00:00:00.000Z", "")
          }
          onChange={(e) => handleChangeItem(e, "date")}
        />
      </div>
      <div className="flex h-14 mx-7 my-3.5 shadow-md">
        <div className="w-1/6 flex  items-center justify-center bg-gray-100 rounded-l-xl">
          <label className="text-base font-bold">ステータス</label>
        </div>
        <select
          className="w-5/6 rounded-r-xl p-3.5 border-white focus:border-white focus:ring-0"
          name="status"
          onChange={(e) => handleChangeItem(e, "completed")}
        >
          <option>{item.completed ? "完了" : "進行中"}</option>
          <option>{item.completed ? "進行中" : "完了"}</option>
        </select>
      </div>
    </div>
  );
};

export default Task;
