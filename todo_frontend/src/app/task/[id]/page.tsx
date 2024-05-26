/**
 * 詳細ページ
 */
'use client'
import TopHeader from "../../../components/TopHeader";
import Task from "../../../components/Task";

const TaskPage = ( { params }: { params: { id: number } }) => {
  return (
    <div>
      <TopHeader />
      <Task id={params.id}/>
    </div> 
  );
}

export default TaskPage;