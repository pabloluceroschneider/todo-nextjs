import type { StatusTask, Task } from "@/types";

const API_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT76-g6vC3THuKZW43RYz1_LpQqvkwzSmgEQZcZNSmH5PHFfy2ctLydp7HQ7iXFmCTuiwSNkKksN1Ve/pub?output=tsv"

type TasksByStatus = {
	TODO: Task[],
	WIP: Task[],
	DONE: Task[]
}

export class TaskRepository {
	/**
	 * Fetch tasks grouped by status
	 */
	static async fetchTasksByStatus(): Promise<TasksByStatus> {
		const response = await TaskRepository.fetchAllTasks();
		const tasksByStatus: TasksByStatus = { TODO: [], WIP: [], DONE: [] };
		response.forEach(task => {
			if (!tasksByStatus[task.status]) {
				console.error(`Status not tiped :: (${task.status})`);
				tasksByStatus[task.status] = [task];
			} else {
				tasksByStatus[task.status].push(task);
			}
		});
		return tasksByStatus;
	}

	/**
	 * Fetch all tasks
	 */
	static async fetchAllTasks(): Promise<Task[]> {
		const response = await TaskRepository.fetch(API_URL);
		const rows = response.split("\n").slice(1);

		const data: Task[] = rows.map(row => {
			const [id, timestamp, title, description, assignedTo, status, priority] = row.split("\t");

			return {
				id: Number(id),
				timestamp: Number(timestamp),
				title,
				description,
				assignedTo,
				status: status as StatusTask,
				priority
			};
		});

		return data;
	}


	/**
	 * Fetch 
	 */
	static async fetch(url: string): Promise<string> {
		try {
			const response = await fetch(url);
			return await response.text();
		} catch (error) {
			throw error;
		}
	}
}