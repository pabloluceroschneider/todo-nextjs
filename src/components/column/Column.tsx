import { Task } from "@/types";
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

interface Props {
  id: string;
  status: string;
  tasks: Task[];
}

export const Column: React.FC<Props> = ({ id, status, tasks }) => {
  return (
    <section id={id} className="flex flex-col gap-8 basis-full">
      <h1 className="font-medium">{status}</h1>
      {tasks.map(task => (
        <Card key={task.timestamp}>
          <CardHeader>
            {task.title}
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}

