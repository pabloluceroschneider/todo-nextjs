import { TaskRepository } from "@/services/task-repository"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const tasks = await TaskRepository.fetchAllTasks();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-24">
      {tasks.map(task => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </main>
  )
}
