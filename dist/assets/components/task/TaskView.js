export class TaskView {
    constructor(taskService) {
        this.taskService = taskService;
    }
    renderTasks(searchQuery = "", filter = "all") {
        const tasks = this.filterTasks(searchQuery, filter);
        this.clearTasks();
        tasks.forEach(task => this.printTask(task));
    }
    filterTasks(searchQuery, filter) {
        const allTasks = this.taskService.getAllTasks();
        return allTasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === "all" ||
                (filter === "pending" && !task.completed) ||
                (filter === "completed" && task.completed);
            return matchesSearch && matchesFilter;
        });
    }
    clearTasks() {
        const pendingZone = document.getElementById("PendingTasks");
        const doneZone = document.getElementById("DoneTasks");
        pendingZone.innerHTML = "";
        doneZone.innerHTML = "";
    }
    printTask(task) {
        var _a;
        const taskZone = task.completed
            ? document.getElementById("DoneTasks")
            : document.getElementById("PendingTasks");
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <p><small>Created At: ${task.createdAt.toLocaleString()}</small></p>
            <p><small>Updated At: ${((_a = task.updatedAt) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "N/A"}</small></p>
        `;
        const actions = document.createElement("div");
        actions.className = "task-actions";
        const updateButton = this.createButton("Update", () => this.editTask(task)); // Update button
        actions.appendChild(updateButton);
        if (!task.completed) {
            const completeButton = this.createButton("Complete", () => this.completeTask(task));
            actions.appendChild(completeButton);
        }
        else {
            const revertButton = this.createButton("Revert to Pending", () => this.revertToPending(task));
            actions.appendChild(revertButton);
        }
        const deleteButton = this.createButton("Delete", () => this.deleteTask(task));
        actions.appendChild(deleteButton);
        taskCard.appendChild(actions);
        taskZone === null || taskZone === void 0 ? void 0 : taskZone.appendChild(taskCard);
    }
    createButton(text, action) {
        const button = document.createElement("button");
        button.textContent = text;
        button.className = "task-button";
        button.addEventListener("click", action);
        return button;
    }
    editTask(task) {
        const title = document.getElementById("txttitle");
        const taskDesc = document.getElementById("txtdescription");
        const btnSave = document.getElementById("btnSaveTask");
        title.value = task.title;
        taskDesc.value = task.description;
        btnSave.title = task.id.toString(); // Set the task ID in the button title
        btnSave.textContent = "Update"; // Change button text to "Update"
        // Scroll to the top of the page for editing
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    completeTask(task) {
        const completedTask = this.taskService.completeTask(task.id);
        if (completedTask) {
            this.renderTasks();
        }
    }
    revertToPending(task) {
        const revertedTask = this.taskService.revertToPending(task.id);
        if (revertedTask) {
            this.renderTasks();
        }
    }
    deleteTask(task) {
        this.taskService.deleteTask(task.id);
        this.renderTasks();
    }
}
