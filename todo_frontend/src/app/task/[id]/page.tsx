/**
 * 詳細ページ
 */
'use client'
import { type FC } from "react";
import TopHeader from "../../../components/TopHeader";
import Task from "../../../components/Task";

// type paramsType = {
//     id: string;
// };

// const TaskPage: FC<Props> = (Props) => {
const TaskPage = ( { params }: { params: { id: number } }) => {
  return (
    <div>
      <TopHeader />
      <Task id={params.id}/>
    </div> 
  );
}

export default TaskPage;