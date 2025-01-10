import { Task } from "../task/task.js";
export class TaskService {
    constructor() {
        this.tasks = [];
        this.idCounter = 0;
    }
    createTask(title, description) {
        const task = new Task(this.idCounter++, title, description);
        this.tasks.push(task);
        return task;
    }
    getAllTasks() {
        return [...this.tasks]; // Return a shallow copy
    }
    completeTask(id) {
        const task = this.findTaskById(id);
        if (task)
            task.completed = true;
        return task;
    }
    revertToPending(id) {
        const task = this.findTaskById(id);
        if (task)
            task.completed = false;
        return task;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    updateTask(id, title, description) {
        const task = this.findTaskById(id);
        if (task) {
            if (title)
                task.title = title;
            if (description)
                task.description = description;
            task.updatedAt = new Date(); // Update the time when updated
        }
        return task;
    }
    findTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
}
