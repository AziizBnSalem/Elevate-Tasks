import { TaskService } from "./assets/components/taskService/TaskService.js";
import { TaskView } from "./assets/components/task/TaskView.js";

document.addEventListener("DOMContentLoaded", () => {
    const taskService = new TaskService();
    const taskView = new TaskView(taskService);

    // Render tasks on page load
    taskView.renderTasks();

    const btnSave = document.getElementById("btnSaveTask") as HTMLButtonElement;
    const btnClear = document.getElementById("btnClearTask") as HTMLButtonElement;

    btnSave.onclick = () => saveTask(taskService, taskView);
    btnClear.onclick = () => clearForm();

    const title = document.getElementById("txttitle") as HTMLInputElement;
    const taskDesc = document.getElementById("txtdescription") as HTMLTextAreaElement;

    title.addEventListener("input", toggleClearButton);
    taskDesc.addEventListener("input", toggleClearButton);

    // Search and Filter Events
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    const filterSelect = document.getElementById("filterSelect") as HTMLSelectElement;

    searchInput.addEventListener("input", () => taskView.renderTasks(searchInput.value, filterSelect.value as "all" | "pending" | "completed"));
    filterSelect.addEventListener("change", () => taskView.renderTasks(searchInput.value, filterSelect.value as "all" | "pending" | "completed"));
});

function toggleClearButton(): void {
    const title = document.getElementById("txttitle") as HTMLInputElement;
    const taskDesc = document.getElementById("txtdescription") as HTMLTextAreaElement;
    const btnClear = document.getElementById("btnClearTask") as HTMLButtonElement;

    btnClear.disabled = !(title.value.trim() || taskDesc.value.trim());
}

function saveTask(taskService: TaskService, taskView: TaskView): void {
    const title = document.getElementById("txttitle") as HTMLInputElement;
    const taskDesc = document.getElementById("txtdescription") as HTMLTextAreaElement;
    const btnSave = document.getElementById("btnSaveTask") as HTMLButtonElement;

    const subject = title.value.trim();
    const description = taskDesc.value.trim();

    if (!subject || !description) {
        alert("Please fill out both fields before saving.");
        return;
    }

    const taskId = parseInt(btnSave.title);
    if (taskId && taskId > 0) {
        // Update the task
        taskService.updateTask(taskId, subject, description);
        btnSave.textContent = "Save Task"; // Reset the button text to "Save Task"
        btnSave.title = "0"; // Reset the button title to indicate no task is being edited
    } else {
        // Create a new task
        taskService.createTask(subject, description);
    }

    taskView.renderTasks(); // Re-render tasks to reflect changes
    clearForm();
    toggleClearButton();
}

function clearForm(): void {
    const title = document.getElementById("txttitle") as HTMLInputElement;
    const taskDesc = document.getElementById("txtdescription") as HTMLTextAreaElement;
    const btnSave = document.getElementById("btnSaveTask") as HTMLButtonElement;

    title.value = "";
    taskDesc.value = "";
    btnSave.title = "0"; // Reset the save button's title
    btnSave.textContent = "Save Task"; // Reset the button text to "Save Task"
}
