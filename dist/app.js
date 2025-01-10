import { TaskService } from "./assets/components/taskService/TaskService.js";
import { TaskView } from "./assets/components/task/TaskView.js";
document.addEventListener("DOMContentLoaded", () => {
    const taskService = new TaskService();
    const taskView = new TaskView(taskService);
    // Render tasks on page load
    taskView.renderTasks();
    const btnSave = document.getElementById("btnSaveTask");
    const btnClear = document.getElementById("btnClearTask");
    btnSave.onclick = () => saveTask(taskService, taskView);
    btnClear.onclick = () => clearForm();
    const title = document.getElementById("txttitle");
    const taskDesc = document.getElementById("txtdescription");
    title.addEventListener("input", toggleClearButton);
    taskDesc.addEventListener("input", toggleClearButton);
    // Search and Filter Events
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    searchInput.addEventListener("input", () => taskView.renderTasks(searchInput.value, filterSelect.value));
    filterSelect.addEventListener("change", () => taskView.renderTasks(searchInput.value, filterSelect.value));
});
function toggleClearButton() {
    const title = document.getElementById("txttitle");
    const taskDesc = document.getElementById("txtdescription");
    const btnClear = document.getElementById("btnClearTask");
    btnClear.disabled = !(title.value.trim() || taskDesc.value.trim());
}
function saveTask(taskService, taskView) {
    const title = document.getElementById("txttitle");
    const taskDesc = document.getElementById("txtdescription");
    const btnSave = document.getElementById("btnSaveTask");
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
    }
    else {
        // Create a new task
        taskService.createTask(subject, description);
    }
    taskView.renderTasks(); // Re-render tasks to reflect changes
    clearForm();
    toggleClearButton();
}
function clearForm() {
    const title = document.getElementById("txttitle");
    const taskDesc = document.getElementById("txtdescription");
    const btnSave = document.getElementById("btnSaveTask");
    title.value = "";
    taskDesc.value = "";
    btnSave.title = "0"; // Reset the save button's title
    btnSave.textContent = "Save Task"; // Reset the button text to "Save Task"
}
