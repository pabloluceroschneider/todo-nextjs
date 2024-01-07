import type { StatusTask, Task } from "@/types";

type TasksByStatus = {
	TODO: Task[],
	WIP: Task[],
	DONE: Task[]
}

export class TaskRepository {
	static URL_GSHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT76-g6vC3THuKZW43RYz1_LpQqvkwzSmgEQZcZNSmH5PHFfy2ctLydp7HQ7iXFmCTuiwSNkKksN1Ve/pub?output=tsv";
	static URL_GFORM = "https://docs.google.com/forms/d/e/1FAIpQLSdNGhqkdIo0_dHbEtD5ifg3rGp2bf4I4OfRGZfG1V-oSwRTCg/viewform?usp=pp_url&entry.222672610={ID}&entry.1294680739={TITLE}&entry.858858995={DESCRIPTION}&entry.369402124={ASSIGNED_TO}&entry.1460689905={STATUS}&entry.1172412426={PRIORITY}";

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
		const response = await TaskRepository.fetch();
		const rows = response.split("\n").slice(1);

		const data: Task[] = rows.map(row => {
			const [timestamp, id, title, description, assignedTo, status, priority] = row.split("\t");

			return {
				timestamp: new Date(timestamp),
				id: Number(id),
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
	static async fetch(): Promise<string> {
		try {
			const response = await fetch(TaskRepository.URL_GSHEET);
			return await response.text();
		} catch (error) {
			throw error;
		}
	}

	static async insertTask(task: Task) {
		try {
			const URL = TaskRepository.URL_GSHEET;
			URL.replace("{ID}", String(task.id));
			URL.replace("{TITLE}", task.title);
			URL.replace("{DESCRIPTION}", task.description);
			URL.replace("{ASSIGNED_TO}", task.assignedTo);
			URL.replace("{STATUS}", task.status);
			URL.replace("{PRIORITY}", task.priority);

			const response = await fetch(URL);
			return response;
		} catch (error) {
			throw error;
		}
	}
}