import type { Task } from "@/types";

const API_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT76-g6vC3THuKZW43RYz1_LpQqvkwzSmgEQZcZNSmH5PHFfy2ctLydp7HQ7iXFmCTuiwSNkKksN1Ve/pub?output=tsv"

export class TaskRepository {
	/**
	 * Fetchs the tasks from the google sheet document and transforms the response to json
	 */
	static async fetchAllTasks(): Promise<Task[]> {
		try {
			const response = await fetch(API_URL);

			const responseText = await response.text();
			const rows = responseText.split("\n").slice(1);

			const data: Task[] = rows.map(row => {
				const [id, timestamp, title, description, assignedTo, priority] = row.split("\t");

				return {
					id: Number(id),
					timestamp: Number(timestamp),
					title,
					description,
					assignedTo,
					priority
				};
			});

			return data;
		} catch (error) {
			throw error;
		}
	}
}