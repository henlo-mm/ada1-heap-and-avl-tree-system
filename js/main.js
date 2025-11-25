const taskManager = new TaskManager();

function handleAddTask() {
    const id = parseInt(document.getElementById('taskId').value);
    const descripcion = document.getElementById('taskDesc').value.trim();
    const prioridad = document.getElementById('taskPrio').value;
    const fecha = document.getElementById('taskDate').value;

    if (!validarCampos(id, descripcion, fecha)) {
        mostrarNotificacion('Complete todos los campos', 'error');
        return;
    }

    try {
        taskManager.agregarTarea(id, descripcion, prioridad, fecha);
        mostrarNotificacion('Tarea agregada exitosamente', 'success');
        limpiarFormulario();
        actualizarVistaHeap();
    } catch (error) {
        mostrarNotificacion(error.message, 'error');
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
        mostrarNotificacion('Error al completar la tarea', 'error');
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
    
    heapList.innerHTML = tareas.map(tarea => crearElementoTarea(tarea)).join('');
}

function crearElementoTarea(tarea) {
    return `
        <li class="task-item">
            <div class="task-content">
                <div class="task-item-header">
                    <span class="task-id">#${tarea.id}</span>
                    <span class="task-priority priority-${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>
                </div>
                <div class="task-desc">${tarea.descripcion}</div>
                <div class="task-date">Vencimiento: ${formatearFecha(tarea.fechaVencimiento)}</div>
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="handleCompleteTask(${tarea.id})">
                    Completar
                </button>
            </div>
        </li>
    `;
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
            <div class="task-date">Vencimiento: ${formatearFecha(tarea.fechaVencimiento)}</div>
            <div class="task-status">
                Estado: ${tarea.completada ? 'Completada' : 'Pendiente'}
            </div>
        </div>
    `;
}

function validarCampos(id, descripcion, fecha) {
    return id && descripcion && fecha;
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
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add('notificacion-ocultar');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

actualizarVistaHeap();