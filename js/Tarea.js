class Tarea {
    constructor(id, descripcion, prioridad, fechaVencimiento) {
        this.id = id;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.fechaVencimiento = fechaVencimiento;
        this.completada = false;
    }

    obtenerValorPrioridad() {
        const prioridades = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        return prioridades[this.prioridad] || 0;
    }

    compararPrioridad(otraTarea) {
        return this.obtenerValorPrioridad() - otraTarea.obtenerValorPrioridad();
    }

    marcarCompletada() {
        this.completada = true;
    }
}