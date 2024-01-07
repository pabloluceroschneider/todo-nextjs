import { StatusTask, Task } from "@/types";
import CreatePageClient from "./page.client";
import { TaskRepository } from "@/services/task-repository";

export default async function CreatePage() {

  async function handleNewTask(newTask: Task) {
    "use server";
    const data = {
      ...newTask,
      id: new Date().valueOf(),
      status: "TODO",
    }

    await TaskRepository.insertTask(data as Task);
  }

  return (
    <main className="flex min-h-screen gap-24 p-24">
      <CreatePageClient onCreate={handleNewTask} />
    </main>
  )
}
