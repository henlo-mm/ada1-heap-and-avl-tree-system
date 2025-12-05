// Función principal para manejar la interfaz y eventos
const taskManager = new TaskManager();

function handleAddTask() {
    const id = parseInt(document.getElementById('taskId').value);
    const description = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('taskPrio').value;
    const date = document.getElementById('taskDate').value;

    if (!validateFields(id, description, date)) {
        showNotification('Complete todos los campos', 'error');
        return;
    }

    try {
        taskManager.addTask(id, description, priority, date);
        showNotification('Tarea agregada exitosamente', 'success');
        clearForm();
        updateHeapView();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function handleSearchTask() {
    const id = parseInt(document.getElementById('searchId').value);
    
    if (!id) {
        showSearchResult(null, 'Ingrese un ID válido');
        return;
    }

    const task = taskManager.searchTask(id);
    showSearchResult(task);
}

function handleCompleteTask(id) {
    if (taskManager.markCompleted(id)) {
        showNotification('Tarea completada y eliminada del heap', 'success');
        updateHeapView();
    } else {
        showNotification('Error al completar la tarea', 'error');
    }
}

function updateHeapView() {
    const heapList = document.getElementById('heapList');
    const emptyState = document.getElementById('empty-state');
    const tasks = taskManager.getHeapTasks()
        .slice()
        .sort((a, b) => b.getPriorityValue() - a.getPriorityValue());

    if (tasks.length === 0) {
        heapList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    heapList.style.display = 'flex';
    emptyState.style.display = 'none';
    
    heapList.innerHTML = tasks.map(task => createTaskElement(task)).join('');
}

function createTaskElement(task) {
    return `
        <li class="task-item">
            <div class="task-content">
                <div class="task-item-header">
                    <span class="task-id">#${task.id}</span>
                    <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <div class="task-desc">${task.description}</div>
                <div class="task-date">Vencimiento: ${formatDate(task.dueDate)}</div>
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="handleCompleteTask(${task.id})">
                    Completar
                </button>
            </div>
        </li>
    `;
}

function showSearchResult(task, errorMessage = null) {
    const resultDiv = document.getElementById('search-result');

    if (errorMessage || !task) {
        resultDiv.innerHTML = `<div class="result-error">${errorMessage || 'Tarea no encontrada'}</div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="task-item-header">
                <span class="task-id">#${task.id}</span>
                <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <div class="task-desc">${task.description}</div>
            <div class="task-date">Vencimiento: ${formatDate(task.dueDate)}</div>
            <div class="task-status">
                Estado: ${task.completed ? 'Completada' : 'Pendiente'}
            </div>
        </div>
    `;
}

function validateFields(id, description, date) {
    return id && description && date;
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskPrio').selectedIndex = 0;
}

function formatDate(date) {
    const dateObj = new Date(date + 'T00:00:00');
    return dateObj.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

updateHeapView();