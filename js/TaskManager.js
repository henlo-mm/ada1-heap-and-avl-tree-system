class TaskManager {
    constructor() {
        this.heap = new MaxHeap();
        this.avl = new ArbolAVL();
        this.idsUsados = new Set();
    }

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

    buscarTarea(id) {
        return this.avl.buscar(id);
    }

    marcarCompletada(id) {
        const tarea = this.buscarTarea(id);
        if (!tarea) return false;

        tarea.marcarCompletada();
        this.heap.eliminarPorId(id);
        
        return true;
    }

    obtenerTareasHeap() {
        return this.heap.obtenerTodas();
    }

    hayTareas() {
        return !this.heap.estaVacio();
    }
}