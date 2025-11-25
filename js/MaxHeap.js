class MaxHeap {
    constructor() {
        this.monticulo = [];
    }

    insertar(tarea) {
        this.monticulo.push(tarea);
        this.heapificarArriba(this.monticulo.length - 1);
    }

    heapificarArriba(indice) {
        while (indice > 0) {
            const indicePadre = Math.floor((indice - 1) / 2);
            if (this.monticulo[indice].compararPrioridad(this.monticulo[indicePadre]) <= 0) break;
            
            this.intercambiar(indice, indicePadre);
            indice = indicePadre;
        }
    }

    eliminarPorId(id) {
        const indice = this.monticulo.findIndex(tarea => tarea.id === id);
        if (indice === -1) return false;

        const ultimoIndice = this.monticulo.length - 1;
        this.intercambiar(indice, ultimoIndice);
        this.monticulo.pop();

        if (indice < this.monticulo.length) {
            const indicePadre = Math.floor((indice - 1) / 2);
            
            if (indice > 0 && this.monticulo[indice].compararPrioridad(this.monticulo[indicePadre]) > 0) {
                this.heapificarArriba(indice);
            } else {
                this.heapificarAbajo(indice);
            }
        }

        return true;
    }

    heapificarAbajo(indice) {
        const longitud = this.monticulo.length;
        
        while (true) {
            let mayor = indice;
            const hijoIzquierdo = 2 * indice + 1;
            const hijoDerecho = 2 * indice + 2;

            if (hijoIzquierdo < longitud && this.monticulo[hijoIzquierdo].compararPrioridad(this.monticulo[mayor]) > 0) {
                mayor = hijoIzquierdo;
            }

            if (hijoDerecho < longitud && this.monticulo[hijoDerecho].compararPrioridad(this.monticulo[mayor]) > 0) {
                mayor = hijoDerecho;
            }

            if (mayor === indice) break;

            this.intercambiar(indice, mayor);
            indice = mayor;
        }
    }

    intercambiar(i, j) {
        [this.monticulo[i], this.monticulo[j]] = [this.monticulo[j], this.monticulo[i]];
    }

    obtenerTodas() {
        return [...this.monticulo];
    }

    estaVacio() {
        return this.monticulo.length === 0;
    }

    tamanio() {
        return this.monticulo.length;
    }
}