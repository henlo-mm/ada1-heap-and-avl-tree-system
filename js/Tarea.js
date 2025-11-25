class Tarea {
    constructor(id, descripcion, prioridad, fechaVencimiento) {
        this.id = id;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.fechaVencimiento = fechaVencimiento;
        this.completada = false;
    }

    // O(1) - Obtener valor numérico de prioridad
    obtenerValorPrioridad() {
        const prioridades = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        return prioridades[this.prioridad] || 0;
    }

    // O(1) - Comparar tareas por prioridad
    compararPrioridad(otraTarea) {
        return this.obtenerValorPrioridad() - otraTarea.obtenerValorPrioridad();
    }

    // O(1) - Marcar como completada
    marcarCompletada() {
        this.completada = true;
    }
}