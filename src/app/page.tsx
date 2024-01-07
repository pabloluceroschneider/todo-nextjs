import { TaskRepository } from "@/services/task-repository"
import { Column } from "@/components/column/Column";

export default async function Home() {
  const tasks = await TaskRepository.fetchTasksByStatus();

  return (
    <main className="flex min-h-screen gap-24 p-24">
      <Column id="TODO" status="TODO" tasks={tasks.TODO} />
      <Column id="WIP" status="WIP" tasks={tasks.WIP} />
      <Column id="DONE" status="DONE" tasks={tasks.DONE} />
    </main>
  )
}
