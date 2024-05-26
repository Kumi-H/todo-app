import type { ItemType } from "./ItemType";
const apiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL;

// Todoリストに新規タスク追加
export const postTodos = async (props: ItemType) => {
  console.log(props);
  try {
    const response = await fetch(`${apiUrl}/todo/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// タスク更新
export const putTask = async (props: ItemType) => {
  try {
    const response = await fetch(`${apiUrl}/todo/tasks/${props.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};


// タスク削除
export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/todo/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": id })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};