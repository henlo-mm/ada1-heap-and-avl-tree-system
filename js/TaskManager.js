class TaskManager {
    constructor() {
        this.heap = new MaxHeap();
        this.avl = new ArbolAVL();
        this.idsUsados = new Set(); // O(1) para verificación
    }

    // O(log n) - Agregar tarea
    agregarTarea(id, descripcion, prioridad, fechaVencimiento) {
        if (this.idsUsados.has(id)) {
            throw new Error('El ID ya existe');
        }

        const tarea = new Tarea(id, descripcion, prioridad, fechaVencimiento);
        this.heap.insertar(tarea);
        this.avl.insertar(tarea);
        this.idsUsados.add(id);
        
        return tarea;
    }

    // O(log n) - Buscar tarea por ID
    buscarTarea(id) {
        return this.avl.buscar(id);
    }

    // O(1) - Marcar tarea como completada y eliminarla del heap
    marcarCompletada(id) {
        const tarea = this.buscarTarea(id);
        if (!tarea) return false;

        // Marcar como completada
        tarea.marcarCompletada();
        
        // Eliminar del heap (el heap se reajusta automáticamente)
        this.heap.eliminarPorId(id);
        
        return true;
    }

    // O(1) - Obtener todas las tareas del heap
    obtenerTareasHeap() {
        return this.heap.obtenerTodas();
    }

    // O(1) - Verificar si hay tareas
    hayTareas() {
        return !this.heap.estaVacio();
    }
}