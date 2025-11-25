class Task {
    constructor(id, description, priority, dueDate) {
        this.id = id;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
    }

    getPriorityValue() {
        const priorities = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        return priorities[this.priority] || 0;
    }

    comparePriority(otherTask) {
        return this.getPriorityValue() - otherTask.getPriorityValue();
    }

    markCompleted() {
        this.completed = true;
    }
}
