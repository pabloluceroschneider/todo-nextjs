export const enum StatusTask {
  TODO = "TODO",
  WIP = "WIP",
  DONE = "DONE"
}
export interface Task {
  id: number;
  timestamp: number;
  title: string;
  description: string;
  assignedTo: string;
  status: StatusTask;
  priority: string;
}