const taskManager = new TaskManager();

function handleAddTask() {
    const id = parseInt(document.getElementById('taskId').value);
    const desc = document.getElementById('taskDesc').value.trim();
    const prio = document.getElementById('taskPrio').value;
    const date = document.getElementById('taskDate').value;

    if (!id || !desc || !date) {
        mostrarNotificacion('Por favor complete todos los campos', 'error');
        return;
    }

    try {
        taskManager.agregarTarea(id, desc, prio, date);
        mostrarNotificacion('Tarea agregada exitosamente', 'success');
        limpiarFormulario();
        actualizarVistaHeap();
    } catch (error) {
        mostrarNotificacion(`${error.message}`, 'error');
    }
}

function handleSearchTask() {
    const id = parseInt(document.getElementById('searchId').value);
    
    if (!id) {
        mostrarResultadoBusqueda(null, 'Ingrese un ID válido');
        return;
    }

    const tarea = taskManager.buscarTarea(id);
    mostrarResultadoBusqueda(tarea);
}

function handleCompleteTask(id) {
    if (taskManager.marcarCompletada(id)) {
        mostrarNotificacion('Tarea completada y eliminada del heap', 'success');
        actualizarVistaHeap();
    } else {
        mostrarNotificacion('No se pudo completar la tarea', 'error');
    }
}

function actualizarVistaHeap() {
    const heapList = document.getElementById('heapList');
    const emptyState = document.getElementById('empty-state');
    const tareas = taskManager.obtenerTareasHeap();

    if (tareas.length === 0) {
        heapList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    heapList.style.display = 'flex';
    emptyState.style.display = 'none';
    
    heapList.innerHTML = tareas.map(tarea => `
        <li class="task-item">
            <div class="task-content">
                <div class="task-item-header">
                    <span class="task-id">#${tarea.id}</span>
                    <span class="task-priority priority-${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>
                </div>
                <div class="task-desc">${tarea.descripcion}</div>
                <div class="task-date">📅 ${formatearFecha(tarea.fechaVencimiento)}</div>
            </div>
            <div class="task-actions">
                <button 
                    class="btn-complete" 
                    onclick="handleCompleteTask(${tarea.id})"
                >
                    Marcar como completada
                </button>
            </div>
        </li>
    `).join('');
}

function mostrarResultadoBusqueda(tarea, mensajeError = null) {
    const resultDiv = document.getElementById('search-result');

    if (mensajeError || !tarea) {
        resultDiv.innerHTML = `<div class="result-error">${mensajeError || 'Tarea no encontrada'}</div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="task-item-header">
                <span class="task-id">#${tarea.id}</span>
                <span class="task-priority priority-${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>
            </div>
            <div class="task-desc">${tarea.descripcion}</div>
            <div class="task-date">${formatearFecha(tarea.fechaVencimiento)}</div>
            <div style="margin-top: 0.75rem; color: var(--color-text-muted); font-size: 0.875rem;">
                Estado: ${tarea.completada ? 'Completada' : 'Pendiente'}
            </div>
        </div>
    `;
}

function limpiarFormulario() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskPrio').selectedIndex = 0;
}

function formatearFecha(fecha) {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function mostrarNotificacion(mensaje, tipo) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
        box-shadow: var(--shadow-xl);
        ${tipo === 'success' 
            ? 'background: linear-gradient(135deg, #10b981, #059669); color: white;' 
            : 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;'}
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

actualizarVistaHeap();