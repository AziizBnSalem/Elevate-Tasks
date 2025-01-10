import { TaskService } from "../taskService/TaskService.js";
import { Task } from "../task/task.js";

export class TaskView {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    renderTasks(searchQuery: string = "", filter: "all" | "pending" | "completed" = "all"): void {
        const tasks = this.filterTasks(searchQuery, filter);
        this.clearTasks();
        tasks.forEach(task => this.printTask(task));
    }

    private filterTasks(searchQuery: string, filter: "all" | "pending" | "completed"): Task[] {
        const allTasks = this.taskService.getAllTasks();
        return allTasks.filter(task => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                filter === "all" ||
                (filter === "pending" && !task.completed) ||
                (filter === "completed" && task.completed);

            return matchesSearch && matchesFilter;
        });
    }

    private clearTasks(): void {
        const pendingZone = document.getElementById("PendingTasks") as HTMLDivElement;
        const doneZone = document.getElementById("DoneTasks") as HTMLDivElement;

        pendingZone.innerHTML = "";
        doneZone.innerHTML = "";
    }

    private printTask(task: Task): void {
        const taskZone = task.completed
            ? document.getElementById("DoneTasks")
            : document.getElementById("PendingTasks");

        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <p><small>Created At: ${task.createdAt.toLocaleString()}</small></p>
            <p><small>Updated At: ${task.updatedAt?.toLocaleString() || "N/A"}</small></p>
        `;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const updateButton = this.createButton("Update", () => this.editTask(task)); // Update button
        actions.appendChild(updateButton);

        if (!task.completed) {
            const completeButton = this.createButton("Complete", () => this.completeTask(task));
            actions.appendChild(completeButton);
        } else {
            const revertButton = this.createButton("Revert to Pending", () => this.revertToPending(task));
            actions.appendChild(revertButton);
        }

        const deleteButton = this.createButton("Delete", () => this.deleteTask(task));
        actions.appendChild(deleteButton);

        taskCard.appendChild(actions);
        taskZone?.appendChild(taskCard);
    }

    private createButton(text: string, action: () => void): HTMLButtonElement {
        const button = document.createElement("button");
        button.textContent = text;
        button.className = "task-button";
        button.addEventListener("click", action);
        return button;
    }

    private editTask(task: Task): void {
        const title = document.getElementById("txttitle") as HTMLInputElement;
        const taskDesc = document.getElementById("txtdescription") as HTMLTextAreaElement;
        const btnSave = document.getElementById("btnSaveTask") as HTMLButtonElement;

        title.value = task.title;
        taskDesc.value = task.description;
        btnSave.title = task.id.toString(); // Set the task ID in the button title
        btnSave.textContent = "Update"; // Change button text to "Update"

        // Scroll to the top of the page for editing
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    private completeTask(task: Task): void {
        const completedTask = this.taskService.completeTask(task.id);
        if (completedTask) {
            this.renderTasks();
        }
    }

    private revertToPending(task: Task): void {
        const revertedTask = this.taskService.revertToPending(task.id);
        if (revertedTask) {
            this.renderTasks();
        }
    }

    private deleteTask(task: Task): void {
        this.taskService.deleteTask(task.id);
        this.renderTasks();
    }
}
