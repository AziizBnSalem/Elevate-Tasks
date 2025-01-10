export class Task {
    constructor(id, title, description, completed = false, createdAt = new Date(), updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
