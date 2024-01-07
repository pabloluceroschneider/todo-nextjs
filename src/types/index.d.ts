export const enum StatusTask {
  TODO = "TODO",
  WIP = "WIP",
  DONE = "DONE"
}
export interface Task {
  timestamp: Date;
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: StatusTask;
  priority: string;
}