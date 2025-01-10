import { Task } from "../task/task.js";

export class TaskService {
    private tasks: Task[] = [];
    private idCounter = 0;

    createTask(title: string, description: string): Task {
        const task = new Task(this.idCounter++, title, description);
        this.tasks.push(task);
        return task;
    }

    getAllTasks(): Task[] {
        return [...this.tasks]; // Return a shallow copy
    }

    completeTask(id: number): Task | undefined {
        const task = this.findTaskById(id);
        if (task) task.completed = true;
        return task;
    }

    revertToPending(id: number): Task | undefined {
        const task = this.findTaskById(id);
        if (task) task.completed = false;
        return task;
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTask(id: number, title?: string, description?: string): Task | undefined {
        const task = this.findTaskById(id);
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
            task.updatedAt = new Date(); // Update the time when updated
        }
        return task;
    }

    private findTaskById(id: number): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }
}
