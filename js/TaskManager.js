class TaskManager {
    constructor() {
        this.heap = new MaxHeap();
        this.avl = new AVLTree();
        this.usedIds = new Set();
    }

    addTask(id, description, priority, dueDate) {
        if (this.usedIds.has(id)) {
            throw new Error('El ID ya existe');
        }

        const task = new Task(id, description, priority, dueDate);
        this.heap.insert(task);
        this.avl.insert(task);
        this.usedIds.add(id);
        
        return task;
    }

    searchTask(id) {
        return this.avl.search(id);
    }

    markCompleted(id) {
        const task = this.searchTask(id);
        if (!task) return false;

        task.markCompleted();
        this.heap.removeById(id);
        
        return true;
    }

    getHeapTasks() {
        return this.heap.getAll();
    }

    hasTasks() {
        return !this.heap.isEmpty();
    }
}